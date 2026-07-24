import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Zap, RotateCcw, Maximize2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { EDGES, NODES, SCENARIOS, type ArchNode, type Scenario } from "@/lib/architecture";
import { cn } from "@/lib/utils";

const COLOR: Record<string, string> = {
  cyan: "var(--cyan)",
  violet: "var(--violet)",
  lime: "var(--lime)",
  amber: "var(--amber)",
  rose: "var(--rose)",
};

function nodeById(id: string): ArchNode {
  return NODES.find((n) => n.id === id)!;
}

export function Visualizer() {
  const scenarios = SCENARIOS.filter((s) => s.id !== "register");
  const [scenario, setScenario] = useState<Scenario>(scenarios[3]);
  const [runId, setRunId] = useState(0); // increments to replay
  const [activeStep, setActiveStep] = useState(-1);
  const [visibleLogs, setVisibleLogs] = useState<Scenario["logs"]>([]);
  const [autoDemo, setAutoDemo] = useState(false);
  const [metrics, setMetrics] = useState({ rps: 517, p50: 42, p99: 184, err: 0.03, pods: 42 });
  const timers = useRef<number[]>([]);

  const activeNodes = useMemo(() => new Set(scenario.path.slice(0, activeStep + 1)), [scenario, activeStep]);

  const activeEdges = useMemo(() => {
    const set = new Set<string>();
    for (let i = 0; i < activeStep && i < scenario.path.length - 1; i++) {
      set.add(`${scenario.path[i]}->${scenario.path[i + 1]}`);
      set.add(`${scenario.path[i + 1]}->${scenario.path[i]}`);
    }
    return set;
  }, [scenario, activeStep]);

  // Play animation whenever scenario/runId changes
  useEffect(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    setActiveStep(-1);
    setVisibleLogs([]);

    const stepMs = 420;
    scenario.path.forEach((_, i) => {
      const t = window.setTimeout(() => setActiveStep(i), i * stepMs);
      timers.current.push(t);
    });
    scenario.logs.forEach((log, i) => {
      const t = window.setTimeout(
        () => setVisibleLogs((prev) => [...prev, log]),
        400 + i * (stepMs * (scenario.path.length / Math.max(scenario.logs.length, 1))),
      );
      timers.current.push(t);
    });
    return () => timers.current.forEach((t) => clearTimeout(t));
  }, [scenario, runId]);

  // Auto demo loop
  useEffect(() => {
    if (!autoDemo) return;
    const total = scenario.path.length * 420 + 1200;
    const t = window.setTimeout(() => {
      const idx = scenarios.findIndex((s) => s.id === scenario.id);
      const next = scenarios[(idx + 1) % scenarios.length];
      setScenario(next);
      setRunId((r) => r + 1);
    }, total);
    return () => clearTimeout(t);
  }, [autoDemo, scenario, runId]);

  // Live-ish metrics tick
  useEffect(() => {
    const t = window.setInterval(() => {
      setMetrics((m) => ({
        rps: Math.max(220, Math.round(m.rps + (Math.random() - 0.5) * 40)),
        p50: Math.max(18, Math.round(m.p50 + (Math.random() - 0.5) * 6)),
        p99: Math.max(110, Math.round(m.p99 + (Math.random() - 0.5) * 18)),
        err: Math.max(0, Math.min(0.9, +(m.err + (Math.random() - 0.5) * 0.05).toFixed(2))),
        pods: Math.max(24, Math.min(96, Math.round(m.pods + (Math.random() - 0.5) * 2))),
      }));
    }, 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
      {/* Left: scenarios */}
      <aside className="glass rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Scenarios</span>
          <button
            onClick={() => setAutoDemo((v) => !v)}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition",
              autoDemo
                ? "bg-[var(--violet)]/20 text-[var(--violet)] ring-1 ring-[var(--violet)]/40"
                : "bg-white/5 text-muted-foreground hover:text-foreground",
            )}
          >
            <Zap className="h-3 w-3" /> Auto demo
          </button>
        </div>
        <ul className="space-y-1.5">
          {scenarios.map((s) => {
            const active = s.id === scenario.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => { setScenario(s); setRunId((r) => r + 1); }}
                  className={cn(
                    "group w-full rounded-xl border px-3 py-2.5 text-left transition",
                    active
                      ? "border-[color:var(--cyan)]/50 bg-[color:var(--cyan)]/10 shadow-[0_0_28px_-8px_var(--cyan)]"
                      : "border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: COLOR[s.color], boxShadow: `0 0 10px ${COLOR[s.color]}` }}
                    />
                    <span className="text-sm font-medium">{s.label}</span>
                  </div>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{s.description}</p>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Cluster · ap-south-1</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Metric label="RPS" value={metrics.rps.toString()} />
            <Metric label="Pods" value={metrics.pods.toString()} />
            <Metric label="p50" value={`${metrics.p50}ms`} />
            <Metric label="p99" value={`${metrics.p99}ms`} />
            <Metric label="Err %" value={metrics.err.toFixed(2)} />
            <Metric label="Ver" value="4.2.0" />
          </div>
        </div>

        <button
          onClick={() => setRunId((r) => r + 1)}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--cyan)] px-3 py-2 text-sm font-semibold text-[color:var(--primary-foreground)] transition hover:brightness-110"
        >
          <Play className="h-3.5 w-3.5 fill-current" /> Replay {scenario.label}
        </button>
      </aside>

      {/* Middle: canvas */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--card)]/60 backdrop-blur">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 30%, oklch(0.13 0.02 250 / 0.9) 100%)",
        }} />

        <div className="relative flex items-center justify-between px-4 py-3 text-[11px] font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--lime)] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--lime)]" />
            </span>
            LIVE SIMULATION
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">trace <span className="text-foreground">7f3a·1e9b</span></span>
            <span className="hidden sm:inline">region <span className="text-foreground">ap-south-1</span></span>
            <Link
              to="/fullscreen"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground transition hover:border-[color:var(--cyan)]/50 hover:bg-white/10 hover:text-foreground"
            >
              <Maximize2 className="h-3 w-3" /> Fullscreen
            </Link>
          </div>
        </div>

        <div className="relative w-full aspect-[16/9]">
          <ArchSvg activeNodes={activeNodes} activeEdges={activeEdges} scenarioColor={scenario.color} />
        </div>

        <div className="relative border-t border-white/10 px-4 py-2 text-[11px] font-mono flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
          <span>▸ path {scenario.path.length} hops</span>
          <span>▸ step {Math.min(activeStep + 1, scenario.path.length)}/{scenario.path.length}</span>
          <span>▸ scenario <span className="text-foreground">{scenario.id}</span></span>
        </div>
      </div>

      {/* Right: logs */}
      <aside className="glass rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Live logs</span>
          <button
            onClick={() => setRunId((r) => r + 1)}
            className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" /> Rerun
          </button>
        </div>

        <div className="max-h-[420px] space-y-1.5 overflow-y-auto pr-1 font-mono text-[11px]">
          <AnimatePresence initial={false}>
            {visibleLogs.map((l, i) => (
              <motion.div
                key={`${runId}-${i}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2 rounded-md border border-white/5 bg-white/[0.02] px-2 py-1.5"
              >
                <span className="text-muted-foreground">{new Date().toLocaleTimeString("en-GB")}</span>
                <span className="font-semibold uppercase" style={{ color: COLOR[scenario.color] }}>
                  {l.svc}
                </span>
                <span className="text-foreground/85">{l.msg}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {visibleLogs.length === 0 && (
            <p className="text-muted-foreground">Waiting for spans…</p>
          )}
        </div>

        <div className="mt-4 rounded-xl border border-white/5 bg-black/30 p-3">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Trace waterfall</div>
          <div className="space-y-1">
            {scenario.path.slice(0, Math.max(activeStep + 1, 1)).map((id, i) => {
              const n = nodeById(id);
              const w = 18 + Math.random() * 40;
              const l = i * 6;
              return (
                <div key={`${runId}-${id}-${i}`} className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="w-16 truncate text-muted-foreground">{n.label}</span>
                  <div className="relative h-1.5 flex-1 rounded-full bg-white/5">
                    <div
                      className="absolute top-0 h-full rounded-full"
                      style={{
                        left: `${l}%`,
                        width: `${w}%`,
                        background: `linear-gradient(90deg, ${COLOR[scenario.color]}, transparent)`,
                        boxShadow: `0 0 10px ${COLOR[scenario.color]}`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-black/30 px-2 py-1.5">
      <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-mono text-sm text-foreground tabular-nums">{value}</div>
    </div>
  );
}

function ArchSvg({
  activeNodes,
  activeEdges,
  scenarioColor,
}: {
  activeNodes: Set<string>;
  activeEdges: Set<string>;
  scenarioColor: keyof typeof COLOR;
}) {
  return (
    <svg viewBox="0 0 100 62" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="flowLine" x1="0" x2="1">
          <stop offset="0%" stopColor={COLOR[scenarioColor]} stopOpacity="0" />
          <stop offset="50%" stopColor={COLOR[scenarioColor]} stopOpacity="1" />
          <stop offset="100%" stopColor={COLOR[scenarioColor]} stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {EDGES.map((e) => {
        const a = nodeById(e.from);
        const b = nodeById(e.to);
        const key = `${e.from}->${e.to}`;
        const active = activeEdges.has(key);
        // convert node y from 0-100 to 0-62 for the viewbox
        const y1 = (a.y / 100) * 62;
        const y2 = (b.y / 100) * 62;
        return (
          <g key={key}>
            <line
              x1={a.x}
              y1={y1}
              x2={b.x}
              y2={y2}
              stroke={active ? COLOR[scenarioColor] : "oklch(0.5 0.03 240 / 0.25)"}
              strokeWidth={active ? 0.35 : 0.15}
              strokeLinecap="round"
            />
            {active && (
              <line
                x1={a.x}
                y1={y1}
                x2={b.x}
                y2={y2}
                stroke={COLOR[scenarioColor]}
                strokeWidth={0.5}
                strokeLinecap="round"
                strokeDasharray="1.2 1.6"
                className="animate-flow"
                opacity={0.9}
              />
            )}
          </g>
        );
      })}

      {/* Packets on active edges */}
      {[...activeEdges].filter((k) => !k.split("->")[0].localeCompare(k.split("->")[0])).map((k) => {
        const [fromId, toId] = k.split("->");
        // Only draw one direction (from smaller x to larger x) to avoid duplicates
        const a = nodeById(fromId);
        const b = nodeById(toId);
        if (a.x > b.x) return null;
        const y1 = (a.y / 100) * 62;
        const y2 = (b.y / 100) * 62;
        return (
          <motion.circle
            key={`packet-${k}`}
            r={0.55}
            fill={COLOR[scenarioColor]}
            style={{ filter: `drop-shadow(0 0 1.5px ${COLOR[scenarioColor]})` }}
            initial={{ cx: a.x, cy: y1, opacity: 0 }}
            animate={{ cx: b.x, cy: y2, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        );
      })}

      {/* Nodes */}
      {NODES.map((n) => {
        const active = activeNodes.has(n.id);
        const c = COLOR[n.color ?? "cyan"];
        const y = (n.y / 100) * 62;
        return (
          <g key={n.id} transform={`translate(${n.x} ${y})`}>
            {active && (
              <circle r={2.4} fill={c} opacity={0.18}>
                <animate attributeName="r" values="2;3.6;2" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.25;0;0.25" dur="1.6s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              r={1.15}
              fill={active ? c : "oklch(0.2 0.03 250)"}
              stroke={c}
              strokeWidth={active ? 0.35 : 0.18}
              style={{ filter: active ? `drop-shadow(0 0 1.6px ${c})` : "none" }}
            />
            <text
              x={0}
              y={-1.9}
              textAnchor="middle"
              fontSize={1.4}
              fontFamily="ui-monospace, monospace"
              fill={active ? "oklch(0.98 0 0)" : "oklch(0.72 0.03 230)"}
              style={{ letterSpacing: 0.05 }}
            >
              {n.label}
            </text>
            {n.sub && (
              <text
                x={0}
                y={2.5}
                textAnchor="middle"
                fontSize={0.95}
                fontFamily="ui-monospace, monospace"
                fill="oklch(0.55 0.03 240)"
              >
                {n.sub}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
