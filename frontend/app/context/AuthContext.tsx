"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

// Define the shape of the AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  userAddress: string;
  login: (address: string) => Promise<void>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const router = useRouter();

  const login = async (address: string) => {
    // Simulate login process
    setIsAuthenticated(true);
    setUserAddress(address);
    router.push("/");

    // Redirect to home page after login
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserAddress("");

    router.push("/login");

    // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userAddress, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
