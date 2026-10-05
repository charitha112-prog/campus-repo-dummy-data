import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, ShieldCheck, UserRound, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Brand from "../../components/Brand";
import GlassModal from "../../components/GlassModal";
import { useAuth } from "../../context/AuthContext";

export default function TpoLogin() {
  const navigate = useNavigate();
  const { loginTpo } = useAuth();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ adminName: "", password: "", verificationId: "" });
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault(); setError("");
    if (!form.adminName || !form.password || !form.verificationId) { setError("All fields are required."); return; }
    try { await loginTpo(form); setResult("success"); }
    catch (err) { setResult("error"); setError(err.message); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card login-card">
        <button className="back-link" onClick={() => navigate("/")}><ArrowLeft size={17}/> Back</button>
        <Brand />
        <div className="tagline">YOUR CAMPUS. YOUR KNOWLEDGE.</div>
        <div className="auth-divider"/>
        <h1>TPO Admin Login</h1>
        <p className="auth-subtitle">Access the admin portal to manage placement information.</p>
        <form onSubmit={submit} className="form-stack">
          <label><span>Admin Username</span><div className="input-wrap"><UserRound/><input value={form.adminName} onChange={e=>setForm({...form,adminName:e.target.value})} required/></div></label>
          <label><span>Password</span><div className="input-wrap"><Lock/><input type={show?"text":"password"} value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/><button type="button" className="input-action" onClick={()=>setShow(!show)}>{show?<EyeOff/>:<Eye/>}</button></div></label>
          <label><span>Verification ID</span><div className="input-wrap"><ShieldCheck/><input value={form.verificationId} onChange={e=>setForm({...form,verificationId:e.target.value})} required/></div></label>
          {error && <div className="form-error">{error}</div>}
          <button className="primary-button submit-button">Login <ArrowRight size={19}/></button>
        </form>
        <p className="auto-account">TPO credentials are validated by Flask once the backend is connected.</p>
      </div>

      <GlassModal open={result !== null} onClose={()=>setResult(null)} title={result==="success" ? "Login Successful" : "Incorrect Password"}>
        <div className={`result-panel ${result==="success" ? "success" : "danger"}`}>
          {result==="success" ? <CheckCircle2 size={48}/> : <XCircle size={48}/>}
          <h3>{result==="success" ? "Welcome to Campus Knowledge Repository!" : "The credentials could not be verified."}</h3>
          {result==="success"
            ? <button className="primary-button" onClick={()=>navigate("/tpo/placements")}>Go to Dashboard <ArrowRight size={18}/></button>
            : <button className="primary-button" onClick={()=>setResult(null)}>Try Again</button>}
        </div>
      </GlassModal>
    </div>
  );
}