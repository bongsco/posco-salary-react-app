import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '#components/NavBar';
import SideBar from '#components/SideBar';
import BreadCrumbs from '#components/BreadCrumbs';
import styles from './app-layout.module.css';

export default function AppLayout({ title, children, breadCrumbs }) {
  return (
    <div className={styles.app}>
      <NavBar
        navItems={[
          {
            label: '로그인',
            href: '/login',
          },
          {
            label: '계정 등록',
            href: '/register',
          },
        ]}
        toggleSidebar={() => {}}
      />
      <div className={styles.appBody}>
        <SideBar
          data={[
            {
              elementType: 'item',
              icon: 'home',
              text: '메인',
              href: '/',
            },
            {
              elementType: 'category',
              icon: 'card',
              text: '조정',
              subItems: [
                {
                  text: '등록',
                  href: '/adjust/edit',
                },
                {
                  text: '조회',
                  href: '/adjust/list',
                },
              ],
            },
            {
              elementType: 'item',
              icon: 'person',
              text: '개인 연봉 조회',
              href: '/personal',
            },
            {
              elementType: 'item',
              icon: 'gear',
              text: '계산식 관리',
              href: '/formula',
            },
            {
              elementType: 'item',
              icon: 'gear',
              text: '테스트',
              href: '/test',
            },
            {
              elementType: 'item',
              icon: 'gear',
              text: 'Form 테스트',
              href: '/adjust/edit/0/test-edit',
            },
          ]}
        />
        <div className={styles.appContent}>
          <BreadCrumbs items={breadCrumbs} />
          <h1>{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
  breadCrumbs: PropTypes.arrayOf(PropTypes.string).isRequired,
};
