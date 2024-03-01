import React, { useCallback, useContext, useMemo, useState } from "react";
import { setApiToken } from "./useApi";
import { AUTH_TOKEN, SESSION_USER } from "../constants";

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

const userIsLoggedIn = () => {
  return Object.keys(SESSION_USER).length !== 0;
};

export function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(AUTH_TOKEN);
  const [sessionUser, setSessionUser] = useState(
    userIsLoggedIn() ? JSON.parse(SESSION_USER) : SESSION_USER
  );
  const [isAdmin, setIsAdmin] = useState(
    userIsLoggedIn() ? JSON.parse(SESSION_USER)?.name === "admin" : false
  );

  const handleLoginResult = useCallback(
    (loginResult) => {
      setApiToken(loginResult.token);
      setAuthToken(loginResult.token);
      setSessionUser(loginResult.user);
      localStorage.setItem("authToken", loginResult.token);
      localStorage.setItem("sessionUser", JSON.stringify(loginResult.user));
      setIsAdmin(loginResult.user.name === "admin");
    },
    [setAuthToken, setSessionUser]
  );

  const logout = useCallback(() => {
    handleLoginResult({ token: false, user: {} });
    localStorage.removeItem("authToken");
    localStorage.removeItem("sessionUser");
  }, [handleLoginResult]);

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          authToken,
          sessionUser,
          handleLoginResult,
          isAdmin,
          logout,
          setSessionUser,
        }),
        [
          authToken,
          sessionUser,
          handleLoginResult,
          isAdmin,
          logout,
          setSessionUser,
        ]
      )}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
