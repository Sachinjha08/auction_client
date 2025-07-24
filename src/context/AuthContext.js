import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser, getProfile } from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getProfile(token)
        .then(setUser)
        .catch(() => setUser(null));
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    if (res.token) {
      setToken(res.token);
      localStorage.setItem("token", res.token);
      setUser(res.user);
      return true;
    }
    return false;
  };

  const register = async (
    username,
    email,
    password,
    mobile,
    address,
    upiId,
    bankAccountNumber,
    ifscCode
  ) => {
    return await registerUser(
      username,
      email,
      password,
      mobile,
      address,
      upiId,
      bankAccountNumber,
      ifscCode
    );
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setLoading(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
