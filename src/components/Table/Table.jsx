import PropTypes from 'prop-types';
import styles from './table.module.css';
import TableRow from './TableRow';

export default function Table({ array }) {
  return (
    <div>
      <div className={`${styles.table}`}>
        <div>
          <TableRow row={array[0]} isHead />
        </div>
        <div>
          {array.slice(1).map((item) => (
            <TableRow key={`${item[0].id}`} row={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

Table.propTypes = {
  array: PropTypes.arrayOf(PropTypes.object).isRequired,
};
