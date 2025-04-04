import { createContext, useState, useEffect } from "react";
import { loginUser } from '../../Services/Api/Api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      setUser(response.data.usuario);
      setToken(response.data.token);
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
