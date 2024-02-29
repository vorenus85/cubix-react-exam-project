import React, { useCallback, useContext, useMemo, useState } from "react";
import { setApiToken } from "./useApi";
import { AUTH_TOKEN } from "../constants";

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

export function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(AUTH_TOKEN);
  const [sessionUser, setSessionUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLoginResult = useCallback(
    (loginResult) => {
      setApiToken(loginResult.token);
      setAuthToken(loginResult.token);
      setSessionUser(loginResult.user);
      localStorage.setItem("authToken", loginResult.token);
      setIsAdmin(loginResult.user.name === "admin");
    },
    [setAuthToken, setSessionUser]
  );

  const logout = useCallback(() => {
    handleLoginResult({ token: false, user: {} });
    localStorage.removeItem("authToken");
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
