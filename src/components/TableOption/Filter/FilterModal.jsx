import { useReducer } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Modal/Modal';
import styles from '../../Modal/modal.module.css';
import Dropdown from '#components/Dropdown';
import Input from '#components/Input';
import CustomDatePicker from '#components/DatePicker';

const init = (prevFilters) => ({
  selectedKey: null,
  selectedValue: null,
  isKeyOpen: false,
  isValueOpen: false,
  filters: prevFilters || [],
});

function reducer(state, action, option) {
  switch (action.type) {
    case 'TOGGLE_KEY':
      return { ...state, isKeyOpen: !state.isKeyOpen };
    case 'TOGGLE_VALUE':
      return { ...state, isValueOpen: !state.isValueOpen };
    case 'SELECT_KEY':
      return {
        ...state,
        selectedKey: action.payload,
        selectedValue: null,
        isKeyOpen: false,
      };
    case 'REMOVE_VALUE': {
      const { key, value } = action.payload;
      const updatedFilters = state.filters
        .map((f) =>
          f.key === key
            ? { ...f, value: f.value.filter((v) => v !== value) }
            : f,
        )
        .filter((f) => f.value.length > 0); // value가 비면 해당 필터 제거

      return {
        ...state,
        filters: updatedFilters,
      };
    }
    case 'SELECT_VALUE':
      return { ...state, selectedValue: action.payload, isValueOpen: false };
    case 'ADD_FILTER': {
      if (state.selectedKey && state.selectedValue) {
        const existing = state.filters.find((f) => f.key === state.selectedKey);
        const optionType = option[state.selectedKey]?.optionType;

        const isDuplicate =
          existing?.value.some((val) => {
            if (optionType === 'date') {
              return (
                val instanceof Date &&
                state.selectedValue instanceof Date &&
                val.toDateString() === state.selectedValue.toDateString()
              );
            }
            return String(val) === String(state.selectedValue);
          }) ?? false;

        if (isDuplicate) {
          // 중복이면 아무것도 추가하지 않음
          return {
            ...state,
            selectedKey: null,
            selectedValue: null,
          };
        }

        if (existing) {
          const updatedFilters = state.filters.map((f) =>
            f.key === state.selectedKey
              ? {
                  ...f,
                  value: [...f.value, state.selectedValue],
                }
              : f,
          );
          return {
            ...state,
            filters: updatedFilters,
            selectedKey: null,
            selectedValue: null,
          };
        }

        return {
          ...state,
          filters: [
            ...state.filters,
            { key: state.selectedKey, value: [state.selectedValue] },
          ],
          selectedKey: null,
          selectedValue: null,
        };
      }
      return state;
    }

    case 'REMOVE_FILTER':
      return {
        ...state,
        filters: state.filters.filter((_, i) => i !== action.payload),
      };
    default:
      return state;
  }
}
function ValueSelector({
  selectedKey,
  option,
  selectedValue,
  isOpen,
  dispatch,
  filters,
}) {
  if (!selectedKey || !option[selectedKey]) {
    return <Input placeholder="항목을 선택하세요" customWidth="133px" />;
  }

  const { optionType } = option[selectedKey];

  const handleChange = (val) => {
    dispatch({ type: 'SELECT_VALUE', payload: val });
  };

  const toggle = () => {
    dispatch({ type: 'TOGGLE_VALUE' });
  };

  if (optionType === 'dropdown') {
    const originalOptions = option[selectedKey]?.options.map(String) || [];
    const alreadySelected =
      filters?.find((f) => f.key === selectedKey)?.value.map(String) || [];

    const filteredOptions = originalOptions.filter(
      (opt) => !alreadySelected.includes(opt),
    );

    return (
      <Dropdown
        placeHolder="값 선택"
        options={filteredOptions}
        selectedValue={selectedValue}
        isOpen={isOpen}
        onChange={handleChange}
        onClick={toggle}
        customWidth="133px"
        error={false}
      />
    );
  }

  if (optionType === 'text') {
    const isYearField = selectedKey === '연도'; // 또는 key에 따라
    const hasError =
      isYearField && selectedValue && !/^\d+$/.test(selectedValue);

    return (
      <Input
        placeholder="값 입력"
        value={selectedValue || ''}
        onChange={(e) => handleChange(e.target.value)}
        customWidth="133px"
        mode={hasError ? 'error' : 'default'}
        label={hasError ? '숫자를 입력하세요' : undefined}
      />
    );
  }

  if (optionType === 'date') {
    // 날짜 중복 체크
    const selectedDates =
      filters?.find((f) => f.key === selectedKey)?.value || [];

    const isDuplicate = selectedDates.some(
      (date) =>
        date instanceof Date &&
        selectedValue instanceof Date &&
        date.toDateString() === selectedValue.toDateString(),
    );

    return (
      <CustomDatePicker
        selectedDate={selectedValue}
        onChange={(val) => dispatch({ type: 'SELECT_VALUE', payload: val })}
        customWidth="133px"
        hasError={isDuplicate}
        isSaved="true"
      />
    );
  }

  return null;
}

export default function FilterModal({
  option,
  onSubmit,
  onClose,
  prevFilters,
}) {
  const [state, dispatch] = useReducer(
    (s, action) => reducer(s, action, option), // ✅ option 추가
    prevFilters,
    init,
  );
  const keys = Object.keys(option);

  const formatValue = (val) => {
    if (val instanceof Date) return val.toLocaleDateString();
    return val;
  };

  return (
    <Modal
      onSubmit={() => {
        onSubmit?.(state.filters);
      }}
      onClose={onClose}
    >
      <span className={styles.title}>필터</span>

      <div className={styles.dropdownWrapper}>
        <Dropdown
          placeHolder="필터 항목 선택"
          options={keys}
          selectedValue={state.selectedKey}
          isOpen={state.isKeyOpen}
          onChange={(val) => dispatch({ type: 'SELECT_KEY', payload: val })}
          onClick={() => dispatch({ type: 'TOGGLE_KEY' })}
          customWidth="133px"
          error={false}
        />

        <ValueSelector
          selectedKey={state.selectedKey}
          option={option}
          selectedValue={state.selectedValue}
          isOpen={state.isValueOpen}
          dispatch={dispatch}
          filters={state.filters}
        />

        <button
          type="button"
          className={styles.plusButton}
          onClick={() => dispatch({ type: 'ADD_FILTER' })}
        >
          <span className={styles.plus}>+</span>
        </button>
      </div>

      <div className={styles.filterWrapper}>
        {state.filters.map((filter) =>
          filter.value.map((val) => (
            <div key={`${filter.key}-${val}`} className={styles.filter}>
              <span className={styles.filterName}>
                {filter.key} : {formatValue(val)}
              </span>
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: 'REMOVE_VALUE',
                    payload: { key: filter.key, value: val },
                  })
                }
                className={styles.removeButton}
              >
                <span className={styles.remove}>X</span>
              </button>
            </div>
          )),
        )}
      </div>
    </Modal>
  );
}

ValueSelector.propTypes = {
  selectedKey: PropTypes.string.isRequired,
  option: PropTypes.objectOf(
    PropTypes.shape({
      optionType: PropTypes.oneOf(['dropdown', 'text', 'date']).isRequired,
      initialValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
      ]),
      options: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ),
    }),
  ).isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.instanceOf(Date),
        ]),
      ).isRequired,
    }),
  ),
};
ValueSelector.defaultProps = {
  filters: [],
};
FilterModal.propTypes = {
  option: PropTypes.objectOf(
    PropTypes.shape({
      optionType: PropTypes.oneOf(['dropdown', 'text', 'date']).isRequired,
      initialValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
      ]),
      options: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ),
    }),
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  prevFilters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.instanceOf(Date),
        ]),
      ).isRequired,
    }),
  ),
};

FilterModal.defaultProps = {
  prevFilters: [],
};
