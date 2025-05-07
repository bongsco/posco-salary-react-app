import { useEffect, useMemo, useReducer } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '#components/NavBar';
import NavItem from '#components/NavBar/NavItem';
import SideBar, { Item } from '#components/SideBar';
import { useAuth } from '#contexts/AuthContext';
import { useErrorHandlerContext } from '#contexts/ErrorHandlerContext';
// import ChatBotButton from '#src/layouts/RootLayout/ChatBotButton';
import styles from './root-layout.module.css';

const initialSideBarState = {
  sideBar: true,
  main: false,
  adjustCategory: false,
  adjustEdit: false,
  adjustList: false,
  personal: false,
  formula: false,
  test: false,
};

export default function RootLayout() {
  const location = useLocation();
  const auth = useAuth();
  const { renderErrors } = useErrorHandlerContext();

  const displayName = useMemo(() => {
    const user = auth?.auth;

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
            adjustEdit: location.pathname.startsWith('/adjust/edit'),
            adjustList: location.pathname.startsWith('/adjust/list'),
            personal: location.pathname.startsWith('/personal'),
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
        {auth.auth ? (
          <>
            <span className={styles.welcome}>{displayName}님 환영합니다</span>
            <NavItem text="로그아웃" href="/logout" />
          </>
        ) : (
          <NavItem text="로그인" href="/login" />
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

            <Item
              icon="card"
              text="조회"
              href="/adjust/list"
              isActive={sideBarState.adjustList}
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
          {renderErrors()}
          <Outlet />
        </div>
        {/* {auth.auth ? (
          <ChatBotButton
            className={styles.chatbotButton}
            onClick={() => {
              window.open(process.env.REACT_APP_DATAIKU_CHATBOT_URL, '_blank');
            }}
          />
        ) : null} */}
      </div>
    </div>
  );
}
