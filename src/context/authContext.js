import React, {
  useState,
  useContext,
  createContext,
  useLayoutEffect
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={AuthValue()}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

function AuthValue() {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("access-token") || null
  );

  const login = async (username, token) => {
    localStorage.setItem("username", username);
    localStorage.setItem("access-token", token);
    setIsAuth(true);
    setToken(token);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("username");
    setIsAuth(false);
  };

  useLayoutEffect(() => {
    setIsAuth(!!localStorage.getItem("access-token"));
  }, []);

  return {
    isAuth,
    token,
    login,
    logout
  };
}
