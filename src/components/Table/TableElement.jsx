import PropTypes from 'prop-types';
import styles from './table.module.css';
import Checkbox from '../CheckBox/CheckBox';

export default function TableElement({ element, isHead }) {
  return (
    <div
      key={element.id}
      className={`${isHead ? styles.table_header : styles.table_body} ${styles.table_element}`}
      style={{
        width: element.width ? `${element.width}%` : 'auto',
        flexGrow: element.width ? 0 : 1, // width 없는 요소가 남은 공간을 차지
      }}
    >
      {
        // switch문을 직접 JSX 내에서 처리
        (() => {
          switch (element.type) {
            case 'checkbox':
              return <Checkbox />;
            case 'input':
              return <div>{element.content}</div>;
            case 'button':
              return <div>{element.content}</div>;
            case 'switch':
              return <div>{element.content}</div>;
            case 'bar':
              return <div>{element.content}</div>;
            default:
              return <div>{element.content}</div>; // 기본 텍스트 처리
          }
        })()
      }
    </div>
  );
}

TableElement.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    width: PropTypes.number,
    minWidth: PropTypes.number,
  }).isRequired,
  isHead: PropTypes.bool,
};

TableElement.defaultProps = {
  isHead: false,
};
