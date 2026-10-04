import { useState } from "react";
import { Outlet } from "react-router-dom";
import TpoSidebar from "./TpoSidebar";
import Topbar from "./Topbar";
import { useAuth } from "../context/AuthContext";

export default function TpoLayout() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  return (
    <div className="app-shell">
      <TpoSidebar open={open} onClose={() => setOpen(false)} />
      <div className="main-shell">
        <Topbar onMenu={() => setOpen(true)} onProfile={logout} />
        <main className="page-content"><Outlet /></main>
      </div>
    </div>
  );
}