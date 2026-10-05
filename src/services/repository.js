/*
  Front-end data boundary.
  DEMO MODE: the first visit seeds clearly-labelled demo records so every
  content page has realistic reference data to explore.
  LATER: replace these functions with fetch('/api/...') calls to Flask/SQL.
  User-created records continue to be stored in localStorage.
*/

const KEYS = {
  interviews: "ckr_interviews",
  hackathons: "ckr_hackathons",
  clubs: "ckr_clubs",
  resources: "ckr_resources",
  placements: "ckr_placements"
};

const DEMO = {
  interviews: [
    { id:"demo-i-1", company:"Google", role:"Software Development Engineer", year:"2025", experienceType:"On-campus", interviewer:"Technical Panel", opportunity:"TPO", experience:"Three rounds: online assessment, technical interview and HR. Focus was on DSA, problem solving, projects and core CS fundamentals.", authorName:"Aarav Sharma", authorEmail:"demo-google@campus.local" },
    { id:"demo-i-2", company:"Microsoft", role:"Data Analyst", year:"2025", experienceType:"Off-campus", interviewer:"Data & Analytics Panel", opportunity:"LinkedIn", experience:"The process included an aptitude round followed by SQL, Python and analytical case questions. Communication and structured reasoning were important.", authorName:"Meera Nair", authorEmail:"demo-microsoft@campus.local" },
    { id:"demo-i-3", company:"Amazon", role:"Software Development Engineer", year:"2024", experienceType:"Referral", interviewer:"SDE Panel", opportunity:"Referral", experience:"The OA covered DSA and aptitude. Interviews focused on arrays, strings, trees, complexity and project discussions, followed by behavioural questions.", authorName:"Rohan Iyer", authorEmail:"demo-amazon@campus.local" },
    { id:"demo-i-4", company:"Deloitte", role:"Technology Analyst", year:"2025", experienceType:"On-campus", interviewer:"Technology Panel", opportunity:"TPO", experience:"Rounds included aptitude, communication and technical discussion. SQL, OOP, DBMS and resume-based questions were common themes.", authorName:"Ishita Rao", authorEmail:"demo-deloitte@campus.local" }
  ],
  hackathons: [
    { id:"demo-h-1", hackathonName:"Smart India Hackathon", semester:"Semester 5", participationType:"Team", teamSize:"6", role:"Backend Developer", technologies:"Python, FastAPI, MySQL", experience:"Built a railway passenger-assistance prototype with live-status integration, alerts and a chatbot. The biggest learning was dividing modules early and testing integrations continuously.", date:"2026-02-18", authorName:"Aarav Sharma", authorEmail:"demo-sih@campus.local" },
    { id:"demo-h-2", hackathonName:"HackTheFuture", semester:"Semester 4", participationType:"Team", teamSize:"4", role:"Frontend Developer", technologies:"React, JavaScript, MongoDB", experience:"Developed a community platform for students to share resources. We used reusable components and learned how to manage Git branches during rapid iteration.", date:"2026-01-22", authorName:"Meera Nair", authorEmail:"demo-htf@campus.local" },
    { id:"demo-h-3", hackathonName:"NASA Space Apps Challenge", semester:"Semester 3", participationType:"Team", teamSize:"5", role:"UI/UX Designer", technologies:"Figma, React, APIs", experience:"Designed an interactive dashboard for satellite data. The team focused on turning complex information into simple visual stories and a clear user journey.", date:"2025-11-10", authorName:"Rohan Iyer", authorEmail:"demo-nasa@campus.local" },
    { id:"demo-h-4", hackathonName:"Code for Good", semester:"Semester 5", participationType:"Individual", teamSize:"", role:"Full Stack Developer", technologies:"JavaScript, Node.js, MySQL", experience:"Created a small civic-tech prototype from idea to demo. Working independently improved my ability to scope features and prioritize a usable MVP.", date:"2025-09-14", authorName:"Ishita Rao", authorEmail:"demo-cfg@campus.local" }
  ],
  clubs: [
    { id:"demo-c-1", clubName:"MARVEL", clubType:"Technical Club", reviews:[
      { id:"demo-r-1", authorName:"Aarav Sharma", rating:5, review:"Great place to work on technical projects, attend workshops and meet students from different branches." },
      { id:"demo-r-2", authorName:"Meera Nair", rating:4, review:"Good exposure to events and teamwork. The experience depends on how actively you participate." }
    ] },
    { id:"demo-c-2", clubName:"CodeChef Campus Chapter", clubType:"Coding Club", reviews:[
      { id:"demo-r-3", authorName:"Rohan Iyer", rating:4, review:"Useful for coding practice and contests. Regular problem-solving sessions helped me stay consistent." }
    ] },
    { id:"demo-c-3", clubName:"Aero Club", clubType:"Aviation & Innovation Club", reviews:[
      { id:"demo-r-4", authorName:"Ishita Rao", rating:5, review:"Hands-on events and a friendly community. Good exposure to aviation concepts and innovation activities." }
    ] },
    { id:"demo-c-4", clubName:"Literary Society", clubType:"Literary & Cultural Club", reviews:[] }
  ],
  resources: [
    { id:"demo-res-1", title:"Data Structures Complete Notes", description:"Core data structures, complexity, linked lists, stacks, queues, trees and practice topics.", semester:"Semester 3", subject:"Data Structures", resourceLink:"https://www.geeksforgeeks.org/data-structures/", premium:false },
    { id:"demo-res-2", title:"Engineering Mathematics II Previous Papers", description:"Previous-paper reference set with commonly repeated question patterns and revision topics.", semester:"Semester 2", subject:"Engineering Mathematics", resourceLink:"https://example.com/engineering-mathematics-ii", premium:false },
    { id:"demo-res-3", title:"Operating Systems Lecture Slides", description:"Processes, threads, scheduling, deadlocks, memory management and file systems.", semester:"Semester 5", subject:"Operating Systems", resourceLink:"https://www.geeksforgeeks.org/operating-systems/", premium:false },
    { id:"demo-res-4", title:"DBMS Short Notes", description:"SQL, normalization, transactions, keys, joins and important database concepts.", semester:"Semester 4", subject:"DBMS", resourceLink:"https://www.geeksforgeeks.org/dbms/", premium:true },
    { id:"demo-res-5", title:"Computer Networks Handwritten Notes", description:"Layered architecture, TCP/IP, routing, transport protocols and network fundamentals.", semester:"Semester 4", subject:"Computer Networks", resourceLink:"https://www.geeksforgeeks.org/computer-network-tutorials/", premium:false },
    { id:"demo-res-6", title:"Python Practice Programs", description:"Beginner-friendly Python programs covering loops, functions, files and common interview patterns.", semester:"Semester 1", subject:"Python", resourceLink:"https://www.python.org/about/gettingstarted/", premium:false },
    { id:"demo-res-7", title:"Digital Image Processing Notes", description:"Image enhancement, filtering, edge detection and introductory computer-vision concepts.", semester:"Semester 5", subject:"Digital Image Processing", resourceLink:"https://opencv.org/", premium:false },
    { id:"demo-res-8", title:"Machine Learning Cheat Sheet", description:"Quick revision of supervised learning, evaluation metrics and common ML workflows.", semester:"Semester 6", subject:"Machine Learning", resourceLink:"https://scikit-learn.org/stable/user_guide.html", premium:true }
  ],
  placements: [
    { id:"demo-p-1", companyName:"Google", role:"Software Development Engineer (SDE)", package:"₹45 LPA (CTC)", applicationDeadline:"2026-10-15", eligibilityCriteria:"B.E./B.Tech in CS/IT/AI-ML or related branch with strong DSA and programming fundamentals.", selectionProcess:"Online assessment → Technical Interview → System Design discussion → HR / Behavioural round." },
    { id:"demo-p-2", companyName:"Microsoft", role:"Software Engineer", package:"₹32 LPA (CTC)", applicationDeadline:"2026-10-20", eligibilityCriteria:"B.E./B.Tech with strong programming skills, problem solving and good academic record.", selectionProcess:"Online assessment → Coding interviews → Technical discussion → HR / Behavioural round." },
    { id:"demo-p-3", companyName:"Amazon", role:"SDE Intern / SDE", package:"₹28 LPA (CTC)", applicationDeadline:"2026-10-18", eligibilityCriteria:"B.E./B.Tech in a relevant branch with DSA, coding and CS fundamentals.", selectionProcess:"Online assessment → Technical rounds → Leadership-principles discussion → HR." },
    { id:"demo-p-4", companyName:"Goldman Sachs", role:"Engineering / Technology Analyst", package:"₹25 LPA (CTC)", applicationDeadline:"2026-10-12", eligibilityCriteria:"B.E./B.Tech students with strong coding, analytical and problem-solving skills.", selectionProcess:"Online assessment → Technical interview → Problem solving / project discussion → HR." },
    { id:"demo-p-5", companyName:"Infosys", role:"Systems Engineer", package:"₹9.5 LPA (CTC)", applicationDeadline:"2026-09-30", eligibilityCriteria:"B.E./B.Tech graduates meeting the required academic criteria and no active backlogs.", selectionProcess:"Aptitude → Technical assessment → Interview → HR." },
    { id:"demo-p-6", companyName:"TCS", role:"Digital / IT Analyst", package:"₹7 LPA (CTC)", applicationDeadline:"2026-09-25", eligibilityCriteria:"B.E./B.Tech students with the required academic record and programming basics.", selectionProcess:"TCS assessment → Technical interview → Managerial discussion → HR." }
  ]
};

const read = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

function ensureDemoData() {
  if (localStorage.getItem("ckr_demo_seeded_v2") === "true") return;
  Object.entries(DEMO).forEach(([type, items]) => write(KEYS[type], items));
  localStorage.setItem("ckr_demo_seeded_v2", "true");
}

ensureDemoData();

export const repository = {
  list(type) { ensureDemoData(); return read(KEYS[type]); },
  add(type, item) {
    const next = [...read(KEYS[type]), { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...item }];
    write(KEYS[type], next);
    return next;
  },
  update(type, id, patch) {
    const next = read(KEYS[type]).map(item => item.id === id ? { ...item, ...patch } : item);
    write(KEYS[type], next);
    return next;
  }
};
