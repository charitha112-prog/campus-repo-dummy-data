import { useMemo, useState } from "react";
import { BriefcaseBusiness, CalendarDays, Search, GraduationCap, ChevronDown } from "lucide-react";
import { repository } from "../../services/repository";
import GlassModal from "../../components/GlassModal";
import EmptyState from "../../components/EmptyState";

export default function Placements(){
 const [items]=useState(()=>repository.list("placements")); const [q,setQ]=useState(""); const [selected,setSelected]=useState(null);
 const filtered=useMemo(()=>items.filter(x=>`${x.companyName} ${x.role}`.toLowerCase().includes(q.toLowerCase())),[items,q]);
 return <div className="content-page"><div className="page-header"><div><p className="eyebrow">EXPLORE</p><h1>Placement Information</h1><p>Stay updated with official placement opportunities.</p></div></div><div className="filter-bar"><div className="search-box"><Search/><input placeholder="Search by company name or role..." value={q} onChange={e=>setQ(e.target.value)}/></div></div>
 {filtered.length===0?<EmptyState message="No placement information available yet."/>:<div className="placement-grid">{filtered.map(x=><article className="placement-card glass-panel" key={x.id}><div className="company-mark"><BriefcaseBusiness/></div><h3>{x.companyName}</h3><p>{x.role}</p><div className="placement-row"><span><BriefcaseBusiness/>Package</span><strong>{x.package}</strong></div><div className="placement-row"><span><GraduationCap/>Eligibility</span><p>{x.eligibilityCriteria}</p></div><div className="placement-row"><span><CalendarDays/>Application Deadline</span><strong>{x.applicationDeadline}</strong></div><button className="primary-button" onClick={()=>setSelected(x)}>View Details <ChevronDown/></button></article>)}</div>}
 <GlassModal open={!!selected} onClose={()=>setSelected(null)} title={selected?.companyName||""} subtitle={selected?.role}><div className="detail-panel"><h3>Eligibility</h3><p>{selected?.eligibilityCriteria}</p><h3>Selection Process</h3><p>{selected?.selectionProcess}</p></div></GlassModal>
 </div>
}