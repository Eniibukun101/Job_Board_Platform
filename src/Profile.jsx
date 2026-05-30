import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Edit2, Save, X, Upload, MapPin, Plus, Trash2,
  Globe, Camera, CheckCircle, User, MessageSquare, Home
} from "lucide-react";

const s = {
  page: { minHeight: "100vh", background: "#f3f4f6", fontFamily: "'Segoe UI', sans-serif" },
  nav: { background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  navLogo: { display: "flex", alignItems: "center", gap: 8 },
  navIcon: { width: 28, height: 28, background: "#111827", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: 13 },
  navTitle: { fontWeight: 700, fontSize: 14, color: "#111827", letterSpacing: "-0.3px" },
  navActions: { display: "flex", gap: 20, color: "#9ca3af" },
  body: { width: "100%", padding: "32px 48px", display: "flex", gap: 28, alignItems: "flex-start", boxSizing: "border-box" },
  left: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 },
  sidebar: { width: 320, flexShrink: 0, position: "sticky", top: 80 },
  card: { background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: 28 },
  sectionHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  sectionTitle: { fontSize: 15, fontWeight: 600, color: "#374151", margin: 0 },
  editBtn: { display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#9ca3af", background: "none", border: "none", cursor: "pointer", padding: "2px 6px", borderRadius: 6 },
  saveBtn: { display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#fff", background: "#22c55e", border: "none", cursor: "pointer", padding: "6px 12px", borderRadius: 8 },
  cancelBtn: { display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#9ca3af", background: "none", border: "none", cursor: "pointer" },
  btnRow: { display: "flex", gap: 8 },
  label: { fontSize: 12, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4, display: "block" },
  input: { border: "1px solid #e5e7eb", borderRadius: 8, padding: "9px 14px", fontSize: 14, color: "#111827", width: "100%", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  textarea: { border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "#374151", width: "100%", outline: "none", boxSizing: "border-box", resize: "none", fontFamily: "inherit", lineHeight: 1.6 },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  valLabel: { fontSize: 12, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2, margin: 0 },
  valText: { fontSize: 15, color: "#111827", fontWeight: 500, margin: 0, marginTop: 2 },
  muted: { fontSize: 14, color: "#d1d5db", fontStyle: "italic", margin: 0 },
  photoWrap: { display: "flex", alignItems: "center", gap: 24 },
  photoCircle: { width: 88, height: 88, borderRadius: "50%", background: "#f3f4f6", border: "2px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative", flexShrink: 0 },
  cameraBtn: { position: "absolute", bottom: 0, right: 0, width: 26, height: 26, background: "#22c55e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff", cursor: "pointer" },
  uploadBtn: { border: "1px solid #d1d5db", background: "#fff", color: "#374151", fontSize: 13, fontWeight: 500, padding: "6px 16px", borderRadius: 8, cursor: "pointer" },
  photoNote: { fontSize: 11, color: "#9ca3af", marginTop: 6, lineHeight: 1.5 },
  skillDot: { width: 6, height: 6, borderRadius: "50%", background: "#4ade80", flexShrink: 0, marginTop: 4 },
  skillItem: { display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 },
  skillText: { fontSize: 14, color: "#4b5563" },
  skillInputRow: { display: "flex", gap: 8, marginTop: 8 },
  addBtn: { width: 32, height: 32, background: "#22c55e", border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  trashBtn: { background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" },
  linkRow: { display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 },
  linkBadge: { fontSize: 11, fontWeight: 700, color: "#3b82f6", background: "#eff6ff", padding: "2px 6px", borderRadius: 4, flexShrink: 0 },
  linkLabel: { fontSize: 11, color: "#9ca3af", fontWeight: 500, marginBottom: 1, margin: 0 },
  linkAnchor: { fontSize: 13, color: "#3b82f6", textDecoration: "none" },
  expBlock: { marginBottom: 14 },
  expTitle: { fontSize: 14, fontWeight: 600, color: "#111827", margin: 0 },
  expSub: { fontSize: 12, color: "#9ca3af", marginTop: 2, margin: 0 },
  expCompany: { fontSize: 13, color: "#6b7280", fontWeight: 500, marginTop: 1, margin: 0 },
  expEditCard: { border: "1px solid #f3f4f6", borderRadius: 10, padding: 12, marginBottom: 10 },
  cvBtn: { display: "flex", alignItems: "center", gap: 8, background: "#111827", color: "#fff", fontSize: 13, fontWeight: 500, padding: "8px 16px", borderRadius: 10, cursor: "pointer", border: "none" },
  cvNote: { fontSize: 11, color: "#9ca3af", marginTop: 12, lineHeight: 1.6 },
  cvBadge: { display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#22c55e", fontWeight: 600 },
  locWrapper: { position: "relative" },
  locIcon: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" },
  locInput: { border: "1px solid #e5e7eb", borderRadius: 8, padding: "7px 12px 7px 30px", fontSize: 13, color: "#111827", width: "100%", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  progressTitle: { fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 16, margin: 0, marginBottom: 16 },
  ringWrap: { display: "flex", justifyContent: "center", marginBottom: 20 },
  progressRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  progressLeft: { display: "flex", alignItems: "center", gap: 8 },
  progressPct: { fontSize: 11, color: "#9ca3af" },
};

function ProgressRing({ percent }) {
  const r = 48;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={r} fill="none" stroke="#e5e7eb" strokeWidth="9" />
      <circle cx="60" cy="60" r={r} fill="none" stroke="#22c55e" strokeWidth="9"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 60 60)"
        style={{ transition: "stroke-dasharray 0.5s ease" }} />
      <text x="60" y="65" textAnchor="middle" fontSize="18" fontWeight="700" fill="#111827">{percent}%</text>
    </svg>
  );
}

function calcCompletion(data) {
  const checks = {
    "Personal Info": !!(data.fullName && data.email && data.phone),
    "Upload your photo": !!data.photo,
    "About me": !!data.about,
    "Skills": data.skills.length > 0,
    "Upload document": !!data.cvUploaded,
    "Work experience": data.experiences.length > 0,
    "Location": !!data.location,
    "Questions answered": false,
  };
  const weights = {
    "Personal Info": 10, "Upload your photo": 5, "About me": 25,
    "Skills": 10, "Upload document": 20, "Work experience": 5,
    "Location": 5, "Questions answered": 20,
  };
  let total = 0;
  for (const [k, done] of Object.entries(checks)) if (done) total += weights[k];
  return { percent: total, checks, weights };
}

export default function Profile() {
  const fileRef = useRef(null);
  const cvRef = useRef(null);

  const [data, setData] = useState({
    fullName: "Daniel Adeyemi",
    email: "daniel.adeyemi.dev@gmail.com",
    phone: "+234 812 345 6789",
    photo: null,
    about: "Passionate frontend developer with 3+ years of experience building responsive and user-friendly web applications. Skilled in modern JavaScript frameworks and focused on creating clean, efficient, and accessible interfaces.",
    location: "",
    skills: ["Node.js & Express", "RESTful API Development", "Database Management", "Authentication & Security", "Server Optimization"],
    links: { linkedin: "linkedin.com/in/danieladeyemi", portfolio: "behance.net/danieladeyemi" },
    experiences: [
      { id: 1, title: "Frontend Developer Skills", address: "15 Aminu Kano Crescent, Block C, Abuja, Nigeria", company: "NexaCore Technologies" },
      { id: 2, title: "Backend Developer Skills", address: "8 Okwuebinma Street, Ikeja GRA, Lagos, Nigeria", company: "TechNova Labs" },
    ],
    cvUploaded: false,
  });

  const [editPersonal, setEditPersonal] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [editLinks, setEditLinks] = useState(false);
  const [editExp, setEditExp] = useState(false);
  const [tmpPersonal, setTmpPersonal] = useState({});
  const [tmpAbout, setTmpAbout] = useState("");
  const [tmpLocation, setTmpLocation] = useState("");
  const [tmpSkills, setTmpSkills] = useState([]);
  const [tmpLinks, setTmpLinks] = useState({});
  const [tmpExp, setTmpExp] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const begin = (sec) => {
    if (sec === "personal") { setTmpPersonal({ fullName: data.fullName, email: data.email, phone: data.phone }); setEditPersonal(true); }
    if (sec === "about") { setTmpAbout(data.about); setEditAbout(true); }
    if (sec === "location") { setTmpLocation(data.location); setEditLocation(true); }
    if (sec === "skills") { setTmpSkills([...data.skills]); setEditSkills(true); }
    if (sec === "links") { setTmpLinks({ ...data.links }); setEditLinks(true); }
    if (sec === "exp") { setTmpExp(data.experiences.map(e => ({ ...e }))); setEditExp(true); }
  };
  const cancel = (sec) => {
    if (sec === "personal") setEditPersonal(false);
    if (sec === "about") setEditAbout(false);
    if (sec === "location") setEditLocation(false);
    if (sec === "skills") setEditSkills(false);
    if (sec === "links") setEditLinks(false);
    if (sec === "exp") setEditExp(false);
  };
  const save = (sec) => {
    if (sec === "personal") { setData(d => ({ ...d, ...tmpPersonal })); setEditPersonal(false); }
    if (sec === "about") { setData(d => ({ ...d, about: tmpAbout })); setEditAbout(false); }
    if (sec === "location") { setData(d => ({ ...d, location: tmpLocation })); setEditLocation(false); }
    if (sec === "skills") { setData(d => ({ ...d, skills: tmpSkills })); setEditSkills(false); }
    if (sec === "links") { setData(d => ({ ...d, links: tmpLinks })); setEditLinks(false); }
    if (sec === "exp") { setData(d => ({ ...d, experiences: tmpExp })); setEditExp(false); }
  };

  const SectionButtons = ({ sec, editing }) => editing ? (
    <div style={s.btnRow}>
      <button style={s.saveBtn} onClick={() => save(sec)}><Save size={12} />&nbsp;Save</button>
      <button style={s.cancelBtn} onClick={() => cancel(sec)}><X size={12} />&nbsp;Cancel</button>
    </div>
  ) : (
    <button style={s.editBtn} onClick={() => begin(sec)}><Edit2 size={12} />&nbsp;Edit</button>
  );

  const { percent, checks, weights } = calcCompletion(data);

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <div style={s.navLogo}>
          <div style={s.navIcon}>J</div>
          <span style={s.navTitle}>Jobnest</span>
        </div>
        <div style={s.navActions}>
          <Link to="/"><Home size={18} style={{ color: "#6b7280", cursor: "pointer" }} /></Link>
          <Link to="/profile"><User size={18} style={{ color: "#6b7280", cursor: "pointer" }} /></Link>
          <Link to="/database"><MessageSquare size={18} style={{ color: "#6b7280", cursor: "pointer" }} /></Link>
        </div>
      </nav>

      <div style={s.body}>
        {/* LEFT COLUMN */}
        <div style={s.left}>

          {/* Photo */}
          <div style={s.card}>
            <div style={s.photoWrap}>
              <div style={{ position: "relative" }}>
                <div style={s.photoCircle}>
                  {data.photo
                    ? <img src={data.photo} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <User size={34} color="#d1d5db" />}
                </div>
                <div style={s.cameraBtn} onClick={() => fileRef.current.click()}>
                  <Camera size={12} color="#fff" />
                </div>
              </div>
              <div>
                <button style={s.uploadBtn} onClick={() => fileRef.current.click()}>Upload new photo</button>
                <p style={s.photoNote}>At least 800 × 800px recommended.<br />JPG or PNG is allowed</p>
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
                onChange={e => { const f = e.target.files[0]; if (f) setData(d => ({ ...d, photo: URL.createObjectURL(f) })); }} />
            </div>
          </div>

          {/* Personal Info */}
          <div style={s.card}>
            <div style={s.sectionHeader}>
              <p style={s.sectionTitle}>Personal Info</p>
              <SectionButtons sec="personal" editing={editPersonal} />
            </div>
            {editPersonal ? (
              <div style={s.grid3}>
                {[["Full Name", "fullName", "text"], ["Email", "email", "email"], ["Phone", "phone", "tel"]].map(([lbl, key, type]) => (
                  <div key={key}>
                    <label style={s.label}>{lbl}</label>
                    <input style={s.input} type={type} value={tmpPersonal[key] || ""}
                      onChange={e => setTmpPersonal(p => ({ ...p, [key]: e.target.value }))} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={s.grid3}>
                {[["Full Name", data.fullName], ["Email", data.email], ["Phone", data.phone]].map(([lbl, val]) => (
                  <div key={lbl}>
                    <p style={s.valLabel}>{lbl}</p>
                    <p style={val ? s.valText : s.muted}>{val || "Not set"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location */}
          <div style={s.card}>
            <div style={s.sectionHeader}>
              <p style={s.sectionTitle}>Location</p>
              <SectionButtons sec="location" editing={editLocation} />
            </div>
            {editLocation ? (
              <div style={s.locWrapper}>
                <span style={s.locIcon}><MapPin size={14} /></span>
                <input style={s.locInput} value={tmpLocation}
                  onChange={e => setTmpLocation(e.target.value)} placeholder="Enter your city or address" />
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin size={14} color="#9ca3af" />
                <span style={data.location ? s.valText : s.muted}>{data.location || "No location set"}</span>
              </div>
            )}
          </div>

          {/* About Me */}
          <div style={s.card}>
            <div style={s.sectionHeader}>
              <p style={s.sectionTitle}>About me</p>
              <SectionButtons sec="about" editing={editAbout} />
            </div>
            {editAbout
              ? <textarea style={s.textarea} rows={4} value={tmpAbout}
                  onChange={e => setTmpAbout(e.target.value)} placeholder="Tell employers about yourself..." />
              : <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.7, margin: 0 }}>{data.about || <span style={s.muted}>No bio yet.</span>}</p>
            }
          </div>

          {/* Skills + Links */}
          <div style={s.grid2}>
            {/* Skills */}
            <div style={s.card}>
              <div style={s.sectionHeader}>
                <p style={s.sectionTitle}>Skills</p>
                <SectionButtons sec="skills" editing={editSkills} />
              </div>
              {editSkills ? (
                <div>
                  {tmpSkills.map((sk, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                      <input style={{ ...s.input, flex: 1 }} value={sk}
                        onChange={e => setTmpSkills(a => a.map((x, j) => j === i ? e.target.value : x))} />
                      <button style={s.trashBtn} onClick={() => setTmpSkills(a => a.filter((_, j) => j !== i))}>
                        <Trash2 size={13} color="#d1d5db" />
                      </button>
                    </div>
                  ))}
                  <div style={s.skillInputRow}>
                    <input style={{ ...s.input, flex: 1 }} value={newSkill}
                      onChange={e => setNewSkill(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter" && newSkill.trim()) { setTmpSkills(a => [...a, newSkill.trim()]); setNewSkill(""); } }}
                      placeholder="Add skill…" />
                    <button style={s.addBtn} onClick={() => { if (newSkill.trim()) { setTmpSkills(a => [...a, newSkill.trim()]); setNewSkill(""); } }}>
                      <Plus size={14} color="#fff" />
                    </button>
                  </div>
                </div>
              ) : (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {data.skills.map((sk, i) => (
                    <li key={i} style={s.skillItem}>
                      <span style={s.skillDot} />
                      <span style={s.skillText}>{sk}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Links */}
            <div style={s.card}>
              <div style={s.sectionHeader}>
                <p style={s.sectionTitle}>Links</p>
                <SectionButtons sec="links" editing={editLinks} />
              </div>
              {editLinks ? (
                <div>
                  {[["LinkedIn", "linkedin"], ["Portfolio", "portfolio"]].map(([lbl, key]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <label style={s.label}>{lbl}</label>
                      <input style={s.input} value={tmpLinks[key] || ""}
                        onChange={e => setTmpLinks(l => ({ ...l, [key]: e.target.value }))}
                        placeholder={lbl === "LinkedIn" ? "linkedin.com/in/..." : "yoursite.com"} />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div style={s.linkRow}>
                    <span style={s.linkBadge}>in</span>
                    <div>
                      <p style={s.linkLabel}>LinkedIn</p>
                      <a href={`https://${data.links.linkedin}`} style={s.linkAnchor} target="_blank" rel="noreferrer">
                        {data.links.linkedin || "—"}
                      </a>
                    </div>
                  </div>
                  <div style={s.linkRow}>
                    <Globe size={14} color="#6b7280" style={{ marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <p style={s.linkLabel}>Portfolio</p>
                      <a href={`https://${data.links.portfolio}`} style={{ ...s.linkAnchor, color: "#374151" }} target="_blank" rel="noreferrer">
                        {data.links.portfolio || "—"}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Experience + CV */}
          <div style={s.grid2}>
            {/* Experience */}
            <div style={s.card}>
              <div style={s.sectionHeader}>
                <p style={s.sectionTitle}>Experience</p>
                <SectionButtons sec="exp" editing={editExp} />
              </div>
              {editExp ? (
                <div>
                  {tmpExp.map((exp, i) => (
                    <div key={exp.id} style={s.expEditCard}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>Experience {i + 1}</span>
                        <button style={s.trashBtn} onClick={() => setTmpExp(a => a.filter((_, j) => j !== i))}>
                          <Trash2 size={13} color="#d1d5db" />
                        </button>
                      </div>
                      {[["Job Title", "title"], ["Company", "company"], ["Address", "address"]].map(([lbl, key]) => (
                        <div key={key} style={{ marginBottom: 8 }}>
                          <label style={s.label}>{lbl}</label>
                          <input style={s.input} value={exp[key]}
                            onChange={e => setTmpExp(a => a.map((x, j) => j === i ? { ...x, [key]: e.target.value } : x))}
                            placeholder={lbl} />
                        </div>
                      ))}
                    </div>
                  ))}
                  <button onClick={() => setTmpExp(a => [...a, { id: Date.now(), title: "", address: "", company: "" }])}
                    style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#22c55e", background: "none", border: "none", cursor: "pointer", fontWeight: 600, padding: 0 }}>
                    <Plus size={13} /> Add experience
                  </button>
                </div>
              ) : (
                <div>
                  {data.experiences.map(exp => (
                    <div key={exp.id} style={s.expBlock}>
                      <p style={s.expTitle}>{exp.title}</p>
                      <p style={{ ...s.expSub, marginTop: 3 }}>{exp.address}</p>
                      <p style={{ ...s.expCompany, marginTop: 2 }}>{exp.company}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CV */}
            <div style={{ ...s.card, display: "flex", flexDirection: "column" }}>
              <div style={s.sectionHeader}>
                <p style={s.sectionTitle}>CV / Resume</p>
                {data.cvUploaded && (
                  <div style={s.cvBadge}><CheckCircle size={12} />&nbsp;Uploaded</div>
                )}
              </div>
              <button style={s.cvBtn} onClick={() => cvRef.current.click()}>
                <Upload size={14} />
                {data.cvUploaded ? "Replace CV" : "Upload CV"}
              </button>
              <input ref={cvRef} type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }}
                onChange={e => { if (e.target.files[0]) setData(d => ({ ...d, cvUploaded: true })); }} />
              <p style={s.cvNote}>
                Please note that information here will be available to companies viewing your profile. Avoid sensitive information.
              </p>
            </div>
          </div>

        </div>

        {/* SIDEBAR */}
        <div style={s.sidebar}>
          <div style={s.card}>
            <p style={s.progressTitle}>Complete your profile</p>
            <div style={s.ringWrap}><ProgressRing percent={percent} /></div>
            <div>
              {Object.entries(checks).map(([label, done]) => (
                <div key={label} style={s.progressRow}>
                  <div style={s.progressLeft}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: done ? "#4ade80" : "#e5e7eb", flexShrink: 0, display: "inline-block" }} />
                    <span style={{ fontSize: 12, color: done ? "#374151" : "#9ca3af", fontWeight: done ? 600 : 400 }}>{label}</span>
                  </div>
                  <span style={s.progressPct}>{weights[label]}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}