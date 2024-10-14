import React, { useEffect, createContext, useState, useContext } from "react";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isAdmin: false, name: "", id: null });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : { isAdmin: false, name: "", id: null });
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser({ isAdmin: false, name: "", id: null });
  };

  const changeAdmin = () => {
    setUser((prevUser) => ({
      ...prevUser,
      isAdmin: !prevUser.isAdmin,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, changeAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
