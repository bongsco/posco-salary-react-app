import React from 'react';

import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import NavBar from '#components/NavBar';
import SideBar from '#components/SideBar';
import MainPage from './pages/Main';

function Layout() {
  return (
    <div className="App">
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
      <div className="AppBody">
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
                  href: '/adjust/register',
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
          ]}
        />
        <div className="AppContent">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function TestOutlet() {
  return <MainPage />;
}

function App() {
  return (
    <BrowserRouter basename={`/${process.env.PUBLIC_URL}/`}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/test" element={<TestOutlet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
