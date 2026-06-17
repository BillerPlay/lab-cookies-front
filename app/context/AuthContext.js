"use client";

import { createContext, useContext, useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const AuthContext = createContext(null);

async function fetchMe() {
  const response = await fetch(`${API_BASE_URL}/api/me`, {
    credentials: "include",
  });
  if (!response.ok) return null;
  return response.json(); // UserDto directly: { id, name, email }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if there is already an active session
  useEffect(() => {
    fetchMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      let message = `Request failed (${response.status})`;
      try {
        const json = await response.json();
        if (json.message) message = json.message;
      } catch { /* non-JSON body */ }
      throw new Error(message);
    }

    // Cookie is now set — ask the backend who we are
    const user = await fetchMe();
    setUser(user);
  }

  async function signup(name, email, password) {
    const response = await fetch(`${API_BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      let message = `Request failed (${response.status})`;
      try {
        const json = await response.json();
        if (json.message) message = json.message;
      } catch { /* non-JSON body */ }
      throw new Error(message);
    }

    // Cookie is now set — ask the backend who we are
    const user = await fetchMe();
    setUser(user);
  }

  async function logout() {
    await fetch(`${API_BASE_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
}