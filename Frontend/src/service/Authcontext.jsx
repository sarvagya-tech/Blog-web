import { createContext, useContext, useEffect, useState } from "react";
import { currentUser, logoutUser } from "./axios";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const response = await currentUser();
        const userData =
          response?.user ??
          response?.data?.user ??
          response?.data?.data ??
          response?.data ??
          null;
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentUser();
  }, []);

  const login = (response) => {
    const token = response?.data?.accessToken ?? response?.accessToken;
    if (token) {
      localStorage.setItem("accessToken", token);
    }
    const userData =
      response?.data?.user ??
      response?.user ??
      response?.data?.data ??
      response?.data ??
      null;
    setUser(userData);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <Authcontext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: Boolean(user),
        loading,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => useContext(Authcontext);
