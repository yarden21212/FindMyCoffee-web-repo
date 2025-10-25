import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "./Axios"

const AuthContext = createContext({
  user: null,
  refreshUser: async () => {},
  clearUser: () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { username } or null

  async function refreshUser() {
    try {
      const res = await axios.get("/api/auth/getUsername"); // cookie is sent automatically
      setUser({ username: res.data.username }); // It will create a AuthObject that looks like: user: { username: "YardenShay" }, refreUser: .., clearUser: ..
    } catch {
      setUser(null);
    }
  }

  function clearUser() {
    setUser(null);
  }

  // ask the server who I am once on app load
  useEffect(() => { 
    refreshUser(); 
  }, []);
  
  return (
    
    <AuthContext.Provider value={{ user, refreshUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
