import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/LogIn.js';
import SignUp from './pages/SignUp.js';
import Profile from './pages/Profile.js';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/logIn', element: <Login /> },
  { path: '/SignUp', element: <SignUp /> },
  { path: '/Profile', element: <Profile /> },
]);

const root = createRoot(document.getElementById('root'));

root.render(<RouterProvider router={router}></RouterProvider>);



// const Root = () => {
//   return (
//     <>
//       <div>
//         <link to="/"> LogIn </link>
//         <link to="/signup">SignUp</link>
//         <link to="/profile">Profile</link>
//         <link to="/activeboards">Active Boards</link>
//         <link to="/newboard">New Board</link>
//       </div>
//     </>
//   )
// }

