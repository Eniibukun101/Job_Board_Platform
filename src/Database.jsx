import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search, Home, User, MessageSquare,
  Plus, Trash2, Edit2, Save, X, Building2, Briefcase, Users
} from "lucide-react";

const s = {
  page: { minHeight: "100vh", background: "#f3f4f6", fontFamily: "'Segoe UI', sans-serif" },
  nav: { background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  navLogo: { display: "flex", alignItems: "center", gap: 8 },
  navIcon: { width: 28, height: 28, background: "#111827", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: 13 },
  navTitle: { fontWeight: 700, fontSize: 15, color: "#111827" },
  navActions: { display: "flex", gap: 22, alignItems: "center" },
  navBtn: { background: "none", border: "none", cursor: "pointer", color: "#6b7280", display: "flex", alignItems: "center" },

  body: { width: "100%", padding: "32px 48px", boxSizing: "border-box" },

  // Search bar
  searchCard: { background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", padding: "10px 16px", display: "flex", alignItems: "center", gap: 16, marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" },
  searchTab: { fontSize: 13, fontWeight: 600, color: "#374151", paddingRight: 16, borderRight: "1px solid #e5e7eb", whiteSpace: "nowrap" },
  searchWrap: { display: "flex", alignItems: "center", gap: 8, flex: 1 },
  searchInput: { border: "none", outline: "none", fontSize: 14, color: "#374151", background: "transparent", width: "100%", fontFamily: "inherit" },

  // Main card
  mainCard: { background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", padding: 28 },

  // Tabs
  tabRow: { display: "flex", background: "#f3f4f6", borderRadius: 12, padding: 4, marginBottom: 28, width: "fit-content" },
  tab: (active) => ({
    padding: "10px 40px", borderRadius: 10, fontSize: 14, fontWeight: active ? 600 : 500,
    color: active ? "#111827" : "#9ca3af", background: active ? "#fff" : "transparent",
    border: "none", cursor: "pointer", boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
    transition: "all 0.15s ease",
  }),

  // Entry rows
  entryRow: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f9fafb", borderRadius: 12, padding: "14px 18px", marginBottom: 10, border: "1px solid #f3f4f6" },
  entryLeft: { display: "flex", alignItems: "center", gap: 14 },
  iconBox: (color) => ({ width: 44, height: 44, borderRadius: 10, background: color + "15", border: `1.5px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }),
  entryName: { fontSize: 14, fontWeight: 600, color: "#111827", margin: 0 },
  entrySub: { fontSize: 12, color: "#9ca3af", margin: 0, marginTop: 2 },
  entryActions: { display: "flex", gap: 8 },
  editBtn: { background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex", padding: 4, borderRadius: 6 },
  deleteBtn: { background: "none", border: "none", cursor: "pointer", color: "#fca5a5", display: "flex", padding: 4, borderRadius: 6 },
  saveBtn: { display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#fff", background: "#22c55e", border: "none", cursor: "pointer", padding: "5px 10px", borderRadius: 8 },
  cancelBtn: { display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#9ca3af", background: "none", border: "none", cursor: "pointer" },

  // Inputs
  input: { border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 10px", fontSize: 13, color: "#111827", outline: "none", fontFamily: "inherit", background: "#fff" },

  // Add button
  addBtn: { display: "flex", alignItems: "center", gap: 8, background: "#111827", color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 16 },
};

const ICON_COLORS = ["#6366f1", "#f59e0b", "#22c55e", "#3b82f6", "#ec4899", "#14b8a6"];

function getColor(index) { return ICON_COLORS[index % ICON_COLORS.length]; }

function EntryIcon({ name, index }) {
  const color = getColor(index);
  const letter = name?.[0]?.toUpperCase() || "?";
  return (
    <div style={s.iconBox(color)}>
      <span style={{ fontSize: 16, fontWeight: 700, color }}>{letter}</span>
    </div>
  );
}

function EntryItem({ item, index, onSave, onDelete, fields }) {
  const [editing, setEditing] = useState(false);
  const [tmp, setTmp] = useState({});

  const startEdit = () => { setTmp({ ...item }); setEditing(true); };
  const cancel = () => setEditing(false);
  const save = () => { onSave(tmp); setEditing(false); };

  return (
    <div style={s.entryRow}>
      <div style={s.entryLeft}>
        <EntryIcon name={editing ? tmp[fields[0].key] : item[fields[0].key]} index={index} />
        {editing ? (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {fields.map(f => (
              <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase" }}>{f.label}</span>
                <input style={s.input} value={tmp[f.key] || ""} onChange={e => setTmp(t => ({ ...t, [f.key]: e.target.value }))} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p style={s.entryName}>{item[fields[0].key]}</p>
            <p style={s.entrySub}>{item[fields[1]?.key]}</p>
          </div>
        )}
      </div>
      <div style={s.entryActions}>
        {editing ? (
          <>
            <button style={s.saveBtn} onClick={save}><Save size={12} />&nbsp;Save</button>
            <button style={s.cancelBtn} onClick={cancel}><X size={12} /></button>
          </>
        ) : (
          <>
            <button style={s.editBtn} onClick={startEdit}><Edit2 size={15} /></button>
            <button style={s.deleteBtn} onClick={onDelete}><Trash2 size={15} /></button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Tab content configs ──────────────────────────────────────────
const tabConfig = {
  jobs: {
    label: "Job listed",
    fields: [{ key: "company", label: "Company" }, { key: "role", label: "Role" }],
    defaultNew: { company: "New Company", role: "New Role" },
    initial: [
      { id: 1, company: "CloudNest Systems", role: "front end developer" },
      { id: 2, company: "SterlingPath Ltd.", role: "software engineer" },
      { id: 3, company: "CodeSphere Inc.", role: "sales associate" },
      { id: 4, company: "CloudNest Systems", role: "IT support" },
    ],
  },
  users: {
    label: "Users list",
    fields: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }],
    defaultNew: { name: "New User", email: "user@email.com" },
    initial: [
      { id: 1, name: "Daniel Adeyemi", email: "daniel.adeyemi.dev@gmail.com" },
      { id: 2, name: "Grace Eniibukun", email: "grace@jobnest.com" },
      { id: 3, name: "Amara Okafor", email: "amara.okafor@gmail.com" },
    ],
  },
  companies: {
    label: "Company details",
    fields: [{ key: "name", label: "Company Name" }, { key: "industry", label: "Industry" }],
    defaultNew: { name: "New Company", industry: "Technology" },
    initial: [
      { id: 1, name: "CloudNest Systems", industry: "Cloud Infrastructure" },
      { id: 2, name: "SterlingPath Ltd.", industry: "Engineering & Consulting" },
      { id: 3, name: "CodeSphere Inc.", industry: "Software Development" },
    ],
  },
};

function TabPanel({ config, search }) {
  const [items, setItems] = useState(config.initial);

  const filtered = items.filter(item =>
    Object.values(item).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  const update = (id, newData) => setItems(a => a.map(x => x.id === id ? { ...x, ...newData } : x));
  const remove = (id) => setItems(a => a.filter(x => x.id !== id));
  const add = () => setItems(a => [...a, { id: Date.now(), ...config.defaultNew }]);

  return (
    <div>
      {filtered.map((item, i) => (
        <EntryItem
          key={item.id}
          item={item}
          index={i}
          fields={config.fields}
          onSave={(data) => update(item.id, data)}
          onDelete={() => remove(item.id)}
        />
      ))}
      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 14, padding: "32px 0" }}>No results found.</p>
      )}
      <button style={s.addBtn} onClick={add}>
        <Plus size={14} /> Add entry
      </button>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────
export default function Database() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [search, setSearch] = useState("");

  const tabs = [
    { key: "jobs", label: "Job listed" },
    { key: "users", label: "Users list" },
    { key: "companies", label: "company details" },
  ];

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
        {/* Search bar */}
        <div style={s.searchCard}>
          <span style={s.searchTab}>Database</span>
          <div style={s.searchWrap}>
            <Search size={15} color="#9ca3af" />
            <input
              style={s.searchInput}
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Main card */}
        <div style={s.mainCard}>
          {/* Tabs */}
          <div style={s.tabRow}>
            {tabs.map(t => (
              <button key={t.key} style={s.tab(activeTab === t.key)} onClick={() => setActiveTab(t.key)}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <TabPanel
            key={activeTab}
            config={tabConfig[activeTab]}
            search={search}
          />
        </div>
      </div>
    </div>
  );
}