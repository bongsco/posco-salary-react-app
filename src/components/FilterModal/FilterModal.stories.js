import FilterModal from './FilterModal';

export default {
  title: 'UI/FilterModal',
  component: FilterModal,
  tags: ['autodocs'],
};

// ✅ 기본 스토리
export const Default = {
  args: {
    type: 'filter',
  },
};

// ✅ 저장된 상태 (isSaved = true)
export const Sort = {
  args: {
    type: 'sort',
  },
};

// ✅ 비활성화된 상태 (isActive = true)
export const Form = {
  args: {
    type: 'salaryAdjustmentForm',
  },
};
