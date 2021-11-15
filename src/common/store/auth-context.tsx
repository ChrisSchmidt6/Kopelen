import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: (username: string, password: string, persistLogin: boolean) => {},
  onLogout: () => {},
  username: "",
  authToken: "",
});

export const AuthContextProvider: React.FC = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [authToken, setAuthToken] = useState("");

  const loginHandler = (username: string, password: string, persistLogin: boolean) => {
    setIsLoggedIn(true);
    setUsername(username);
    const dummyAuth = "111222333";
    setAuthToken(dummyAuth);
    if(persistLogin) localStorage.setItem("authToken", dummyAuth);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setUsername("");
    setAuthToken("");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        username,
        authToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
