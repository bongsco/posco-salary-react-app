import Pagination from './Pagination';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    currentPage: { control: { type: 'number', min: 1, max: 10 } },
    onPageChange: { action: 'changed' },
    template: {
      control: { type: 'select', options: ['input', 'select'] }, // ✅ 템플릿 선택 가능
    },
  },
  args: {
    currentPage: 1,
    template: 'input',
  },
};

// ✅ 기본 템플릿 (Input + Select 포함)
export const Default = {
  args: { template: 'input' },
};

// ✅ Select 템플릿 (Input + Select 포함, 동작 변경)
export const SelectTemplate = {
  args: { template: 'select' },
};
