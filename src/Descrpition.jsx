import { useState, useRef } from "react";
import {
  Edit2, Save, X, Plus, Trash2, Search,
  User, MessageSquare, Home, MapPin, Briefcase,
  DollarSign, ChevronDown, Building2
} from "lucide-react";

// ── Style objects ──────────────────────────────────────────────
const s = {
  page: { minHeight: "100vh", background: "#f3f4f6", fontFamily: "'Segoe UI', sans-serif" },

  // Navbar
  nav: { background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  navLogo: { display: "flex", alignItems: "center", gap: 8 },
  navIcon: { width: 28, height: 28, background: "#111827", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: 13 },
  navTitle: { fontWeight: 700, fontSize: 15, color: "#111827", letterSpacing: "-0.3px" },
  navActions: { display: "flex", gap: 22, color: "#6b7280", alignItems: "center" },
  navBtn: { background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "#6b7280" },

  // Layout
  body: { width: "100%", padding: "32px 48px", display: "flex", gap: 24, alignItems: "flex-start", boxSizing: "border-box" },
  leftSidebar: { width: 240, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 80 },
  main: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 0 },
  rightSidebar: { width: 220, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 80 },

  // Cards
  card: { background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: 22 },
  mainCard: { background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: 32 },

  // Buttons
  applyBtn: { width: "100%", background: "#111827", color: "#fff", border: "none", borderRadius: 10, padding: "11px 0", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 12 },
  viewCompanyBtn: { width: "100%", background: "#fff", color: "#374151", border: "1px solid #d1d5db", borderRadius: 10, padding: "9px 0", fontSize: 13, fontWeight: 500, cursor: "pointer", marginTop: 10 },
  applyBtnBottom: { background: "#111827", color: "#fff", border: "none", borderRadius: 10, padding: "11px 32px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  editBtn: { display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#9ca3af", background: "none", border: "none", cursor: "pointer" },
  saveBtn: { display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#fff", background: "#22c55e", border: "none", cursor: "pointer", padding: "5px 10px", borderRadius: 8 },
  cancelBtn: { display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#9ca3af", background: "none", border: "none", cursor: "pointer" },
  btnRow: { display: "flex", gap: 8 },
  addBtn: { width: 28, height: 28, background: "#22c55e", border: "none", borderRadius: 7, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  trashBtn: { background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", color: "#d1d5db" },

  // Tags
  tagRow: { display: "flex", gap: 8, flexWrap: "wrap", margin: "14px 0 0 0" },
  tag: { background: "#f3f4f6", color: "#374151", fontSize: 12, fontWeight: 500, padding: "4px 12px", borderRadius: 20, border: "1px solid #e5e7eb" },

  // Search
  searchWrap: { position: "relative" },
  searchIcon: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" },
  searchInput: { width: "100%", border: "1px solid #e5e7eb", borderRadius: 10, padding: "8px 12px 8px 34px", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "inherit", color: "#374151", background: "#fafafa" },

  // Misc
  sectionHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 },
  label: { fontSize: 11, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 4 },
  input: { border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 12px", fontSize: 14, color: "#111827", width: "100%", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  textarea: { border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 12px", fontSize: 14, color: "#374151", width: "100%", outline: "none", boxSizing: "border-box", resize: "none", fontFamily: "inherit", lineHeight: 1.65 },
  bodyText: { fontSize: 14, color: "#4b5563", lineHeight: 1.75, margin: 0 },
  bulletList: { paddingLeft: 18, margin: "8px 0 0 0" },
  bulletItem: { fontSize: 14, color: "#4b5563", lineHeight: 1.75, marginBottom: 4 },
  divider: { border: "none", borderTop: "1px solid #f3f4f6", margin: "24px 0" },
  metaRow: { display: "flex", gap: 24, margin: "12px 0 0 0", flexWrap: "wrap" },
  metaItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6b7280" },
  companyName: { fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 },
  companyDesc: { fontSize: 12, color: "#6b7280", marginTop: 4, lineHeight: 1.5 },
};

// ── Helpers ───────────────────────────────────────────────────
function SectionButtons({ editing, onEdit, onSave, onCancel }) {
  return editing ? (
    <div style={s.btnRow}>
      <button style={s.saveBtn} onClick={onSave}><Save size={11} />&nbsp;Save</button>
      <button style={s.cancelBtn} onClick={onCancel}><X size={11} />&nbsp;Cancel</button>
    </div>
  ) : (
    <button style={s.editBtn} onClick={onEdit}><Edit2 size={12} />&nbsp;Edit</button>
  );
}

function EditableList({ items, editing, onChange }) {
  const [newItem, setNewItem] = useState("");
  if (!editing) {
    return (
      <ul style={s.bulletList}>
        {items.map((item, i) => <li key={i} style={s.bulletItem}>{item}</li>)}
      </ul>
    );
  }
  return (
    <div style={{ marginTop: 8 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
          <input style={{ ...s.input, flex: 1 }} value={item}
            onChange={e => onChange(items.map((x, j) => j === i ? e.target.value : x))} />
          <button style={s.trashBtn} onClick={() => onChange(items.filter((_, j) => j !== i))}>
            <Trash2 size={13} color="#d1d5db" />
          </button>
        </div>
      ))}
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <input style={{ ...s.input, flex: 1 }} value={newItem}
          onChange={e => setNewItem(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && newItem.trim()) { onChange([...items, newItem.trim()]); setNewItem(""); } }}
          placeholder="Add item…" />
        <button style={s.addBtn} onClick={() => { if (newItem.trim()) { onChange([...items, newItem.trim()]); setNewItem(""); } }}>
          <Plus size={13} color="#fff" />
        </button>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function JobDetail() {
  const [job, setJob] = useState({
    title: "Software Engineer, Senior",
    type: "Part time",
    department: "Engineering",
    level: "Senior",
    salary: "₦3,279",
    intro: "Join our innovative Lagos-based tech company revolutionizing local job matching through our sleek glassmorphism platform. As a Software Engineer, you'll build scalable features for job seekers and employers, ensuring seamless performance across mobile and desktop while contributing to our urban-themed UI/UX.",
    responsibilities: [
      "Develop responsive front-end components using React.js and Tailwind CSS to match our skyscraper glass aesthetic.",
      "Build secure backend APIs with Node.js/Express for job listings, user dashboards, and application tracking.",
      "Integrate real-time notifications and qualification matching algorithms.",
      "Optimize database queries (PostgreSQL/MongoDB) for fast job searches in high-traffic Lagos market.",
      "Collaborate with designers to implement qualification lists, single job pages, and dashboards.",
    ],
    requirements: [
      "Knowledge of Excel, SQL, or Python",
      "Basic understanding of data visualization",
      "Analytical thinking",
    ],
    qualifications: [
      "Studying Statistics, Computer Science, or related field",
      "Experience with data projects",
      "Attention to detail",
    ],
    additional: [
      "Internship certificate",
      "Networking opportunities",
      "Career growth support",
    ],
    company: {
      name: "Lagos.Africa",
      description: "Lagos.Africa is a modern job board platform connecting Lagos talent with top employers.",
    },
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS", "PostgreSQL"],
  });

  // Edit states per section
  const [editing, setEditing] = useState({});
  const [tmp, setTmp] = useState({});

  const beginEdit = (sec) => {
    setTmp(t => ({ ...t, [sec]: JSON.parse(JSON.stringify(job[sec] ?? "")) }));
    setEditing(e => ({ ...e, [sec]: true }));
  };
  const cancelEdit = (sec) => setEditing(e => ({ ...e, [sec]: false }));
  const saveEdit = (sec) => {
    setJob(j => ({ ...j, [sec]: tmp[sec] }));
    setEditing(e => ({ ...e, [sec]: false }));
  };

  const setTmpVal = (sec, val) => setTmp(t => ({ ...t, [sec]: val }));

  const [newTag, setNewTag] = useState("");
  const [editTags, setEditTags] = useState(false);
  const [tmpTags, setTmpTags] = useState([]);

  const Section = ({ secKey, title, children }) => (
    <div style={{ marginBottom: 28 }}>
      <div style={s.sectionHeader}>
        <h3 style={s.sectionTitle}>{title}</h3>
        <SectionButtons
          editing={!!editing[secKey]}
          onEdit={() => beginEdit(secKey)}
          onSave={() => saveEdit(secKey)}
          onCancel={() => cancelEdit(secKey)}
        />
      </div>
      {children}
    </div>
  );

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <div style={s.navLogo}>
          <div style={s.navIcon}>J</div>
          <span style={s.navTitle}>Jobnest</span>
        </div>
        <div style={s.navActions}>
          <Link to="/"><Home size={18} style={{ color: "#6b7280" }} /></Link>
          <Link to="/profile"><User size={18} style={{ color: "#6b7280" }} /></Link>
          <Link to="/database"><MessageSquare size={18} style={{ color: "#6b7280" }} /></Link>
        </div>
      </nav>

      <div style={s.body}>
        {/* ── LEFT SIDEBAR ── */}
        <div style={s.leftSidebar}>
          {/* Apply Now */}
          <div style={s.card}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: 0 }}>Apply now</p>
            <p style={{ fontSize: 12, color: "#6b7280", marginTop: 6, lineHeight: 1.5 }}>
              Apply for this job and hear back from the hiring manager in 3 days.
            </p>
            <button style={s.applyBtn}>Apply Now</button>
          </div>

          {/* About Company */}
          <div style={s.card}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: 0, marginBottom: 12 }}>About the company</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 38, height: 38, background: "#f3f4f6", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Building2 size={18} color="#9ca3af" />
              </div>
              <div>
                {editing.company ? (
                  <input style={{ ...s.input, fontSize: 13 }} value={tmp.company?.name ?? job.company.name}
                    onChange={e => setTmpVal("company", { ...( tmp.company ?? job.company), name: e.target.value })} />
                ) : (
                  <p style={s.companyName}>{job.company.name}</p>
                )}
              </div>
            </div>
            {editing.company ? (
              <textarea style={{ ...s.textarea, fontSize: 12 }} rows={3}
                value={tmp.company?.description ?? job.company.description}
                onChange={e => setTmpVal("company", { ...(tmp.company ?? job.company), description: e.target.value })} />
            ) : (
              <p style={s.companyDesc}>{job.company.description}</p>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
              <SectionButtons editing={!!editing.company}
                onEdit={() => beginEdit("company")}
                onSave={() => saveEdit("company")}
                onCancel={() => cancelEdit("company")} />
            </div>
            <button style={s.viewCompanyBtn}>View company</button>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={s.main}>
          <div style={s.mainCard}>
            {/* Job Title */}
            <div style={{ marginBottom: 4 }}>
              <div style={s.sectionHeader}>
                {editing.title ? (
                  <input style={{ ...s.input, fontSize: 22, fontWeight: 700, border: "1px solid #e5e7eb", flex: 1 }}
                    value={tmp.title ?? job.title}
                    onChange={e => setTmpVal("title", e.target.value)} />
                ) : (
                  <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: 0 }}>{job.title}</h1>
                )}
                <SectionButtons editing={!!editing.title}
                  onEdit={() => beginEdit("title")}
                  onSave={() => saveEdit("title")}
                  onCancel={() => cancelEdit("title")} />
              </div>

              {/* Meta tags */}
              <div style={s.tagRow}>
                {editing.meta ? (
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", width: "100%" }}>
                    {[["type", "Job Type"], ["department", "Department"], ["level", "Level"], ["salary", "Salary"]].map(([key, lbl]) => (
                      <div key={key} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <label style={s.label}>{lbl}</label>
                        <input style={{ ...s.input, width: 130 }} value={tmp.meta?.[key] ?? job[key]}
                          onChange={e => setTmpVal("meta", { ...(tmp.meta ?? { type: job.type, department: job.department, level: job.level, salary: job.salary }), [key]: e.target.value })} />
                      </div>
                    ))}
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                      <SectionButtons editing={true}
                        onEdit={() => {}}
                        onSave={() => {
                          const m = tmp.meta ?? {};
                          setJob(j => ({ ...j, ...m }));
                          cancelEdit("meta");
                        }}
                        onCancel={() => cancelEdit("meta")} />
                    </div>
                  </div>
                ) : (
                  <>
                    {[job.type, job.department, job.level, job.salary].map((val, i) => (
                      <span key={i} style={s.tag}>{val}</span>
                    ))}
                    <button style={{ ...s.editBtn, marginLeft: 4 }} onClick={() => beginEdit("meta")}>
                      <Edit2 size={11} />&nbsp;Edit
                    </button>
                  </>
                )}
              </div>
            </div>

            <hr style={s.divider} />

            {/* Job Description */}
            <Section secKey="intro" title="Job Description">
              {editing.intro ? (
                <textarea style={s.textarea} rows={5}
                  value={tmp.intro ?? job.intro}
                  onChange={e => setTmpVal("intro", e.target.value)} />
              ) : (
                <p style={s.bodyText}>{job.intro}</p>
              )}
            </Section>

            {/* Responsibilities */}
            <Section secKey="responsibilities" title="Responsibilities and Duties:">
              <EditableList
                items={editing.responsibilities ? (tmp.responsibilities ?? job.responsibilities) : job.responsibilities}
                editing={!!editing.responsibilities}
                onChange={v => setTmpVal("responsibilities", v)}
              />
            </Section>

            {/* Requirements */}
            <Section secKey="requirements" title="Requirements:">
              <EditableList
                items={editing.requirements ? (tmp.requirements ?? job.requirements) : job.requirements}
                editing={!!editing.requirements}
                onChange={v => setTmpVal("requirements", v)}
              />
            </Section>

            {/* Qualifications */}
            <Section secKey="qualifications" title="Qualifications:">
              <EditableList
                items={editing.qualifications ? (tmp.qualifications ?? job.qualifications) : job.qualifications}
                editing={!!editing.qualifications}
                onChange={v => setTmpVal("qualifications", v)}
              />
            </Section>

            {/* Additional */}
            <Section secKey="additional" title="Additional:">
              <EditableList
                items={editing.additional ? (tmp.additional ?? job.additional) : job.additional}
                editing={!!editing.additional}
                onChange={v => setTmpVal("additional", v)}
              />
            </Section>

            {/* Apply button at bottom */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
              <button style={s.applyBtnBottom}>Apply Now</button>
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div style={s.rightSidebar}>
          {/* Search */}
          <div style={s.card}>
            <div style={s.searchWrap}>
              <span style={s.searchIcon}><Search size={14} /></span>
              <input style={s.searchInput} placeholder="Search jobs…" />
            </div>
          </div>

          {/* Tags */}
          <div style={s.card}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", margin: 0 }}>Tags</p>
              {!editTags ? (
                <button style={s.editBtn} onClick={() => { setTmpTags([...job.tags]); setEditTags(true); }}>
                  <Edit2 size={11} />&nbsp;Edit
                </button>
              ) : (
                <div style={s.btnRow}>
                  <button style={s.saveBtn} onClick={() => { setJob(j => ({ ...j, tags: tmpTags })); setEditTags(false); }}>
                    <Save size={11} />&nbsp;Save
                  </button>
                  <button style={s.cancelBtn} onClick={() => setEditTags(false)}><X size={11} /></button>
                </div>
              )}
            </div>
            {editTags ? (
              <div>
                {tmpTags.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "center" }}>
                    <input style={{ ...s.input, flex: 1, fontSize: 12, padding: "5px 8px" }} value={t}
                      onChange={e => setTmpTags(a => a.map((x, j) => j === i ? e.target.value : x))} />
                    <button style={s.trashBtn} onClick={() => setTmpTags(a => a.filter((_, j) => j !== i))}>
                      <Trash2 size={12} color="#d1d5db" />
                    </button>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                  <input style={{ ...s.input, flex: 1, fontSize: 12, padding: "5px 8px" }} value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && newTag.trim()) { setTmpTags(a => [...a, newTag.trim()]); setNewTag(""); } }}
                    placeholder="Add tag…" />
                  <button style={{ ...s.addBtn, width: 26, height: 26 }}
                    onClick={() => { if (newTag.trim()) { setTmpTags(a => [...a, newTag.trim()]); setNewTag(""); } }}>
                    <Plus size={12} color="#fff" />
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {job.tags.map((t, i) => (
                  <span key={i} style={{ ...s.tag, fontSize: 11 }}>{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}