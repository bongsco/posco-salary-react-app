import { useState } from 'react';
import Modal from './Modal';
import Filter from '#components/Modal/Filter';
import Register from '#components/Modal/Register';
import Sort from '#components/Modal/Sort';

export default {
  title: 'Components/Modal',
  component: Modal,
};

// ✅ 1. Filter 예시
export function FilterModalStory() {
  const [filters, setFilters] = useState([]);

  const handleAddFilter = (newFilter) => {
    setFilters((prev) => [...prev, newFilter]);
  };

  const handleRemoveFilter = (index) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Filter
      filters={filters}
      onAddFilter={handleAddFilter}
      onRemoveFilter={handleRemoveFilter}
    />
  );
}

// ✅ 2. Register 예시
export function RegisterModalStory() {
  const [registerData, setRegisterData] = useState({
    title: '',
    adjustmentType: null,
  });

  return <Register data={registerData} onChange={setRegisterData} />;
}

export function SortModalStory() {
  const [sortList, setSortList] = useState([]);

  const handleAddSort = (newSort) => {
    setSortList((prev) => [...prev, newSort]);
  };

  const handleRemoveSort = (index) => {
    setSortList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Sort
      sorts={sortList}
      onAddSort={handleAddSort}
      onRemoveSort={handleRemoveSort}
    />
  );
}
