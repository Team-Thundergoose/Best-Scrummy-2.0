import React, { useContext } from 'react';
import { useNavigate, Outlet, redirect } from 'react-router-dom';
import MainNav from './pages/MainNav';
import AuthContext from '../store/auth-context';

export default function ProtectedRoutes() {
  const jsx = (
    <>
      <MainNav></MainNav>
      <Outlet></Outlet>
    </>
  );

  return <> {jsx}</>;
}

export async function loader() {
  const res = await fetch('/api/user/getuser');
  if (!res.ok) {
    return redirect('/login');
  }
  return null;
}
