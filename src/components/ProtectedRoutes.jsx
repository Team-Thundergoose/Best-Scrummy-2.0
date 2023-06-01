import React, { useContext, redirect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import MainNav from './pages/MainNav';
import AuthContext from '../store/auth-context';

export default function ProtectedRoutes() {
  const ctx = useContext(AuthContext);

  const jsx = (
    <>
      <MainNav></MainNav>
      <Outlet></Outlet>
    </>
  );

  return <> {jsx}</>;
}
