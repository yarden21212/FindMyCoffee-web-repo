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
      const res = await axios.get("/api/auth/getUsername", { withCredentials: true }); // cookie is sent automatically
      console.log("res: " + res);
      setUser({ username: res.data.username }); // It will create a AuthObject that looks like: user: { username: "YardenShay" }, refreUser: .., clearUser: ..

      console.log("Created an AuthObject object ")

    } catch {
      setUser(null);
    }
  }

  function clearUser() {
  axios.post("/api/auth/logout")  .then(function (response) {
    console.log("Post call succeeded: " + response);
  })
  .catch(function (error) {
    console.log("Post call failed: " + error);
  });
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
