import { fn } from '@storybook/test';
import NavBar from './NavBar';

export default {
  title: 'Layout/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  argTypes: {
    navItems: { control: 'array' }, // ✅ 네비게이션 아이템 동적 설정
  },
  args: {
    navItems: [
      { label: '로그인', href: '/login' },
      { label: '계정 등록', href: '/register' },
    ], // 기본 네비게이션 아이템
    toggleSidebar: fn(), // ✅ `fn()`을 사용하여 사이드바 토글 이벤트 추적
  },
};

// ✅ 기본 네비게이션 바
export const Default = {
  args: {
    navItems: [
      { label: '로그인', href: '/login' },
      { label: '계정 등록', href: '/register' },
    ],
    toggleSidebar: fn(), // ✅ Storybook에서 이벤트 추적
  },
};

// ✅ 추가적인 네비게이션 아이템 예제
export const CustomNavBar = {
  args: {
    navItems: [
      { label: '홈', href: '/' },
      { label: '서비스', href: '/services' },
      { label: '문의', href: '/contact' },
    ],
    toggleSidebar: fn(), // ✅ Storybook에서 이벤트 추적
  },
};
