import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);
const STUDENT_KEY = "ckr_student";
const SESSION_KEY = "ckr_session";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
    catch { return null; }
  });

  const loginStudent = ({ fullName, email, password }) => {
    const name = fullName.trim();
    const normalizedEmail = email.trim().toLowerCase();
    if (!name || !normalizedEmail || !password) throw new Error("Please fill all fields.");
    const student = {
      fullName: name,
      email: normalizedEmail,
      password,
      firstName: name.split(/\s+/)[0],
      middleName: name.split(/\s+/).slice(1, -1).join(" "),
      lastName: name.split(/\s+/).slice(-1)[0] || "",
      batch: "",
      department: "",
      knowledgePoints: 0
    };
    localStorage.setItem(STUDENT_KEY, JSON.stringify(student));
    const next = { role: "student", user: student };
    localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    setSession(next);
    return next;
  };

  const updateStudent = (patch) => {
    if (!session?.user) return;
    const updated = { ...session.user, ...patch };
    const next = { ...session, user: updated };
    localStorage.setItem(STUDENT_KEY, JSON.stringify(updated));
    localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    setSession(next);
  };

  const loginTpo = async ({ adminName, password, verificationId }) => {
    const localMode = import.meta.env.VITE_LOCAL_TPO_AUTH === "true";
    if (localMode) {
      if (!adminName || !password || !verificationId) {
        throw new Error("All TPO fields are required.");
      }
      const next = { role: "tpo", user: { adminName, verificationId } };
      localStorage.setItem(SESSION_KEY, JSON.stringify(next));
      setSession(next);
      return next;
    }

    const response = await fetch("/api/auth/tpo/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminName, password, verificationId })
    }).catch(() => null);

    if (!response) {
      throw new Error("TPO authentication is waiting for the Flask backend.");
    }
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.message || "Incorrect TPO credentials.");
    const next = { role: "tpo", user: body.user || { adminName, verificationId } };
    localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    setSession(next);
    return next;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  const value = useMemo(() => ({
    session,
    isStudent: session?.role === "student",
    isTpo: session?.role === "tpo",
    loginStudent,
    loginTpo,
    updateStudent,
    logout
  }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);