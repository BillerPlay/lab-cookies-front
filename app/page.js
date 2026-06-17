import Button from "./components/Button";
import Navbar from "./components/Navbar";

// ── Placeholder content (static — no fetching) ─────────────────────────
const projects = [
  {
    name: "neon-orm",
    blurb: "Type-safe ORM that compiles straight to the metal.",
    tags: ["rust", "db"],
    stars: 2841,
    forks: 193,
  },
  {
    name: "ghostkit",
    blurb: "Zero-config component library for dark-mode UIs.",
    tags: ["react", "ui"],
    stars: 5120,
    forks: 412,
  },
  {
    name: "synapse-cli",
    blurb: "AI pair-programmer that lives in your terminal.",
    tags: ["ai", "cli"],
    stars: 8930,
    forks: 766,
  },
  {
    name: "voidpack",
    blurb: "Bundler built on the void — instant cold starts.",
    tags: ["tooling", "wasm"],
    stars: 1502,
    forks: 88,
  },
  {
    name: "chrome-veins",
    blurb: "Animated SVG engine for cyberpunk dashboards.",
    tags: ["svg", "anim"],
    stars: 977,
    forks: 54,
  },
  {
    name: "deadlock",
    blurb: "Distributed lock manager with zero deadlocks. Really.",
    tags: ["go", "infra"],
    stars: 3344,
    forks: 220,
  },
];

const snippets = [
  {
    title: "debounce.js",
    code: `const debounce = (fn, ms) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};`,
  },
  {
    title: "neon.css",
    code: `.glow {
  color: #00f0ff;
  text-shadow: 0 0 8px #00f0ff,
               0 0 24px #00f0ff;
}`,
  },
  {
    title: "pipe.py",
    code: `from functools import reduce

def pipe(*fns):
    return lambda x: reduce(
        lambda acc, f: f(acc), fns, x
    )`,
  },
];

const members = [
  { handle: "n3on_rider", role: "core" },
  { handle: "byte_witch", role: "maintainer" },
  { handle: "0xGH0ST", role: "contributor" },
  { handle: "mainframe_mei", role: "core" },
  { handle: "void.runner", role: "contributor" },
  { handle: "synth_kid", role: "maintainer" },
];

function TagChip({ children }) {
  return (
    <span className="text-[10px] uppercase tracking-widest text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md backdrop-blur-sm">
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div className="relative flex flex-col flex-1 bg-[#05060a] text-white/90 overflow-hidden min-h-screen">
      
      {/* ── ФОНОВЫЕ СВЕТЯЩИЕСЯ СФЕРЫ ДЛЯ ЭФФЕКТА СТЕКЛА ── */}
      <div className="absolute top-[5%] left-[10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[35%] right-[5%] w-80 h-80 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[15%] w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* ── Top nav ─────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative px-6 sm:px-10 py-24 sm:py-32 text-center border-b border-white/[0.06] z-10">
        <p className="text-white/40 text-xs uppercase tracking-[0.4em] mb-4">
          {"// dev grid online"}
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white max-w-4xl mx-auto leading-[1.15] tracking-tight">
          Build in the dark.
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">
            Ship at the speed of light.
          </span>
        </h1>
        <p className="mt-6 text-white/50 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          DevForge is the underground community for builders, breakers, and
          dreamers. Browse projects, trade snippets, and jack in.
        </p>
        <div className="mt-10">
          <Button href="/auth" className="shadow-lg shadow-white/5">
            Log in →
          </Button>
        </div>
      </section>

      {/* ── Projects ────────────────────────────────────────────── */}
      <section className="relative px-6 sm:px-10 py-20 z-10 max-w-7xl mx-auto w-full">
        <h2 className="text-white/40 uppercase tracking-[0.2em] text-xs font-semibold mb-8 pl-1">
          # trending_repos
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.name}
              className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/15 hover:scale-[1.01] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)] group flex flex-col justify-between"
            >
              <div>
                <h3 className="text-white font-semibold text-lg tracking-tight group-hover:text-blue-400 transition-colors">
                  {p.name}
                </h3>
                <p className="text-white/50 text-sm mt-2.5 min-h-[2.5rem] leading-relaxed">
                  {p.blurb}
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {p.tags.map((t) => (
                    <TagChip key={t}>{t}</TagChip>
                  ))}
                </div>
                <div className="flex gap-5 mt-5 pt-4 border-t border-white/[0.04] text-xs text-white/40">
                  <span className="flex items-center gap-1">★ {p.stars.toLocaleString()}</span>
                  <span className="flex items-center gap-1">⑂ {p.forks}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Snippets ────────────────────────────────────────────── */}
      <section className="relative border-t border-white/[0.06] px-6 sm:px-10 py-20 z-10 max-w-7xl mx-auto w-full">
        <h2 className="text-white/40 uppercase tracking-[0.2em] text-xs font-semibold mb-8 pl-1">
          # snippet_vault
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {snippets.map((s) => (
            <div
              key={s.title}
              className="bg-white/[0.01] backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
            >
              <div className="flex items-center gap-1.5 px-4 py-3 bg-white/[0.02] border-b border-white/[0.06]">
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/10" />
                <span className="w-2 h-2 rounded-full bg-white/5" />
                <span className="ml-2 text-xs font-medium text-white/40">
                  {s.title}
                </span>
              </div>
              <pre className="p-5 text-xs text-blue-300/90 overflow-x-auto font-mono bg-black/20 leading-relaxed">
                <code>{s.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* ── Online members ──────────────────────────────────────── */}
      <section className="relative border-t border-white/[0.06] px-6 sm:px-10 py-20 z-10 max-w-7xl mx-auto w-full">
        <h2 className="text-white/40 uppercase tracking-[0.2em] text-xs font-semibold mb-8 pl-1">
          # online_now
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <li
              key={m.handle}
              className="flex items-center gap-3.5 bg-white/[0.02] backdrop-blur-lg border border-white/[0.06] rounded-xl px-4 py-3.5 shadow-sm hover:bg-white/[0.04] transition-colors duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-white/80 font-medium text-sm">@{m.handle}</span>
              <span className="ml-auto text-[10px] uppercase tracking-widest text-white/30 bg-white/5 px-2 py-0.5 rounded-md">
                {m.role}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="relative mt-auto px-6 sm:px-10 py-10 border-t border-white/[0.06] bg-white/[0.01] text-center text-xs text-white/30 z-10">
        <span className="text-white/50 tracking-[0.2em] font-semibold">DEVFORGE</span>{" "}
        {"// © 2099 — all signals encrypted."}
      </footer>
    </div>
  );
}