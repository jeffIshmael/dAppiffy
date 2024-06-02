"use client";

// contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string;
}

const defaultAuth:AuthContextType= {
  isAuthenticated : false,
  username: "",
}

const AuthContext = createContext<AuthContextType>(defaultAuth);

// interface AuthProviderProps {
//   children: ReactNode;
// }

export const AuthProvider = ({ children }: {children : React.ReactNode}) => {
  
  return (
    <AuthContext.Provider value={defaultAuth}>
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