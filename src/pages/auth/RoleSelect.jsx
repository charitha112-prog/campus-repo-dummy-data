import { useNavigate } from "react-router-dom";
import { Building2, GraduationCap, ArrowRight } from "lucide-react";
import Brand from "../../components/Brand";

export default function RoleSelect() {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="auth-card role-card">
        <Brand />
        <div className="tagline">YOUR CAMPUS. YOUR KNOWLEDGE.</div>
        <div className="auth-divider"/>
        <h1>How would you like to continue?</h1>
        <div className="role-grid">
          <button className="role-tile student" onClick={() => navigate("/login/student")}>
            <GraduationCap size={48}/>
            <strong>Student</strong>
            <span>Explore experiences, resources, clubs and placement information.</span>
            <i><ArrowRight size={20}/></i>
          </button>
          <button className="role-tile admin" onClick={() => navigate("/login/tpo")}>
            <Building2 size={48}/>
            <strong>TPO Admin</strong>
            <span>Manage and publish official placement information.</span>
            <i><ArrowRight size={20}/></i>
          </button>
        </div>
      </div>
    </div>
  );
}