"use client";
import React, { useEffect, useRef, useState } from "react";

/** ULTRA PORTFOLIO — refined UI pass **/
/** Press "/" for Command Palette. Click "Accent" to cycle neon colors. **/

// ===== DATA =====
const DATA = {
  me: {
    name: "Muse Degu",
    title: "Software Engineer",
    blurb:
      "Bachelor of Science (BS) in Computer Science (University Of Maryland College Park). Full‑stack engineer building fast, reliable systems across web, infra, and AI.",
    email: "musdegu@gmail.com",
    github: "https://github.com/degumuse5",
    linkedin: "https://www.linkedin.com/in/muse-degu-91963a197/",
    location: "College Park, MD",
    resumeUrl: "#",
  },
  skills: [
    {
      name: "Languages",
      items: ["JavaScript", "TypeScript", "Java", "Python", "C", "C++"],
    },
    {
      name: "Frontend",
      items: [
        "HTML",
        "CSS",
        "Bootstrap",
        "Angular",
        "SvelteKit", 
        "Next.js",
        "D3.js",
      ],
    },
    {
      name: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "Spring Boot",
        "Django",
        "Flask",
        "GraphQL",
      ],
    },
    {
      name: "Databases",
      items: ["MySQL", "PostgreSQL", "MongoDB", "Supabase", "Firebase"],
    },
    {
      name: "DevOps",
      items: [
        "Docker",
        "Kubernetes",
        "CI/CD",
        "AWS",
        "GitHub",
        "Apache HTTP Server",
      ],
    },
  ],
  experience: [
    {
      company: "RapidEye.ai",
      role: "Software Engineering Intern",
      period: "Mar 2025 – Aug 2025",
      bullets: [
        "Built 4+ Python cloud apps on AWS (Lambda, S3, EC2).",
        "Authored 12+ REST APIs (OpenAPI) → ~25% faster integrations.",
        "Optimized realtime backends → ~20% lower latency for AI models.",
        "8‑person agile team; resolved 15+ sprint issues for reliability.",
        "Modular Python/JS/TS across 5+ deployments with clean OOP.",
      ],
    },
    {
      company: "University of Maryland College Park",
      role: "Equipment & Work Order Manager (Level 2)",
      period: "Jun 2021 – Present",
      bullets: [
        "Equipment & Work Order Manager (Level 1) (2021 - 2023)",
        "Trained 30+ employees on TMA; onboarding time −25%.",
        "Streamlined data retrieval; weekly reporting time −20% for 50+ staff.",
      ],
    },
  ],
  projects: [
    {
      name: "Invoice Management System",
      tech: ["AngularJS", "Spring Boot", "Spring Security", "Docker", "AWS"],
      link: "https://github.com/degumuse5/InvoiceManager",
      image: "bill.png",
      bullets: [
        "Developed a role-based invoice management system for companies with separate interfaces for managers and employees.",
        "Built reusable Angular modules for invoice creation, approval workflows, and history tracking.",
        "Integrated Spring Security to manage access for roles like Manager, Accountant, and Employee.",
      ],
    },
    {
      name: "NFL Match Predictor",
      tech: ["Streamlit", "scikit-learn", "Pandas", "Plotly", "NumPy"],
      link: "https://github.com/degumuse5/NFL-Match-Predictor",
      image: "nfl.png",
      bullets: [
        "Developed an interactive Streamlit web app that predicts NFL game outcomes with mock team statistics.",
        "Engineered features comparing win rates, offense/defense ratings, and point differentials for predictions.",
        "Trained a Random Forest classifier with home-field advantage and confidence metrics for accuracy tracking.",
        "Visualized predictions, spreads, and team stats using Plotly charts in a real-time interactive dashboard.",
      ],
    },
      {
        name: "AI Debugging Assistant",
        tech: ["React", "Express.js", "TypeScript", "PostgreSQL", "OpenAI API"],
        link: "#",
        image: "robot.png",
        bullets: [
          "Built a full-stack AI debugging app that analyzes multi-language code (JS, Python, Java, C++, etc.) with GPT-4.",
          "Implemented real-time bug detection, code quality scoring, and before/after fix suggestions.",
          "Added file upload, history tracking, and responsive UI using Tailwind + shadcn/ui.",
          "Deployed with PostgreSQL + Drizzle ORM backend, delivering ~30% faster debugging cycles.",
        ],
      },
  ],
};

// ===== UTIL =====
const ACCENTS = [
  "#6aa4ff",
  "#22d3ee",
  "#a78bfa",
  "#34d399",
  "#f472b6",
  "#f59e0b",
]; // blue, cyan, violet, green, pink, amber
function hexToRgb(hex) {
  const m = hex.replace("#", "");
  const v = parseInt(
    m.length === 3
      ? m
          .split("")
          .map((x) => x + x)
          .join("")
      : m,
    16
  );
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}
function useAccent() {
  const [i, setI] = useState(0);
  return {
    color: ACCENTS[i % ACCENTS.length],
    next: () => setI((x) => (x + 1) % ACCENTS.length),
  };
}
function useKey(key, handler) {
  useEffect(() => {
    const f = (e) => {
      if (e.key === key && !e.target?.closest?.("input,textarea")) {
        e.preventDefault();
        handler();
      }
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [key, handler]);
}

// Tilt
function useTilt() {
  const ref = useRef(null);
  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", String(py * -6));
    el.style.setProperty("--ry", String(px * 6));
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0");
    el.style.setProperty("--ry", "0");
  }
  return { ref, onMove, onLeave };
}

// ===== PRIMITIVES =====
const Badge = ({ children }) => <span className="badge">{children}</span>;
const Card = ({ children }) => <div className="card">{children}</div>;
const Metric = ({ label, value }) => (
  <div className="metric">
    <div className="metric__value">{value}</div>
    <div className="metric__label">{label}</div>
  </div>
);
function TiltCard({ children }) {
  const { ref, onMove, onLeave } = useTilt();
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="tilt">
      <div className="tilt__inner">{children}</div>
      <div className="tilt__shine" />
    </div>
  );
}
function TimelineGrid({ items }) {
  return (
    <div
      className="grid gap-8 auto-rows-auto 
                 grid-flow-row md:grid-flow-col 
                 auto-cols-max justify-start"
    >
      {items.map((e, i) => (
        <div
          key={i}
          className="rounded-2xl p-6 
                     bg-gradient-to-br from-purple-900/40 to-indigo-900/40 
                     backdrop-blur-xl border border-purple-500/30 
                     shadow-[0_0_25px_rgba(168,85,247,0.3)] 
                     hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] 
                     transition-all duration-500
                     w-max max-w-full"
        >
          {/* Company name */}
          <div
            className="inline-block px-4 py-1.5 rounded-full 
                          bg-gradient-to-r from-pink-500/20 to-purple-500/20 
                          text-pink-400 font-bold text-sm tracking-wider mb-4 shadow-inner"
          >
            {e.company.toUpperCase()}
          </div>

          {/* Role + Period */}
          <h3 className="text-white text-lg font-semibold tracking-wide">
            {e.role}
            {e.period && (
              <span className="ml-2 text-sm text-gray-400">— {e.period}</span>
            )}
          </h3>

          {/* Divider */}
          <div className="my-3 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

          {/* Bullets */}
          <ul className="mt-3 space-y-2 text-gray-300 text-sm leading-relaxed">
            {e.bullets.map((b, j) => (
              <li key={j} className="flex items-start gap-2 group">
                <span className="mt-1 h-2 w-2 rounded-full bg-pink-500 group-hover:scale-125 transition-transform duration-300"></span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Carousel({ slides }) {
  const [i, setI] = useState(0);
  const go = (d) => setI((x) => (x + d + slides.length) % slides.length);
  return (
    <div className="carousel">
      <button className="carousel__btn" onClick={() => go(-1)}>
        ‹
      </button>
      <div className="carousel__track">
        {slides.map((p, idx) => (
          <div
            key={idx}
            className={`carousel__slide ${idx === i ? "is-active" : ""}`}
          >
            <TiltCard>
              <Card>
                <div className="proj">
                  <div className="proj__media relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="proj__body">
                    <div className="proj__title flex items-center justify-between">
                      <h3 className="text-xl font-extrabold tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 drop-shadow-md">
                        {p.name}
                      </h3>
                      {p.link && (
                        <a
                          className="pill text-sm font-semibold text-blue-400 hover:text-blue-300 hover:underline transition"
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Repo ↗
                        </a>
                      )}
                    </div>
                    <ul className="mt-2 space-y-1 text-gray-300 text-sm leading-relaxed">
                      {p.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="before:content-['✦'] before:mr-2 before:text-purple-400"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="media__pill absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded uppercase tracking-widest shadow-md">
                    {p.tech.join(" • ")}
                  </div>
                </div>
              </Card>
            </TiltCard>
          </div>
        ))}
      </div>
      <button className="carousel__btn" onClick={() => go(1)}>
        ›
      </button>
    </div>
  );
}
function Spotlight({ open, setOpen }) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);
  const actions = [
    { label: "Go to Projects", href: "#projects" },
    { label: "Go to Experience", href: "#experience" },
    { label: "Go to Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
    { label: "GitHub", href: DATA.me.github },
    { label: "LinkedIn", href: DATA.me.linkedin },
  ];
  const [q, setQ] = useState("");
  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(q.toLowerCase())
  );
  return open ? (
    <div className="spot" onClick={() => setOpen(false)}>
      <div className="spot__panel" onClick={(e) => e.stopPropagation()}>
        <div className="spot__bar">
          <div className="dot" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search… (ESC to close)"
          />
        </div>
        <ul className="spot__list">
          {filtered.map((a, i) => (
            <li key={i}>
              <a href={a.href} onClick={() => setOpen(false)}>
                {a.label}
              </a>
            </li>
          ))}
          {filtered.length === 0 && <li className="muted">No results</li>}
        </ul>
      </div>
    </div>
  ) : null;
}
function AuroraBG() {
  return (
    <div aria-hidden className="bgfx">
      <style>{`
        .bgfx{position:fixed; inset:0; z-index:-1; overflow:hidden}
        .bgfx:before, .bgfx:after{content:""; position:absolute; width:60vmax; height:60vmax; border-radius:50%; filter:blur(80px); opacity:.28}
        .bgfx:before{top:-20vmax; left:-10vmax; background:radial-gradient(closest-side, var(--accent), transparent)}
        .bgfx:after{bottom:-20vmax; right:-10vmax; background:radial-gradient(closest-side, var(--accent), transparent); animation:drift 22s linear infinite}
        @keyframes drift{to{transform:rotate(360deg)}}
      `}</style>
    </div>
  );
}

// ===== PAGE =====
export default function UltraPortfolio() {
  const { color, next } = useAccent();
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);
  useKey("/", () => setOpen(true));
  useKey("Escape", () => setOpen(false));
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    const [r, g, b] = hexToRgb(color);
    root.style.setProperty("--accent", color);
    root.style.setProperty("--accent-rgb", `${r}, ${g}, ${b}`);
  }, [dark, color]);
  return (
    <div className="page">
      <AuroraBG />

      <header className="nav">
        <div className="nav__inner">
          <a href="#home" className="logo">
            {DATA.me.name}
          </a>
          <nav className="nav__links">
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
            {DATA.me.resumeUrl && DATA.me.resumeUrl !== "#" && (
              <a href={DATA.me.resumeUrl} target="_blank" rel="noreferrer">
                Resume
              </a>
            )}
          </nav>
          <div className="nav__actions">
            <button className="btn ghost" onClick={next}>
              Accent
            </button>
            <button className="btn ghost" onClick={() => setOpen(true)}>
              Search
            </button>
          </div>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="hero__inner">
          <div className="hero__copy">
            <div className="chips">
              <Badge>Open to SWE & Platform</Badge>
              <Badge>{DATA.me.location}</Badge>
            </div>
            <h1 className="display">
              <span className="grad">{DATA.me.name}</span>
            </h1>
            <p className="subtitle">{DATA.me.title}</p>
            <p className="muted maxw">{DATA.me.blurb}</p>
            <div className="cta">
              <a href="#projects" className="btn primary">
                View Projects →
              </a>
              <a
                className="link"
                href={DATA.me.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="link"
                href={DATA.me.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div className="stack">
              <div className="marquee">
                {[...DATA.skills[0].items, ...DATA.skills[1].items].map(
                  (s, i) => (
                    <span key={i} className="marq">
                      {s}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="section__head">
          <h2>Projects</h2>
        </div>
        <Carousel slides={DATA.projects} />
      </section>

      <section id="experience" className="section py-12 mr-25">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-100">Experience</h2>
            <p className="text-gray-400">Internships and leadership roles.</p>
          </div>
          <div></div>
          <TimelineGrid items={DATA.experience} />
        </div>
      </section>

      <section id="skills" className="section">
        <div className="section__head">
          <h2>Skills</h2>
          <p className="muted">Daily drivers, frameworks, and platforms.</p>
        </div>
        <div className="grid">
          {DATA.skills.map((s, i) => (
            <Card key={i}>
              <div className="skill">
                <h3>{s.name}</h3>
                <div className="badges">
                  {s.items.map((it, k) => (
                    <span key={k} className="chip">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="contact" className="section">
        <div className="section__head">
          <h2>Contact</h2>
          <p className="muted">
            Say hello — open to opportunities and collaborations.
          </p>
        </div>
        <Card>
          <div className="contact">
            <p>
              <strong>Email:</strong>{" "}
              <a className="link" href={`mailto:${DATA.me.email}`}>
                {DATA.me.email}
              </a>
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              <a
                className="link"
                href={DATA.me.github}
                target="_blank"
                rel="noreferrer"
              >
                {DATA.me.github}
              </a>
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                className="link"
                href={DATA.me.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                {DATA.me.linkedin}
              </a>
            </p>
          </div>
        </Card>
      </section>

      <div className="dock">
        <a href="#projects">Projects</a>
        <a href="#cases">Cases</a>
        <a href="#experience">Experience</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </div>
      <Spotlight open={open} setOpen={setOpen} />

      <style>{`
        *{box-sizing:border-box} html,body,#root{height:100%} body{margin:0; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale}

        /* theming */
        html{--accent:${ACCENTS[0]}; --accent-rgb:106,164,255; --bg:#f6f7fb; --bg2:#ffffff; --text:#0b0d12; --muted:#5f6b7a; --card:rgba(255,255,255,.8); --border:rgba(10,24,41,.08)}
        html.dark{--bg:#0b0d12; --bg2:#0d1117; --text:#e6e6e6; --muted:#a0a0a0; --card:rgba(255,255,255,.06); --border:rgba(255,255,255,.12)}

        .page{min-height:100vh;color:var(--text);background:radial-gradient(1200px 600px at 20% -10%, rgba(0,0,0,.04), transparent),radial-gradient(900px 500px at 100% 10%, rgba(0,0,0,.03), transparent),linear-gradient(180deg,var(--bg),var(--bg2))}
        .muted{color:var(--muted)} .link{color:var(--text);text-decoration:underline;text-decoration-style:dotted;text-underline-offset:4px}

        .btn{background:var(--text);color:var(--bg);border:none;border-radius:14px;padding:10px 14px;font-weight:700;cursor:pointer;transition:.2s}
        .btn:hover{transform:translateY(-1px)}
        .btn.ghost{background:transparent;color:var(--text);border:1px solid var(--border)} .btn.primary{background:var(--accent);color:#010104}

        .logo{font-weight:800; letter-spacing:.2px}
        .nav{position:sticky;top:0;z-index:60;backdrop-filter:blur(10px);background:linear-gradient(to bottom, rgba(0,0,0,.06), transparent);border-bottom:1px solid var(--border)}
        .nav__inner{max-width:1120px;margin:0 auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between}
        .nav__links a{margin:0 10px;color:var(--text);opacity:.8;position:relative}
        .nav__links a:after{content:"";position:absolute;left:0;bottom:-4px;height:2px;width:0;background:var(--accent);transition:width .2s}
        .nav__links a:hover:after{width:100%}
        .nav__actions{display:flex;gap:8px}

        .hero{padding:72px 0}
        .hero__inner{max-width:1120px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:1.2fr 1fr;gap:48px;align-items:center}
        .chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
        .badge{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border);background:rgba(0,0,0,.03);padding:6px 10px;border-radius:999px;font-size:12px}
        html.dark .badge{background:rgba(255,255,255,.06)}
        .display{font-size:56px;line-height:1.03;margin:0}
        .grad{background:linear-gradient(90deg, var(--accent), color-mix(in lab, var(--accent) 30%, var(--text)));-webkit-background-clip:text;background-clip:text;color:transparent}
        .subtitle{opacity:.9;margin:.35rem 0 .6rem 0}
        .maxw{max-width:640px}
        .cta{display:flex;gap:12px;align-items:center;margin-top:12px}
        .stack{margin-top:20px}
        .marquee{white-space:nowrap;overflow:hidden}
        .marquee .marq{display:inline-block;margin-right:16px;border:1px solid var(--border);border-radius:999px;padding:6px 10px;font-size:12px;background:rgba(0,0,0,.03)}
        html.dark .marquee .marq{background:rgba(255,255,255,.04)}

        .hero__card{display:grid;grid-template-rows:auto 1fr;gap:14px;padding:18px}
        .avatar{height:112px;width:112px;border-radius:50%;background:radial-gradient(circle at 30% 30%, #fff, #cfcfcf 40%, #8a8a8a);border:3px solid var(--border);margin:8px auto}
        .metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
        .metric{background:rgba(0,0,0,.03);border:1px solid var(--border);border-radius:14px;padding:14px;text-align:center}
        html.dark .metric{background:rgba(255,255,255,.05)}
        .metric__value{font-weight:800;font-size:20px}
        .metric__label{font-size:12px;color:var(--muted)}

        .section{padding:68px 0}
        .section__head{max-width:1120px;margin:0 auto;padding:0 24px 18px}
        .grid{max-width:1120px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
        .skill{padding:18px}
        .skill h3{margin:0 0 8px 0}
        .badges{display:flex;flex-wrap:wrap;gap:8px}
        .chip{border:1px solid var(--border);border-radius:999px;padding:6px 10px;font-size:12px;background:rgba(0,0,0,.03)}
        html.dark .chip{background:rgba(255,255,255,.04)}

        .timeline{position:relative;max-width:1120px;margin:0 auto;padding:0 24px}
        .timeline__item{position:relative;margin:18px 0 30px}
        .timeline__dot{position:absolute;left:-2px;top:12px;width:10px;height:10px;border-radius:50%;background:var(--accent);box-shadow:0 0 24px rgba(var(--accent-rgb), .35)}
        .item__head{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
        .item__head h3{margin:0}

        .card{border:1px solid var(--border);border-radius:18px;background:var(--card);backdrop-filter:blur(10px);position:relative;overflow:hidden;box-shadow:0 10px 30px rgba(var(--accent-rgb), .12)}
        .card:before{content:"";position:absolute;inset:0;background:linear-gradient(120deg, rgba(255,255,255,.04), transparent 30%, transparent 70%, rgba(255,255,255,.04));pointer-events:none}

        .tilt{perspective:1200px;position:relative}
        .tilt__inner{transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .08s ease-out}
        .tilt__shine{position:absolute;inset:0;background:radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,.16), transparent 40%);mix-blend-mode:soft-light;pointer-events:none}

        .carousel{position:relative;max-width:1120px;margin:0 auto;padding:0 24px}
        .carousel__track{position:relative}
        .carousel__slide{display:none}
        .carousel__slide.is-active{display:block}
        .carousel__btn{position:absolute;top:50%;transform:translateY(-50%);background:var(--card);border:1px solid var(--border);color:var(--text);padding:6px 10px;border-radius:12px;cursor:pointer}
        .carousel__btn:first-of-type{left:8px} .carousel__btn:last-of-type{right:8px}
        .proj{display:grid;grid-template-columns:1.05fr 1.6fr;gap:18px;padding:14px}
        .proj__media{position:relative;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:linear-gradient(135deg, rgba(0,0,0,.04), rgba(0,0,0,.02));min-height:190px}
        html.dark .proj__media{background:linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.03))}
        .media__preview{position:absolute;inset:0;background:linear-gradient(45deg, transparent 45%, rgba(255,255,255,.06) 50%, transparent 55%), radial-gradient(1000px 260px at 10% -20%, rgba(255,255,255,.06), transparent);background-size:14px 14px, auto;filter:saturate(120%)}
        .media__pill{position:absolute;bottom:10px;left:10px;background:rgba(0,0,0,.06);border:1px solid var(--border);padding:6px 10px;border-radius:999px;font-size:12px}
        html.dark .media__pill{background:rgba(255,255,255,.06)}
        .proj__title{display:flex;align-items:center;justify-content:space-between;gap:10px}
        .pill{border:1px solid var(--border);border-radius:999px;padding:6px 10px;font-size:12px}
        .proj__body ul{margin:10px 0 0 0;padding-left:18px}

        .contact{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:18px}
        .dock{position:fixed;left:50%;transform:translateX(-50%);bottom:18px;z-index:70;display:flex;gap:10px;background:rgba(0,0,0,.04);border:1px solid var(--border);backdrop-filter:blur(10px);border-radius:18px;padding:8px 10px}
        html.dark .dock{background:rgba(255,255,255,.08)}
        .dock a{color:var(--text);padding:6px 10px;border-radius:12px;transition:.2s} .dock a:hover{background:rgba(0,0,0,.06)}
        html.dark .dock a:hover{background:rgba(255,255,255,.08)}

        .spot{position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.5);backdrop-filter:blur(3px);display:grid;place-items:center}
        .spot__panel{width:min(680px, 92%);background:var(--bg2);border:1px solid var(--border);border-radius:16px;overflow:hidden}
        .spot__bar{display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:1px solid var(--border)}
        .spot__bar .dot{height:8px;width:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 14px rgba(var(--accent-rgb), .8)}
        .spot__bar input{flex:1;background:transparent;border:none;outline:none;color:var(--text)}
        .spot__list{max-height:48vh;overflow:auto}
        .spot__list a{display:block;padding:10px 12px} .spot__list a:hover{background:rgba(0,0,0,.06)}

        @media (max-width:920px){.hero__inner{grid-template-columns:1fr}.grid{grid-template-columns:1fr}.proj{grid-template-columns:1fr}.contact{grid-template-columns:1fr}}
      `}</style>
    </div>
  );
}
