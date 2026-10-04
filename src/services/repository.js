/*
  Front-end data boundary.
  TODAY: localStorage stores only data that the user actually enters.
  LATER: replace each function with fetch("/api/...") calls to Flask/SQL.
  No seed/dummy records are created anywhere.
*/

const KEYS = {
  interviews: "ckr_interviews",
  hackathons: "ckr_hackathons",
  clubs: "ckr_clubs",
  resources: "ckr_resources",
  placements: "ckr_placements"
};

const read = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const repository = {
  list(type) { return read(KEYS[type]); },
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