import React, { useState } from 'react';
import { socket } from '../socket';

const AuthContext = React.createContext({
  user: undefined,
  onLogIn: (e) => {},
  onSignUp: (e) => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(undefined);

  async function logInHandler(username, password) {
    const res = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    socket.emit('logged-in', data.username);
    setUser(data);
  }
  async function signUpHandler(username, password) {
    const res = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    socket.emit('logged-in', data.username);
    setUser(data);
  }
  return (
    <AuthContext.Provider
      value={{ user: user, onLogIn: logInHandler, onSignUp: signUpHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
