
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("careUser") || "null");
    } catch {
      return null;
    }
  });

  function signup(details) {
    const account = {
      name: details.name.trim(),
      patientId: details.patientId.trim(),
      email: details.email.trim().toLowerCase(),
      phone: details.phone.trim(),
      password: details.password
    };

    localStorage.setItem("careSignup", JSON.stringify(account));
    return "";
  }

  function login(identity, password) {
    let account;

    try {
      account = JSON.parse(localStorage.getItem("careSignup") || "null");
    } catch {
      account = null;
    }

    const entered = identity.trim().toLowerCase();

    if (
      !identity.trim() ||
      !password ||
      !account ||
      (entered !== (account.email || "").toLowerCase() &&
       entered !== (account.patientId || "").toLowerCase()) ||
      password !== account.password
    ) {
      return "Invalid Patient ID/email or password.";
    }

    const loggedInUser = {
      name: account.name,
      patientId: account.patientId,
      email: account.email,
      phone: account.phone
    };

    localStorage.setItem("careUser", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return "";
  }

  function logout() {
    localStorage.removeItem("careUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
