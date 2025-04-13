import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check local storage if admin is logged in
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminLoggedIn);
  }, []);

  const loginAdmin = () => {
    localStorage.setItem("isAdmin", "true");
    setIsAdmin(true);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
