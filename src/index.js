import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LogIn from './components/pages/login.jsx';
import Profile from './components/pages/Profile.jsx';
import { AuthContextProvider } from './store/auth-context.js';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import { loader as authLoader } from './components/ProtectedRoutes.jsx';

//if user is has valid token when accessing "/", "/login" lets redirect to "/profile"

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoutes />,
    loader: authLoader,
    children: [
      { path: '/app', element: <App /> },
      { path: '/profile', element: <Profile /> },
    ],
  },
  { path: '/login', element: <LogIn /> },
  ,
]);

const root = createRoot(document.getElementById('root'));

root.render(
  <AuthContextProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthContextProvider>
);
