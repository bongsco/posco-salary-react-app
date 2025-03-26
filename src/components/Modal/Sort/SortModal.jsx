import { useReducer } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Dropdown from '#components/Dropdown';
import styles from '../modal.module.css';

const initialState = {
  selectedKey: null,
  selectedValue: null,
  isKeyOpen: false,
  isValueOpen: false,
  sortList: [],
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
    case 'ADD_SORT':
      if (state.selectedKey && state.selectedValue) {
        return {
          ...state,
          sortList: [
            ...state.sortList,
            { key: state.selectedKey, value: state.selectedValue },
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

export default function SortModal({ option, onSubmit, onClose }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Modal onSubmit={() => onSubmit?.(state.sortList)} onClose={onClose}>
      <span className={styles.title}>정렬</span>

      <div className={styles.dropdownWrapper}>
        <Dropdown
          placeHolder="정렬 항목"
          options={option.keys}
          selectedValue={state.selectedKey}
          isOpen={state.isKeyOpen}
          onChange={(val) => dispatch({ type: 'SELECT_KEY', payload: val })}
          onClick={() => dispatch({ type: 'TOGGLE_KEY' })}
          customWidth="133px"
          error={false}
        />
        <Dropdown
          placeHolder="정렬 방식"
          options={option.values}
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
          <div key={`${sort.key}-${sort.value}`} className={styles.filter}>
            <span className={styles.filterName}>
              {sort.key} : {sort.value}
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
};
