import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/config";


const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  
  const logout = () => {
    return signOut(auth);
  };

  
  const value = {
    user,
    register,
    login,
    logout,
  };

  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p className="animate-pulse text-lg">Loading PitchCraft...</p>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
