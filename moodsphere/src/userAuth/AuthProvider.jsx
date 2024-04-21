// AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (authUser) {
      if (authUser) {
        // The user is logged in
        setUser({
          ...authUser,
          isGuest: false
        });
      } else {
        // The user is logged out
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginAsGuest = () => {
    setUser({
      displayName: "Guest",
      email: "guest@example.com",
      isGuest: true  // This should be true for guests
    });
  };
  const value = { user, loginAsGuest };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
