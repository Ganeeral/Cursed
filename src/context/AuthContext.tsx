import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userId: number, role: string) => void;
  logout: () => void;
  userId: number | null;
  role: string | null;
  status: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const { push } = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");
    const storedStatus = localStorage.getItem("status");
    if (storedUserId) {
      setUserId(Number(storedUserId));
      setRole(String(storedRole));
      setStatus(String(storedStatus));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userId: number, role: string) => {
    setUserId(userId);
    setRole(role);
    setStatus(status);
    setIsAuthenticated(true);
    localStorage.setItem("userId", userId.toString());
    localStorage.setItem("role", role.toString());
    localStorage.setItem("status", role.toString());
  };

  const logout = () => {
    setUserId(null);
    setIsAuthenticated(false);
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("status");
    push("/auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userId, role, status }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
