import { NavLink } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import Brand from "./Brand";

export default function TpoSidebar({ open, onClose }) {
  return <>
    <div className={`sidebar-overlay ${open ? "show" : ""}`} onClick={onClose}/>
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-brand"><Brand /></div>
      <nav>
        <NavLink to="/tpo/placements" className={({isActive})=>isActive?"nav-item active":"nav-item"} onClick={onClose}>
          <BarChart3 size={20} strokeWidth={1.7}/><span>Placement Information</span>
        </NavLink>
      </nav>
    </aside>
  </>;
}