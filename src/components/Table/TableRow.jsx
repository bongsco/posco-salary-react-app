import PropTypes from 'prop-types';
import TableElement from './TableElement';
import styles from './table.module.css';

export default function TableRow({ row, isHead }) {
  return (
    <div className={`${styles.table_row}`}>
      {Object.values(row).map((key) => (
        <TableElement key={key.id} element={key} isHead={isHead} />
      ))}
    </div>
  );
}

TableRow.propTypes = {
  row: PropTypes.arrayOf(PropTypes.object).isRequired,
  isHead: PropTypes.bool,
};

TableRow.defaultProps = {
  isHead: false,
};
