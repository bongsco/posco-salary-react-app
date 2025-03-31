import { useState } from 'react';
import CustomTimeLine from './CustonTimeLine';

export default {
  title: 'UI/CustomTimeLine',
  component: CustomTimeLine,
  tags: ['autodocs'],
};

function Template() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const data = [
    ['2024 정기연봉조정 1차', new Date(2024, 1, 1), new Date(2024, 5, 1)],
    ['2025 정기연봉조정 2차', new Date(2024, 6, 1), new Date(2025, 1, 1)],
    ['2025 정기연봉조정 3차', new Date(2024, 7, 1), new Date(2025, 1, 6)],
    ['2025 정기연봉조정 4차', new Date(2024, 3, 1), new Date(2024, 4, 1)],
    ['2025 정기연봉조정 5차', new Date(2024, 2, 1), new Date(2024, 10, 1)],
    ['2025 정기연봉조정 6차', new Date(2024, 6, 1), new Date(2025, 1, 1)],
    ['2025 정기연봉조정 7차', new Date(2024, 6, 1), new Date(2026, 0, 1)],
    ['2025 정기연봉조정 8차', new Date(2022, 6, 1), new Date(2025, 1, 1)],
  ];
  return (
    <CustomTimeLine
      selectedIndex={selectedIndex}
      data={data}
      onChange={(i) => {
        setSelectedIndex(i);
      }}
    />
  );
}

export const Default = Template.bind();
