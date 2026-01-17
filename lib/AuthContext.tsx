"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "./axios";

interface User {
  name: string;
  email: string;
  picture: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("jwt-token", newToken);
    localStorage.setItem("user-info", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    if (!loading && user?.role === "super_admin") {
      router.push("/super-admin");
    } else if (!loading && user?.role === "admin") {
      router.push("/admin");
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("user-info");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  const refreshUser = async () => {
    try {
      const response = await getUserProfile();
      const fetchUser = response.data.user;
      if (!fetchUser) {
        return logout();
      }
      localStorage.setItem("user-info", JSON.stringify(fetchUser));
      setUser(fetchUser);
    } catch (error) {
      console.log("Error refreshing user profile, logging out");
      logout();
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window === "undefined") {
        setLoading(false);
        return;
      }

      const storedToken = localStorage.getItem("jwt-token");
      const storedUser = localStorage.getItem("user-info");

      if (storedToken && storedUser) {
        try {
          await getUserProfile();
          setToken(storedToken);
          await refreshUser();
        } catch (error) {
          console.log("removing the jwt&user");
          localStorage.removeItem("jwt-token");
          localStorage.removeItem("user-info");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
