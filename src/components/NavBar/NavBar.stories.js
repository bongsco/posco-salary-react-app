import NavBar from './NavBar';

export default {
  title: 'Components/NavBar',
  component: NavBar,
  argTypes: {
    navLinks: { control: 'array' }, // ✅ 네비게이션 링크 동적 설정
    ctaButtons: { control: 'array' }, // ✅ CTA 버튼 텍스트 동적 설정
  },
  args: {
    navLinks: ['개요', '지원'], // 기본 네비게이션 메뉴
    ctaButtons: ['로그인', '계정 등록'], // 기본 CTA 버튼 텍스트
  },
};

// ✅ 기본 네비게이션 바
export const Default = {
  args: {
    navLinks: ['개요', '지원'],
    ctaButtons: ['로그인', '계정 등록'],
  },
};
