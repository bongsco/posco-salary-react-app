import { fn } from '@storybook/test';
import Pagination from './Pagination';

export default {
  title: 'UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1, max: 10 } }, // ✅ 현재 페이지 조정 가능
    rowsPerPage: { control: { type: 'number', min: 5, max: 100, step: 5 } }, // ✅ 한 페이지당 행 개수 조정 가능
  },
  args: {
    currentPage: 1, // ✅ 기본 페이지 값
    rowsPerPage: 10, // ✅ 기본 행 개수
    onPageChange: fn(), // ✅ 페이지 변경 이벤트 감지
    onRowsPerPageChange: fn(), // ✅ 행 개수 변경 이벤트 감지
  },
};

// ✅ 기본 Pagination 스토리
export const Default = {
  args: {
    currentPage: 1,
    rowsPerPage: 10,
  },
};

// ✅ 중간 페이지 & 다른 행 개수
export const MidPage = {
  args: {
    currentPage: 5,
    rowsPerPage: 20,
  },
};

// ✅ 마지막 페이지 & 50개 행 보기
export const LastPage = {
  args: {
    currentPage: 10,
    rowsPerPage: 50,
  },
};
