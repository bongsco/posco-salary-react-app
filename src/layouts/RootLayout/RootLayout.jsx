import { useEffect, useMemo, useReducer } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '#components/NavBar';
import NavItem from '#components/NavBar/NavItem';
import SideBar, { Category, Item, SubItem } from '#components/SideBar';
import { ErrorHandlerProvider } from '#contexts/ErrorHandlerContext';
import useAuth from '#contexts/useAuth';
import { setAuthContextRef } from '#utils/fetch';
import styles from './root-layout.module.css';

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
  const auth = useAuth();
  const displayName = useMemo(() => {
    const user = auth?.auth;

    console.log('user', user);
    if (!user) return null;

    const isManager = user.groups?.includes('bongsco_manager');
    return isManager ? user.name || user.email || '사용자' : '사용자';
  }, [auth?.auth]);

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

  useEffect(() => {
    if (auth) {
      setAuthContextRef(auth);
    }
  }, [auth]);

  return (
    <div className={styles.root}>
      <NavBar
        toggleSidebar={() => {
          dispatchSideBarState({ action: 'toggle', key: 'sideBar' });
        }}
      >
        {displayName ? (
          <>
            <span className={styles.welcome}>{displayName}님 환영합니다</span>
            <NavItem text="로그아웃" href="/logout" />
          </>
        ) : (
          <>
            <NavItem text="로그인" href="/login" />
            <NavItem text="계정 등록" href="/register" />
          </>
        )}
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
              onClick={() =>
                dispatchSideBarState({
                  action: 'toggle',
                  key: 'adjustCategory',
                })
              }
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
          <ErrorHandlerProvider>
            <Outlet />
          </ErrorHandlerProvider>
        </div>
      </div>
    </div>
  );
}
