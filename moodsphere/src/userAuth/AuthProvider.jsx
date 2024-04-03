// AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (authUser) {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  const value = { user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
