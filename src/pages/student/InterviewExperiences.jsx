import { useEffect, useMemo, useRef, useState } from "react";
import { BriefcaseBusiness, Plus, Search, ChevronDown, Heart, MessageCircle, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { repository } from "../../services/repository";
import GlassModal from "../../components/GlassModal";
import EmptyState from "../../components/EmptyState";

const empty = { company:"", role:"", year:"", experienceType:"", interviewer:"", opportunity:"", experience:"" };

export default function InterviewExperiences() {
  const { session } = useAuth();
  const bottomRef = useRef(null);
  const [items,setItems] = useState(()=>repository.list("interviews"));
  const [search,setSearch] = useState("");
  const [filters,setFilters] = useState({company:"",role:"",year:"",experienceType:""});
  const [form,setForm] = useState(empty);
  const [open,setOpen] = useState(false);
  const [expanded,setExpanded] = useState(null);

  const filtered = useMemo(()=>items.filter(x=>{
    const q=search.toLowerCase();
    return (!q || `${x.company} ${x.role}`.toLowerCase().includes(q))
      && (!filters.company || x.company===filters.company)
      && (!filters.role || x.role===filters.role)
      && (!filters.year || String(x.year)===filters.year)
      && (!filters.experienceType || x.experienceType===filters.experienceType);
  }),[items,search,filters]);

  const submit=(e)=>{
    e.preventDefault();
    const next=repository.add("interviews",{...form,authorEmail:session.user.email,authorName:session.user.fullName});
    setItems(next); setForm(empty); setOpen(false); setTimeout(()=>bottomRef.current?.scrollIntoView({behavior:"smooth"}),50);
  };

  useEffect(()=>{},[items]);

  return <div className="content-page">
    <PageHeader eyebrow="EXPLORE" title="Interview Experiences" subtitle="Learn from students who have been there." onPlus={()=>bottomRef.current?.scrollIntoView({behavior:"smooth"})}/>
    <div className="filter-bar">
      <div className="search-box"><Search/><input placeholder="Search for company name or role..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      {["company","role","year","experienceType"].map(key=><Filter key={key} label={key==="experienceType"?"Experience Type":key[0].toUpperCase()+key.slice(1)} value={filters[key]} onChange={v=>setFilters({...filters,[key]:v})} options={[...new Set(items.map(x=>x[key]).filter(Boolean))]}/>)}
      <button className="clear-button" onClick={()=>{setSearch("");setFilters({company:"",role:"",year:"",experienceType:""})}}>Clear Filters</button>
    </div>

    {filtered.length===0 ? <EmptyState message="No interview experiences yet." action={<button className="primary-button" onClick={()=>bottomRef.current?.scrollIntoView({behavior:"smooth"})}>Share Your Experience</button>}/> :
      <div className="card-grid">{filtered.map(item=><article className="data-card glass-panel" key={item.id}>
        <div className="card-top"><div className="company-mark"><BriefcaseBusiness/></div><div><h3>{item.company}</h3><p>{item.role}</p></div></div>
        <div className="chips"><span>{item.role}</span><span>{item.year}</span><span>{item.experienceType}</span></div>
        <p className={expanded===item.id?"experience full":"experience"}>{item.experience}</p>
        <button className="read-more" onClick={()=>setExpanded(expanded===item.id?null:item.id)}>{expanded===item.id?"Show Less":"Read More"} <ChevronDown className={expanded===item.id?"rotate":""}/></button>
        <div className="card-footer"><span><Heart/> 0</span><span><MessageCircle/> 0</span></div>
      </article>)}</div>}

    <section ref={bottomRef} className="contribute-section glass-panel">
      <div><p className="eyebrow">CONTRIBUTE</p><h2>Share Your Interview Experience</h2><p>Help your peers by sharing your interview experience.</p></div>
      <button className="primary-button" onClick={()=>setOpen(true)}><Plus/> Share Your Experience</button>
    </section>

    <GlassModal open={open} onClose={()=>setOpen(false)} title="Share Your Interview Experience" subtitle="Help your peers by sharing your interview experience." wide>
      <form className="form-grid" onSubmit={submit}>
        <Field label="Company Name" value={form.company} onChange={v=>setForm({...form,company:v})} required/>
        <Field label="Role" value={form.role} onChange={v=>setForm({...form,role:v})} required/>
        <Field label="Interviewer" value={form.interviewer} onChange={v=>setForm({...form,interviewer:v})}/>
        <SelectField label="Interview Year" value={form.year} options={years()} onChange={v=>setForm({...form,year:v})} required/>
        <SelectField label="How did you get this opportunity?" value={form.opportunity} options={["TPO","On Campus","LinkedIn","Social Media","Cold DM","Referral","Other"]} onChange={v=>setForm({...form,opportunity:v})} required/>
        <SelectField label="Experience Type" value={form.experienceType} options={["On-campus","Off-campus","Referral","Other"]} onChange={v=>setForm({...form,experienceType:v})} required/>
        <TextArea label="Your Experience" value={form.experience} onChange={v=>setForm({...form,experience:v})} required full/>
        <div className="form-actions full"><button type="button" className="secondary-button" onClick={()=>setOpen(false)}>Cancel</button><button className="primary-button">Submit Experience</button></div>
      </form>
    </GlassModal>
  </div>
}

function years(){return Array.from({length:8},(_,i)=>String(new Date().getFullYear()-i))}
function PageHeader({eyebrow,title,subtitle,onPlus}){return <div className="page-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{subtitle}</p></div><button className="plus-button" onClick={onPlus}><Plus/></button></div>}
function Filter({label,value,onChange,options}){return <label className="select-box"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}><option value="">{label}</option>{options.map(o=><option key={o}>{o}</option>)}</select><ChevronDown/></label>}
function Field({label,value,onChange,required,full}){return <label className={full?"full":""}><span>{label}{required&&" *"}</span><input value={value} onChange={e=>onChange(e.target.value)} required={required} /></label>}
function SelectField({label,value,onChange,options,required,full}){return <label className={full?"full":""}><span>{label}{required&&" *"}</span><select value={value} onChange={e=>onChange(e.target.value)} required={required}><option value="">Select an option</option>{options.map(o=><option key={o}>{o}</option>)}</select></label>}
function TextArea({label,value,onChange,required,full}){return <label className={full?"full":""}><span>{label}{required&&" *"}</span><textarea value={value} onChange={e=>onChange(e.target.value)} required={required}/></label>}