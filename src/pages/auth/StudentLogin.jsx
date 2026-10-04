import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, UserRound, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Brand from "../../components/Brand";
import { useAuth } from "../../context/AuthContext";

export default function StudentLogin() {
  const navigate = useNavigate();
  const { loginStudent } = useAuth();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }
    try { loginStudent(form); navigate("/dashboard"); }
    catch (err) { setError(err.message); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card login-card">
        <button className="back-link" onClick={() => navigate("/")}><ArrowLeft size={17}/> Back</button>
        <Brand />
        <div className="tagline">YOUR CAMPUS. YOUR KNOWLEDGE.</div>
        <div className="auth-divider"/>
        <h1>Student Login</h1>
        <p className="auth-subtitle">Sign in to explore, learn and share.</p>
        <form onSubmit={submit} className="form-stack">
          <label><span>Full Name / Username</span><div className="input-wrap"><UserRound/><input value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})} placeholder="Full name" required/></div></label>
          <label><span>Email ID</span><div className="input-wrap"><Mail/><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com" required/></div></label>
          <label><span>Password</span><div className="input-wrap"><Lock/><input type={show?"text":"password"} value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" required/><button type="button" className="input-action" onClick={()=>setShow(!show)}>{show?<EyeOff/>:<Eye/>}</button></div></label>
          {error && <div className="form-error">{error}</div>}
          <button className="primary-button submit-button">Login <ArrowRight size={19}/></button>
        </form>
        <p className="auto-account">New here? Enter your details and a student profile is created automatically.</p>
      </div>
    </div>
  );
}