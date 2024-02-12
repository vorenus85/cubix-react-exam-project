import React, { useCallback, useContext, useState } from "react";
import { setApiToken } from "./useApi";

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

export function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(false);
  const [sessionUser, setSessionUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLoginResult = useCallback(
    (loginResult) => {
      setApiToken(loginResult.token);
      setAuthToken(loginResult.token);
      setSessionUser(loginResult.user);
      setIsAdmin(loginResult.user.name === "admin" ? true : false);
    },
    [setAuthToken, setSessionUser]
  );

  const logout = useCallback(() => {
    handleLoginResult({ token: false, user: {} });
  }, [handleLoginResult]);

  return (
    <AuthContext.Provider
      value={{ authToken, sessionUser, handleLoginResult, isAdmin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
