import { Menu, UserCircle } from "lucide-react";
import Brand from "./Brand";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onMenu, onProfile }) {
  const { session } = useAuth();
  const navigate = useNavigate();
  const label = session?.role === "tpo" ? (session.user?.adminName || "T") : (session?.user?.firstName || "S");
  return (
    <header className="topbar">
      <button className="menu-button" onClick={onMenu} aria-label="Open menu"><Menu size={25}/></button>
      <Brand compact />
      <div className="topbar-spacer"/>
      <button className="avatar-button" onClick={onProfile} title="Profile">
        {label.slice(0,1).toUpperCase()}
      </button>
    </header>
  );
}