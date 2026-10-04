import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import RoleSelect from "./pages/auth/RoleSelect";
import StudentLogin from "./pages/auth/StudentLogin";
import TpoLogin from "./pages/auth/TpoLogin";
import StudentLayout from "./components/StudentLayout";
import TpoLayout from "./components/TpoLayout";
import Dashboard from "./pages/student/Dashboard";
import InterviewExperiences from "./pages/student/InterviewExperiences";
import HackathonExperiences from "./pages/student/HackathonExperiences";
import Clubs from "./pages/student/Clubs";
import Resources from "./pages/student/Resources";
import Placements from "./pages/student/Placements";
import Profile from "./pages/student/Profile";
import TpoPlacements from "./pages/tpo/TpoPlacements";

function Guard({ role, children }) {
  const { session } = useAuth();
  if (!session) return <Navigate to="/" replace />;
  if (session.role !== role) return <Navigate to={role === "student" ? "/dashboard" : "/tpo/placements"} replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelect />} />
      <Route path="/login/student" element={<StudentLogin />} />
      <Route path="/login/tpo" element={<TpoLogin />} />

      <Route element={<Guard role="student"><StudentLayout /></Guard>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interviews" element={<InterviewExperiences />} />
        <Route path="/hackathons" element={<HackathonExperiences />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/placements" element={<Placements />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<Guard role="tpo"><TpoLayout /></Guard>}>
        <Route path="/tpo/placements" element={<TpoPlacements />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}