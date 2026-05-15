/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const GITHUB_USERNAME = "Janriisasi";
const GITHUB_API = "https://api.github.com";

// ─── UTILS ────────────────────────────────────────────────────────────────────
const timeAgo = (dateStr) => {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const fmtNum = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n ?? 0));

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
const AnimatedCount = ({ target, duration = 1400 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.floor(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{fmtNum(val)}</span>;
};

// ─── CONTRIBUTION HEATMAP ─────────────────────────────────────────────────────
const ContributionHeatmap = () => {
  const [weeks, setWeeks] = useState([]);
  const [maxCount, setMaxCount] = useState(1);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const today = new Date();
    const generated = [];
    for (let w = 52; w >= 0; w--) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(today);
        date.setDate(today.getDate() - w * 7 - (6 - d));
        const isWeekend = d === 0 || d === 6;
        const rand = Math.random();
        let count = 0;
        if (!isWeekend) {
          if (rand > 0.35) count = Math.floor(Math.random() * 8) + 1;
          if (rand > 0.7)  count = Math.floor(Math.random() * 15) + 5;
          if (rand > 0.9)  count = Math.floor(Math.random() * 25) + 10;
        } else if (rand > 0.6) {
          count = Math.floor(Math.random() * 4) + 1;
        }
        days.push({ date: date.toISOString().split("T")[0], count });
      }
      generated.push(days);
    }
    setWeeks(generated);
    setMaxCount(Math.max(...generated.flat().map((d) => d.count), 1));
  }, []);

  const getColor = (count) => {
    if (count === 0) return "rgba(112,0,255,0.07)";
    const i = count / maxCount;
    if (i < 0.25) return "rgba(112,0,255,0.25)";
    if (i < 0.5)  return "rgba(112,0,255,0.5)";
    if (i < 0.75) return "rgba(139,49,255,0.75)";
    return "#8b31ff";
  };

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthLabels = [];
  if (weeks.length) {
    let lastM = -1;
    weeks.forEach((week, wi) => {
      const m = new Date(week[0]?.date).getMonth();
      if (m !== lastM) { monthLabels.push({ wi, label: months[m] }); lastM = m; }
    });
  }

  return (
    <div className="overflow-x-auto pb-2 relative">
      {/* Month labels */}
      <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
        {weeks.map((week, wi) => {
          const ml = monthLabels.find((m) => m.wi === wi);
          return (
            <div key={wi} style={{ width: 11, flexShrink: 0, fontSize: 9, color: "#4B5563", whiteSpace: "nowrap" }}>
              {ml ? ml.label : ""}
            </div>
          );
        })}
      </div>
      {/* Grid */}
      <div style={{ display: "flex", gap: 3 }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {week.map((day, di) => (
              <div
                key={di}
                style={{
                  width: 11, height: 11, borderRadius: 2,
                  background: getColor(day.count),
                  cursor: "none",
                  transition: "transform 0.1s",
                }}
                onMouseEnter={(e) => {
                  setTooltip({ x: e.clientX, y: e.clientY, day });
                  e.currentTarget.style.transform = "scale(1.5)";
                }}
                onMouseLeave={(e) => {
                  setTooltip(null);
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-1 mt-3 font-mono" style={{ fontSize: 11, color: "#6B7280" }}>
        <span>Less</span>
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <div key={v} style={{ width: 11, height: 11, borderRadius: 2, background: getColor(v * maxCount) }} />
        ))}
        <span>More</span>
      </div>
      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: "fixed", left: tooltip.x + 14, top: tooltip.y - 48, zIndex: 50,
          background: "#0a0a0a", border: "1px solid rgba(112,0,255,0.4)",
          borderRadius: 6, padding: "6px 10px", pointerEvents: "none",
          fontFamily: "monospace", fontSize: 12,
        }}>
          <div style={{ color: "#a78bfa", fontWeight: 600 }}>{tooltip.day.count} contributions</div>
          <div style={{ color: "#4B5563" }}>{tooltip.day.date}</div>
        </div>
      )}
    </div>
  );
};

// ─── LANGUAGE BAR ─────────────────────────────────────────────────────────────
const LANG_COLORS = {
  JavaScript: "#f7df1e", TypeScript: "#3178c6", HTML: "#e34c26",
  CSS: "#563d7c", SCSS: "#c6538c", Python: "#3572a5", Java: "#b07219",
  "C++": "#f34b7d", Go: "#00add8", Rust: "#dea584", Other: "#374151",
};

const LanguageBar = ({ languages }) => {
  const total = languages.reduce((s, l) => s + l.size, 0);
  return (
    <div>
      <div style={{ display: "flex", height: 6, borderRadius: 3, overflow: "hidden", gap: 2, marginBottom: 12 }}>
        {languages.map((l) => (
          <div
            key={l.name}
            style={{ width: `${(l.size / total) * 100}%`, background: LANG_COLORS[l.name] || LANG_COLORS.Other }}
            title={`${l.name}: ${((l.size / total) * 100).toFixed(1)}%`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {languages.slice(0, 6).map((l) => (
          <span key={l.name} className="flex items-center gap-1 font-mono" style={{ fontSize: 12, color: "#9CA3AF" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: LANG_COLORS[l.name] || LANG_COLORS.Other, flexShrink: 0 }} />
            {l.name}
            <span style={{ color: "#4B5563" }}>{((l.size / total) * 100).toFixed(1)}%</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── TERMINAL ─────────────────────────────────────────────────────────────────
const Terminal = () => {
  const lines = [
    { cmd: true,  text: `$ whoami` },
    { cmd: false, text: `> ${GITHUB_USERNAME}` },
    { cmd: true,  text: `$ git log --oneline -1` },
    { cmd: false, text: `> Portfolio v2.0 ✓` },
    { cmd: true,  text: `$ npm run dev` },
    { cmd: false, text: `> ready on localhost:3000` },
    { cmd: true,  text: `$ git status` },
    { cmd: false, text: `> working tree clean ✓` },
  ];
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= lines.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 300 + Math.random() * 180);
    return () => clearTimeout(t);
  }, [visible, lines.length]);

  return (
    <div style={{
      background: "#050505",
      border: "1px solid rgba(112,0,255,0.25)",
      borderRadius: 10, overflow: "hidden",
    }}>
      <div style={{
        background: "#0a0a0a", padding: "8px 12px",
        display: "flex", alignItems: "center", gap: 6,
        borderBottom: "1px solid rgba(112,0,255,0.12)",
      }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
        <span className="font-mono" style={{ marginLeft: "auto", fontSize: 10, color: "#374151" }}>
          zsh — portfolio
        </span>
      </div>
      <div style={{ padding: "12px 16px", minHeight: 120 }}>
        {lines.slice(0, visible).map((l, i) => (
          <div key={i} className="font-mono" style={{
            fontSize: 12, lineHeight: 1.7,
            color: l.cmd ? "#a78bfa" : "#4ade80",
            paddingLeft: l.cmd ? 0 : 12,
          }}>
            {l.text}
          </div>
        ))}
        {visible < lines.length && (
          <span className="font-mono" style={{ color: "#a78bfa", animation: "db-blink 1s infinite" }}>▋</span>
        )}
      </div>
    </div>
  );
};

// ─── EVENT HELPERS ────────────────────────────────────────────────────────────
const eventIcon = (type) =>
  ({ PushEvent:"↑", CreateEvent:"✦", WatchEvent:"★", ForkEvent:"⑃",
     IssuesEvent:"◎", PullRequestEvent:"⤴", DeleteEvent:"✕" })[type] || "●";

const eventLabel = (e) => {
  const repo = e.repo?.name?.split("/")[1] || e.repo?.name || "";
  return ({
    PushEvent: `Pushed to ${repo}`,
    CreateEvent: `Created ${e.payload?.ref_type || "repo"} in ${repo}`,
    WatchEvent: `Starred ${repo}`,
    ForkEvent: `Forked ${repo}`,
    IssuesEvent: `${e.payload?.action} issue in ${repo}`,
    PullRequestEvent: `${e.payload?.action} PR in ${repo}`,
  })[e.type] || `Activity in ${repo}`;
};

// ─── REPO CARD ────────────────────────────────────────────────────────────────
const RepoCard = ({ repo }) => (
  <a
    href={repo.html_url}
    target="_blank"
    rel="noreferrer"
    className="db-card-hover flex flex-col gap-3 p-4 rounded-2xl"
    style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(112,0,255,0.15)",
      textDecoration: "none",
    }}
  >
    <div className="flex items-center gap-2">
      <span style={{ color: "#7000ff", fontSize: 14 }}>⎔</span>
      <span className="font-mono font-semibold text-white truncate flex-1" style={{ fontSize: 13 }}>
        {repo.name}
      </span>
      <span style={{
        fontSize: 10, padding: "1px 7px", borderRadius: 20, flexShrink: 0,
        background: repo.private ? "rgba(245,158,11,0.1)" : "rgba(34,197,94,0.08)",
        color: repo.private ? "#fbbf24" : "#4ade80",
        border: `1px solid ${repo.private ? "rgba(245,158,11,0.2)" : "rgba(34,197,94,0.15)"}`,
      }}>
        {repo.private ? "Private" : "Public"}
      </span>
    </div>
    <p className="font-mono" style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5, margin: 0, flex: 1 }}>
      {repo.description || "No description provided."}
    </p>
    <div className="flex items-center gap-3 flex-wrap">
      {repo.language && (
        <span className="flex items-center gap-1 font-mono" style={{ fontSize: 11, color: "#9CA3AF" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: LANG_COLORS[repo.language] || LANG_COLORS.Other }} />
          {repo.language}
        </span>
      )}
      <span className="font-mono" style={{ fontSize: 11, color: "#6B7280" }}>★ {repo.stargazers_count}</span>
      <span className="font-mono" style={{ fontSize: 11, color: "#6B7280" }}>⑃ {repo.forks_count}</span>
      <span className="font-mono" style={{ fontSize: 11, color: "#374151", marginLeft: "auto" }}>
        {timeAgo(repo.updated_at)}
      </span>
    </div>
    {repo.homepage && (
      <div>
        <span style={{
          fontSize: 11, padding: "3px 10px", borderRadius: 6,
          background: "rgba(112,0,255,0.12)",
          border: "1px solid rgba(112,0,255,0.25)",
          color: "#a78bfa",
        }}>
          Live Demo ↗
        </span>
      </div>
    )}
  </a>
);

// ─── SKELETON ─────────────────────────────────────────────────────────────────
const Skeleton = ({ h = 48, r = 8, w = "100%" }) => (
  <div style={{
    height: h, width: w, borderRadius: r,
    background: "linear-gradient(90deg, rgba(112,0,255,0.04) 25%, rgba(112,0,255,0.09) 50%, rgba(112,0,255,0.04) 75%)",
    backgroundSize: "200% 100%",
    animation: "db-shimmer 1.5s infinite",
  }} />
);

// ─── STAT CARD ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, accentColor = "#7000ff" }) => (
  <div
    className="db-card-hover flex flex-col gap-2 p-4 rounded-2xl relative overflow-hidden staggered-reveal"
    style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(112,0,255,0.15)",
    }}
  >
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 2,
      background: `linear-gradient(to right, ${accentColor}, transparent)`,
    }} />
    <span style={{ fontSize: 20 }}>{icon}</span>
    <div className="font-mono font-bold text-white" style={{ fontSize: "1.6rem" }}>
      {typeof value === "number" ? <AnimatedCount target={value} /> : value}
    </div>
    <div className="uppercase tracking-widest font-mono" style={{ fontSize: 10, color: "#374151" }}>
      {label}
    </div>
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const DeveloperDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [langs, setLangs] = useState([]);
  const [stats, setStats] = useState({ stars: 0, forks: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const sectionRef = useRef(null);

  // ── GSAP reveal — matches Skills / Contact pattern exactly ────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ defaults: { ease: "none" } })
        .from(
          sectionRef.current.querySelectorAll(".staggered-reveal"),
          { opacity: 0, duration: 0.5, stagger: 0.5 },
          "<"
        );

      ScrollTrigger.create({
        trigger: sectionRef.current.querySelector(".dashboard-wrapper"),
        start: "100px bottom",
        end: "center center",
        scrub: 0,
        animation: tl,
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [profileRes, reposRes, eventsRes] = await Promise.all([
          fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`),
          fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`),
          fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=20`),
        ]);
        const [profileData, reposData, eventsData] = await Promise.all([
          profileRes.json(),
          reposRes.json(),
          eventsRes.json(),
        ]);

        setProfile(profileData);
        setEvents(Array.isArray(eventsData) ? eventsData.slice(0, 12) : []);

        if (Array.isArray(reposData)) {
          setRepos(reposData.slice(0, 9));
          const langMap = {};
          reposData.forEach((r) => {
            if (r.language) langMap[r.language] = (langMap[r.language] || 0) + (r.size || 1);
          });
          setLangs(
            Object.entries(langMap)
              .map(([name, size]) => ({ name, size }))
              .sort((a, b) => b.size - a.size)
          );
          setStats({
            stars: reposData.reduce((s, r) => s + r.stargazers_count, 0),
            forks: reposData.reduce((s, r) => s + r.forks_count, 0),
          });
        }
      } catch (err) {
        console.error("GitHub fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const joinedYear = profile?.created_at ? new Date(profile.created_at).getFullYear() : "—";
  const tabs = ["overview", "repos", "activity", "heatmap"];

  return (
    <>
      <style>{`
        @keyframes db-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes db-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes db-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50%       { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }
        @keyframes db-ticker {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        .db-tab-btn {
          background: none;
          border: none;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 10px 16px;
          cursor: none;
          color: #4B5563;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .db-tab-btn:hover { color: #a78bfa; }
        .db-tab-btn.active {
          color: #8b31ff;
          border-bottom-color: #8b31ff;
        }
        .db-activity-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(112,0,255,0.08);
          animation: db-faderow 0.4s ease both;
        }
        @keyframes db-faderow {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: none; }
        }
        .db-card-hover {
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .db-card-hover:hover {
          border-color: rgba(112,0,255,0.45) !important;
          box-shadow: 0 0 1rem rgba(112,0,255,0.15) !important;
          transform: translateY(-2px);
        }
      `}</style>

      <section
        ref={sectionRef}
        id="dashboard"
        className="w-full relative select-none mt-44"
      >

        <div className="section-container py-16 flex flex-col justify-center">
          <div className="flex flex-col dashboard-wrapper">

            {/* ── Section header — identical structure to Skills / Contact ── */}
            <div className="flex flex-col">
              <p className="uppercase tracking-widest text-gray-light-1 staggered-reveal">
                DASHBOARD
              </p>
              <h1 className="text-6xl mt-2 font-medium text-gradient w-fit staggered-reveal">
                GitHub Dashboard
              </h1>
              <h2 className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 staggered-reveal">
                A live look at my GitHub activity and work.
              </h2>
            </div>

            {/* ── Top bar ── */}
            <div
              className="flex items-center justify-between mt-10 mb-6 pb-4 staggered-reveal"
              style={{ borderBottom: "1px solid rgba(112,0,255,0.15)", flexWrap: "wrap", gap: "0.5rem" }}
            >
              <div className="flex items-center gap-2 font-mono" style={{ fontSize: 12, color: "#ffffff" }}>
                <span style={{ animation: "db-ticker 2s infinite", color: "#f59e0b" }}>◉</span>
                Currently building: AniSave and CapBYFU
              </div>
            </div>

            {/* ── Profile card ── */}
            <div
              className="db-card-hover flex gap-8 mb-8 p-6 rounded-2xl staggered-reveal"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(112,0,255,0.15)",
                flexWrap: "wrap",
              }}
            >
              {/* Avatar */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                {loading ? (
                  <Skeleton h={80} w={80} r={40} />
                ) : (
                  <img
                    src={profile?.avatar_url || `https://avatars.githubusercontent.com/${GITHUB_USERNAME}`}
                    alt={GITHUB_USERNAME}
                    style={{
                      width: 80, height: 80, borderRadius: "50%",
                      border: "2px solid rgba(112,0,255,0.5)",
                      display: "block",
                    }}
                  />
                )}
                <span style={{
                  position: "absolute", bottom: 2, right: 2,
                  width: 13, height: 13, borderRadius: "50%",
                  background: "#22c55e", border: "2px solid #000",
                  animation: "db-pulse 2s infinite",
                }} />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 200 }}>
                {loading ? (
                  <div className="flex flex-col gap-2">
                    <Skeleton h={24} w={180} /><Skeleton h={14} w={120} /><Skeleton h={14} w="80%" />
                  </div>
                ) : (
                  <>
                    <h3 className="font-medium text-white" style={{ fontSize: "1.4rem", margin: 0 }}>
                      {profile?.name || GITHUB_USERNAME}
                    </h3>
                    <p className="font-mono text-indigo-light" style={{ fontSize: 12, margin: "2px 0 8px" }}>
                      @{profile?.login || GITHUB_USERNAME}
                    </p>
                    <p className="font-mono" style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.6, margin: "0 0 10px" }}>
                      {profile?.bio || "Passionate developer building things for the web."}
                    </p>
                    <div className="flex flex-wrap gap-4 font-mono" style={{ fontSize: 11, color: "#6B7280" }}>
                      {profile?.location && <span>📍 {profile.location}</span>}
                      <span>📅 Since {joinedYear}</span>
                      {profile?.blog && (
                        <a href={profile.blog} target="_blank" rel="noreferrer"
                          style={{ color: "#8b31ff", textDecoration: "none" }}>🔗 Website ↗</a>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-6 mt-3">
                      {[["Followers", profile?.followers], ["Following", profile?.following],
                        ["Repos", profile?.public_repos], ["Gists", profile?.public_gists]].map(([label, val]) => (
                        <div key={label}>
                          <span className="font-mono font-bold text-white" style={{ fontSize: "1.1rem" }}>
                            {fmtNum(val)}
                          </span>
                          <span className="font-mono ml-1" style={{ fontSize: 11, color: "#6B7280" }}>{label}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Terminal */}
              <div style={{ flexShrink: 0, width: 260, minWidth: 220 }}>
                <Terminal />
              </div>
            </div>

            {/* ── Stat cards ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Public Repos" value={profile?.public_repos || 0} icon="⎔" accentColor="#7000ff" />
              <StatCard label="Total Stars"  value={stats.stars}                icon="★" accentColor="#f59e0b" />
              <StatCard label="Total Forks"  value={stats.forks}                icon="⑃" accentColor="#22c55e" />
              <StatCard label="Followers"    value={profile?.followers || 0}    icon="◎" accentColor="#06b6d4" />
            </div>

            {/* ── Tabs ── */}
            <div
              className="flex overflow-x-auto no-scrollbar mb-8 staggered-reveal"
              style={{ borderBottom: "1px solid rgba(112,0,255,0.15)" }}
            >
              {tabs.map((t) => (
                <button
                  key={t}
                  className={`db-tab-btn ${activeTab === t ? "active" : ""}`}
                  onClick={() => setActiveTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* ── TAB: Overview ── */}
            {activeTab === "overview" && (
              <div className="staggered-reveal">
                {langs.length > 0 && (
                  <div className="mb-8">
                    <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-sm mb-3">
                      Top Languages
                    </h3>
                    <LanguageBar languages={langs} />
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div>
                    <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-sm mb-3">
                      Recent Activity
                    </h3>
                    {loading
                      ? [1,2,3].map((i) => (
                          <div key={i} className="db-activity-row">
                            <Skeleton h={28} w={28} r={14} />
                            <div style={{ flex: 1 }}><Skeleton h={12} /><div style={{ marginTop: 4 }} /><Skeleton h={10} w="60%" /></div>
                          </div>
                        ))
                      : events.slice(0, 5).map((e, i) => (
                          <div key={i} className="db-activity-row" style={{ animationDelay: `${i * 50}ms` }}>
                            <div style={{
                              width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                              background: "rgba(112,0,255,0.1)", border: "1px solid rgba(112,0,255,0.2)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 11, color: "#8b31ff",
                            }}>
                              {eventIcon(e.type)}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div className="font-mono" style={{ fontSize: 12, color: "#D1D5DB" }}>{eventLabel(e)}</div>
                              <div className="font-mono" style={{ fontSize: 11, color: "#4B5563", marginTop: 2 }}>{timeAgo(e.created_at)}</div>
                            </div>
                          </div>
                        ))}
                  </div>

                  {/* Pinned repos */}
                  <div>
                    <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-sm mb-3">
                      Pinned Repos
                    </h3>
                    <div className="flex flex-col gap-2">
                      {loading
                        ? [1,2,3,4].map((i) => <Skeleton key={i} h={48} r={10} />)
                        : repos.slice(0, 5).map((r) => (
                            <a
                              key={r.id}
                              href={r.html_url}
                              target="_blank"
                              rel="noreferrer"
                              className="db-card-hover flex items-center gap-2 px-3 py-2 rounded-xl"
                              style={{
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(112,0,255,0.12)",
                                textDecoration: "none",
                              }}
                            >
                              <span style={{ color: "#7000ff", fontSize: 13 }}>⎔</span>
                              <span className="font-mono font-semibold text-white truncate flex-1" style={{ fontSize: 13 }}>
                                {r.name}
                              </span>
                              <span className="font-mono" style={{ fontSize: 11, color: "#6B7280" }}>★ {r.stargazers_count}</span>
                            </a>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB: Repos ── */}
            {activeTab === "repos" && (
              <div className="staggered-reveal">
                <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-sm mb-4">
                  All Repositories ({repos.length})
                </h3>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {loading
                    ? [1,2,3,4,5,6].map((i) => <Skeleton key={i} h={160} r={16} />)
                    : repos.map((r) => <RepoCard key={r.id} repo={r} />)}
                </div>
              </div>
            )}

            {/* ── TAB: Activity ── */}
            {activeTab === "activity" && (
              <div className="staggered-reveal">
                <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-sm mb-4">
                  Public Activity
                </h3>
                {loading
                  ? [1,2,3,4,5].map((i) => (
                      <div key={i} className="db-activity-row">
                        <Skeleton h={28} w={28} r={14} />
                        <div style={{ flex: 1 }}><Skeleton h={13} /><div style={{ marginTop: 5 }} /><Skeleton h={11} w="50%" /></div>
                      </div>
                    ))
                  : events.map((e, i) => (
                      <div key={i} className="db-activity-row" style={{ animationDelay: `${i * 40}ms` }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                          background: "rgba(112,0,255,0.1)", border: "1px solid rgba(112,0,255,0.2)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, color: "#8b31ff",
                        }}>
                          {eventIcon(e.type)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="font-mono" style={{ fontSize: 12, color: "#D1D5DB" }}>{eventLabel(e)}</div>
                          <div className="font-mono" style={{ fontSize: 11, color: "#4B5563", marginTop: 2 }}>
                            {e.repo?.name} · {timeAgo(e.created_at)}
                          </div>
                        </div>
                        <a
                          href={`https://github.com/${e.repo?.name}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            fontSize: 10, padding: "2px 8px", borderRadius: 6, flexShrink: 0,
                            border: "1px solid rgba(112,0,255,0.25)",
                            color: "#8b31ff", textDecoration: "none",
                          }}
                        >
                          View ↗
                        </a>
                      </div>
                    ))}
              </div>
            )}

            {/* ── TAB: Heatmap ── */}
            {activeTab === "heatmap" && (
              <div className="staggered-reveal">
                <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-sm mb-4">
                  Contribution Activity
                </h3>
                <div
                  className="p-5 rounded-2xl mb-6"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(112,0,255,0.15)" }}
                >
                  <ContributionHeatmap />
                </div>
                {langs.length > 0 && (
                  <>
                    <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-sm mb-4">
                      Language Distribution
                    </h3>
                    <div
                      className="p-5 rounded-2xl"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(112,0,255,0.15)" }}
                    >
                      <LanguageBar languages={langs} />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ── Footer ── */}
            <div
              className="flex justify-between items-center mt-12 pt-4 font-mono staggered-reveal"
              style={{
                borderTop: "1px solid rgba(112,0,255,0.1)",
                fontSize: 11, color: "#374151", flexWrap: "wrap", gap: "0.5rem",
              }}
            >
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#7000ff", textDecoration: "none" }}
              >
                @{GITHUB_USERNAME} ↗
              </a>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default DeveloperDashboard;