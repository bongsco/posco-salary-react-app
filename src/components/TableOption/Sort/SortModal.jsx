import PropTypes from 'prop-types';
import { useReducer } from 'react';
import Dropdown from '#components/Dropdown';
import Modal from '../../Modal/Modal';
import styles from '../../Modal/modal.module.css';

const init = (prevSortList) => ({
  selectedKey: null,
  selectedValue: null,
  isKeyOpen: false,
  isValueOpen: false,
  sortList: prevSortList || [],
});

function reducer(state, action) {
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
    case 'SELECT_VALUE':
      return { ...state, selectedValue: action.payload, isValueOpen: false };
    case 'ADD_SORT':
      if (state.selectedKey && state.selectedValue) {
        return {
          ...state,
          sortList: [
            ...state.sortList,
            { key: state.selectedKey, order: state.selectedValue },
          ],
          selectedKey: null,
          selectedValue: null,
        };
      }
      return state;
    case 'REMOVE_SORT':
      return {
        ...state,
        sortList: state.sortList.filter((_, i) => i !== action.payload),
      };
    default:
      return state;
  }
}

export default function SortModal({
  option,
  onSubmit,
  onClose,
  prevSortList,
  left,
  right,
  top,
  bottom,
}) {
  const [state, dispatch] = useReducer(reducer, prevSortList, init);

  // 이미 sortList에 있는 key는 제외
  const keyOptions = option.keys.filter(
    (key) => !state.sortList.some((sort) => sort.key === key),
  );

  const valueOptions = state.selectedKey ? option.values : [];

  return (
    <Modal
      onSubmit={() => onSubmit?.(state.sortList)}
      onClose={onClose}
      left={left}
      right={right}
      top={top}
      bottom={bottom}
    >
      <span className={styles.title}>정렬</span>

      <div className={styles.dropdownWrapper}>
        <Dropdown
          placeHolder="정렬 항목"
          options={keyOptions}
          selectedValue={state.selectedKey}
          isOpen={state.isKeyOpen}
          onChange={(val) => dispatch({ type: 'SELECT_KEY', payload: val })}
          onClick={() => dispatch({ type: 'TOGGLE_KEY' })}
          customWidth="133px"
          error={false}
        />
        <Dropdown
          placeHolder="정렬 방식"
          options={valueOptions}
          selectedValue={state.selectedValue}
          isOpen={state.isValueOpen}
          onChange={(val) => dispatch({ type: 'SELECT_VALUE', payload: val })}
          onClick={() => dispatch({ type: 'TOGGLE_VALUE' })}
          customWidth="133px"
          error={false}
        />

        <button
          type="button"
          className={styles.plusButton}
          onClick={() => dispatch({ type: 'ADD_SORT' })}
        >
          <span className={styles.plus}>+</span>
        </button>
      </div>

      <div className={styles.filterWrapper}>
        {state.sortList.map((sort, index) => (
          <div key={`${sort.key}-${sort.order}`} className={styles.filter}>
            <span className={styles.filterName}>
              {sort.key} : {sort.order}
            </span>
            <button
              type="button"
              onClick={() => dispatch({ type: 'REMOVE_SORT', payload: index })}
              className={styles.removeButton}
            >
              <span className={styles.remove}>X</span>
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
}

SortModal.propTypes = {
  option: PropTypes.shape({
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  prevSortList: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      order: PropTypes.string.isRequired,
    }),
  ),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SortModal.defaultProps = {
  prevSortList: [],
  left: 'auto',
  right: 'auto',
  top: 'auto',
  bottom: 'auto',
};
