import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Award, BookOpen, BriefcaseBusiness, FileText, Trophy, Users } from "lucide-react";
import { repository } from "../../services/repository";

const cards = [
  ["/interviews", BriefcaseBusiness, "Interview Experiences", "Learn from real interview experiences shared by students."],
  ["/hackathons", Trophy, "Hackathon Experiences", "Explore hackathon journeys, technologies and team experiences."],
  ["/clubs", Users, "Club Reviews", "Read and write reviews about campus clubs."],
  ["/resources", FileText, "Academic Resources", "Find notes, question papers and useful study material."],
  ["/placements", BookOpen, "Placement Information", "View company details, eligibility criteria and selection processes."]
];

export default function Dashboard() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const points = session?.user?.knowledgePoints ?? 0;
  const name = session?.user?.firstName || "Student";
  const contributions = {
    interviews: repository.list("interviews").filter(x=>x.authorEmail===session?.user?.email).length,
    hackathons: repository.list("hackathons").filter(x=>x.authorEmail===session?.user?.email).length,
    clubs: repository.list("clubs").filter(x=>x.authorEmail===session?.user?.email).length
  };

  return (
    <div className="dashboard-page">
      <section className="hero-heading">
        <p className="eyebrow">CAMPUS KNOWLEDGE</p>
        <h1>Good morning,<br/><span>{name}</span></h1>
        <p>Explore. Learn. Share.</p>
      </section>

      <section className="dashboard-top-grid">
        <div className="knowledge-card glass-panel">
          <div className="section-icon"><Award/></div>
          <div><h2>Your Knowledge Points</h2><strong>{points}</strong><p>Your contributions help build a stronger campus community.</p></div>
          <div className="progress-row"><div className="progress"><i style={{width:`${Math.min(points,100)}%`}}/></div><span>/ 100</span></div>
        </div>
        <div className="premium-card glass-panel">
          <div className="section-icon"><Award/></div>
          <div><h2>Unlock Premium at 100 Points</h2><p>Get quick access to exclusive resources, priority content and more.</p></div>
          <ul><li>Quick access to resources</li><li>Exclusive study material</li><li>Early updates and more</li></ul>
          <button onClick={()=>navigate("/resources")} className="premium-cta">To earn more knowledge points, contribute to the campus community! <ArrowRight/></button>
        </div>
      </section>

      <section>
        <div className="section-heading"><h2>Explore</h2><p>Discover, learn and contribute to the campus community.</p></div>
        <div className="explore-grid">
          {cards.map(([to,Icon,title,desc])=><button key={to} className="explore-card glass-panel" onClick={()=>navigate(to)}>
            <span className="section-icon"><Icon/></span><span><strong>{title}</strong><small>{desc}</small></span><i><ArrowRight/></i>
          </button>)}
        </div>
      </section>

      <section className="mini-stats">
        <div><span>Interview Contributions</span><strong>{contributions.interviews}</strong></div>
        <div><span>Hackathon Contributions</span><strong>{contributions.hackathons}</strong></div>
        <div><span>Club Reviews</span><strong>{contributions.clubs}</strong></div>
      </section>
    </div>
  );
}