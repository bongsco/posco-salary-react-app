function SortComponent() {
  const sorts = [
    { key: '연도', order: '오름차순' },
    { key: '상태', order: '내림차순' },
  ];

  return (
    <div className="modal">
      <h3>정렬</h3>
      {sorts.map((sort) => (
        <div key={sort} className="sort-row">
          <select defaultValue={sort.key}>
            <option>연도</option>
            <option>상태</option>
          </select>
          <select defaultValue={sort.order}>
            <option>오름차순</option>
            <option>내림차순</option>
          </select>
          <button className="remove-btn" type="button">
            ✕
          </button>
        </div>
      ))}
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

export default SortComponent;
