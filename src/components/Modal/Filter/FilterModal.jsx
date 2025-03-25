import { useReducer } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import styles from '../modal.module.css';
import Dropdown from '#components/Dropdown';

const initialState = {
  selectedKey: null,
  selectedValue: null,
  isKeyOpen: false,
  isValueOpen: false,
  filters: [],
};

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
    case 'ADD_FILTER':
      if (state.selectedKey && state.selectedValue) {
        return {
          ...state,
          filters: [
            ...state.filters,
            { key: state.selectedKey, value: state.selectedValue },
          ],
          selectedKey: null,
          selectedValue: null,
        };
      }
      return state;
    case 'REMOVE_FILTER':
      return {
        ...state,
        filters: state.filters.filter((_, i) => i !== action.payload),
      };
    default:
      return state;
  }
}

export default function FilterModal({ option, onSubmit, onClose }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const keys = Object.keys(option);

  return (
    <Modal onSubmit={() => onSubmit?.(state.filters)} onClose={onClose}>
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

        <Dropdown
          placeHolder="값 선택"
          options={
            state.selectedKey && option[state.selectedKey]
              ? option[state.selectedKey].options.map(String)
              : []
          }
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
          onClick={() => dispatch({ type: 'ADD_FILTER' })}
        >
          <span className={styles.plus}>+</span>
        </button>
      </div>

      <div className={styles.filterWrapper}>
        {state.filters.map((filter, index) => (
          <div key={`${filter.key}-${filter.value}`} className={styles.filter}>
            <span className={styles.filterName}>
              {filter.key} : {filter.value}
            </span>
            <button
              type="button"
              onClick={() =>
                dispatch({ type: 'REMOVE_FILTER', payload: index })
              }
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
FilterModal.propTypes = {
  option: PropTypes.objectOf(
    PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ).isRequired,
      currentSelectedValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
