import { NavLink } from "react-router-dom";
import { BarChart3, BookOpen, BriefcaseBusiness, FileText, Home, Users, Trophy, X } from "lucide-react";
import Brand from "./Brand";

const links = [
  ["/dashboard", Home, "Dashboard"],
  ["/interviews", BriefcaseBusiness, "Interview Experiences"],
  ["/hackathons", Trophy, "Hackathon Experiences"],
  ["/clubs", Users, "Club Reviews"],
  ["/resources", FileText, "Academic Resources"],
  ["/placements", BarChart3, "Placement Information"]
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <div className={`sidebar-overlay ${open ? "show" : ""}`} onClick={onClose}/>
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-brand"><Brand /></div>
        <nav>
          {links.map(([to, Icon, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={onClose}>
              <Icon size={20} strokeWidth={1.7}/><span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}