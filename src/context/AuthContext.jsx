import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

// ✅ Create Context
const AuthContext = createContext();

// ✅ Hook for easy access
export const useAuth = () => useContext(AuthContext);

// ✅ Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Track Firebase user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 🔑 Register a new user
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔐 Login user
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🚪 Logout user
  const logout = () => {
    return signOut(auth);
  };

  // ✅ Provide values to the app
  const value = {
    user,
    register,
    login,
    logout,
  };

  // ⏳ Show loading screen while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p className="animate-pulse text-lg">Loading PitchCraft...</p>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
