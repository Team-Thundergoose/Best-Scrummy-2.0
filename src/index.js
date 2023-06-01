import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LogIn from './components/pages/login.jsx';
import SignUp from './components/pages/signup.jsx';
import Profile from './components/pages/profile.jsx';
import { AuthContextProvider } from './store/auth-context.js';

//if user is has valid token when accessing "/", "/login" lets redirect to "/profile"

const router = createBrowserRouter([
  { path: '/', element: <LogIn /> },
  { path: '/login', element: <LogIn /> },
  { path: '/app', element: <App /> },
  { path: '/profile', element: <Profile /> },
]);

const root = createRoot(document.getElementById('root'));

root.render(
  <AuthContextProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthContextProvider>
);
