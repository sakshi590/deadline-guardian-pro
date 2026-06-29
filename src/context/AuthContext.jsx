// src/context/AuthContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("dg-user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);

    localStorage.setItem(
      "dg-user",
      JSON.stringify(userData)
    );
  };

  const register = (userData) => {
    setUser(userData);

    localStorage.setItem(
      "dg-user",
      JSON.stringify(userData)
    );
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("dg-user");
  };

  const updateUser = (updatedData) => {
    const updatedUser = {
      ...user,
      ...updatedData,
    };

    setUser(updatedUser);

    localStorage.setItem(
      "dg-user",
      JSON.stringify(updatedUser)
    );
  };

  const value = useMemo(
    () => ({
      user,
      loading,

      isAuthenticated: !!user,

      login,
      logout,
      register,
      updateUser,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;