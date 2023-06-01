import React, { useState } from 'react';

const AuthContext = React.createContext({
  user: undefined,
  onLogIn: (e) => {},
  onSignUp: (e) => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(undefined);

  function logInHandler(username, password) {
    fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }
  function signUpHandler(username, password) {
    console.log(username, password);
    fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // setUser(data);
        console.log(data);
      });
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
