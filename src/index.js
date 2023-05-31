import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LogIn from './components/pages/login.jsx';
import SignUp from './components/pages/signup.jsx';
import Profile from './components/pages/profile.jsx';


const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <LogIn /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/profile', element: <Profile /> },
]);

const root = createRoot(document.getElementById('root'));

root.render(<RouterProvider router={ router }></RouterProvider>);



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

