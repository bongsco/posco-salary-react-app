import PropTypes from 'prop-types';
import styles from './organization-subject.module.css';
import Button from '#components/Button';
import CheckBox from '#components/CheckBox';
import Pagination from '#components/Pagination';
import TableOption from '#components/TableOption';
import TableSelectIndicator from '#components/TableSelectIndicator';

export default function EmployeeTable({
  title,
  filterOption,
  sortOption,
  employees,
  filters,
  sortList,
  onFilterSortChange,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  toggleAll,
  toggleSelection,
  checkedItemCount,
  onSelectAll,
  onClearSelection,
}) {
  return (
    <section className={styles.listWrapper}>
      <div className={styles.titleWrapper}>
        <h2>{title}</h2>
      </div>
      <div className={styles.tableWrapper}>
        <div className={styles.filterWrapper}>
          <div className={styles.filterButton}>
            <TableOption
              filterOption={filterOption}
              sortOption={sortOption}
              filters={filters}
              sortList={sortList}
              onSubmit={onFilterSortChange}
            />
          </div>
          <div className={styles.excelWrapper}>
            <Button size="large" label="엑셀다운로드" variant="secondary" />
          </div>
        </div>
        <div className={styles.tables}>
          <table>
            <thead>
              <tr>
                <td className={styles.checkboxCell}>
                  <CheckBox
                    isChecked={employees.every((e) => e.selected)}
                    onClick={() => toggleAll(employees)}
                  />
                </td>
                <td>직번</td>
                <td>성명</td>
                <td>채용일자</td>
                <td>평가등급</td>
              </tr>
            </thead>
            <tbody>
              {employees.map((row) => (
                <tr key={row.empId}>
                  <td className={styles.checkboxCell}>
                    <CheckBox
                      isChecked={row.selected}
                      onClick={() => toggleSelection(row.empId)}
                    />
                  </td>
                  <td>{row.empId}</td>
                  <td>{row.name}</td>
                  <td>{row.hiredDate}</td>
                  <td>{row.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.paginationWrapper}>
        <TableSelectIndicator
          checkedItemCount={checkedItemCount}
          onSelect={onSelectAll}
          onClear={onClearSelection}
        />
        <Pagination
          currentPage={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </div>
    </section>
  );
}
EmployeeTable.propTypes = {
  title: PropTypes.string.isRequired,
  filterOption: PropTypes.objectOf(
    PropTypes.shape({
      optionType: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string),
      initialValue: PropTypes.string,
    }),
  ).isRequired,
  sortOption: PropTypes.shape({
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      empId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      hiredDate: PropTypes.string.isRequired,
      grade: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
  sortList: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.oneOf(['오름차순', '내림차순']).isRequired,
    }),
  ).isRequired,
  onFilterSortChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  toggleAll: PropTypes.func.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  checkedItemCount: PropTypes.number.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onClearSelection: PropTypes.func.isRequired,
};
