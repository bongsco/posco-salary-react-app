function SalaryAdjustmentForm() {
  return (
    <div className="modal">
      <h3>연봉조정 등록</h3>
      <div className="form-row">
        <input type="text" defaultValue="2차 정기 연봉조정" disabled />
      </div>
      <div className="form-row">
        <select defaultValue="정기 연봉조정">
          <option>정기 연봉조정</option>
          <option>특별 연봉조정</option>
        </select>
      </div>
      <div className="button-group">
        <button className="add-btn" type="button">
          추가
        </button>
        <button className="close-btn" type="button">
          닫기
        </button>
      </div>
    </div>
  );
}

export default SalaryAdjustmentForm;
