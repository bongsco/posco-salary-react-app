import { useEffect, useReducer } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SideBar, { Category, Item, SubItem } from '#components/SideBar';
import NavBar from '#components/NavBar';
import styles from './root-layout.module.css';
import NavItem from '#components/NavBar/NavItem';

const initialSideBarState = {
  sideBar: true,
  main: false,
  adjustCategory: false,
  adjustEdit: false,
  adjustList: false,
  adjustEditTest: false,
  personal: false,
  formula: false,
  test: false,
  formTest: false,
};

export default function RootLayout() {
  const location = useLocation();
  const [sideBarState, dispatchSideBarState] = useReducer(
    (prev, { action, key }) => {
      switch (action) {
        case 'toggle':
          return {
            ...prev,
            [key]: !prev[key],
          };
        case 'navigate':
          return {
            ...prev,
            main: location.pathname === '/',
            adjustCategory: location.pathname.startsWith('/adjust/'),
            adjustEditTest: location.pathname === '/adjust/edit/0/test-edit',
            adjustEdit: location.pathname.startsWith('/adjust/edit'),
            adjustList: location.pathname.startsWith('/adjust/list'),
            personal: location.pathname.startsWith('/personal'),
            formula: location.pathname.startsWith('/formula'),
            test: location.pathname === '/test',
          };
        default:
          return { ...prev };
      }
    },
    initialSideBarState,
  );

  useEffect(() => {
    dispatchSideBarState({ action: 'navigate' });
  }, [location]);

  return (
    <div className={styles.root}>
      <NavBar
        toggleSidebar={() => {
          dispatchSideBarState({ action: 'toggle', key: 'sideBar' });
        }}
      >
        <NavItem text="로그인" href="/login" />
        <NavItem text="계정 등록" href="/register" />
      </NavBar>
      <div className={styles.body}>
        <div className={sideBarState.sideBar ? '' : styles.close}>
          <SideBar>
            <Item
              icon="home"
              text="메인"
              href="/"
              isActive={sideBarState.main}
            />
            <Category
              icon="card"
              text="조정"
              isOpen={sideBarState.adjustCategory}
              onClick={() => {
                dispatchSideBarState({
                  action: 'toggle',
                  key: 'adjustCategory',
                });
              }}
            >
              <SubItem
                text="등록"
                href="/adjust/edit"
                isActive={sideBarState.adjustEdit}
              />
              <SubItem
                text="조회"
                href="/adjust/list"
                isActive={sideBarState.adjustList}
              />
              <SubItem
                text="Form 테스트"
                href="/adjust/edit/0/test-edit"
                isActive={sideBarState.adjustEditTest}
              />
            </Category>
            <Item
              icon="person"
              text="개인 연봉 조회"
              href="/personal"
              isActive={sideBarState.personal}
            />
            <Item
              icon="gear"
              text="계산식 관리"
              href="/formula"
              isActive={sideBarState.formula}
            />
            <Item
              icon="gear"
              text="테스트"
              href="/test"
              isActive={sideBarState.test}
            />
          </SideBar>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
