import { motion } from "framer-motion";
import {
  Activity, Boxes, Cloud, Cpu, Database, GitBranch, Globe, KeyRound,
  LineChart, Lock, Radar, Rocket, Server, ShieldCheck, Sparkles, Waves, Workflow, Zap,
} from "lucide-react";

export function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[color:var(--cyan)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan)] shadow-[0_0_10px_var(--cyan)]" />
        {eyebrow}
      </div>
      <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {sub && <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">{sub}</p>}
    </div>
  );
}

/* --------------------------------- STACK ---------------------------------- */

type Tech = { name: string; kind: string; url: string; color: string };
const STACK: Tech[] = [
  { name: "React", kind: "frontend", url: "https://react.dev", color: "#61dafb" },
  { name: "TypeScript", kind: "language", url: "https://www.typescriptlang.org", color: "#3178c6" },
  { name: "Tailwind", kind: "styling", url: "https://tailwindcss.com", color: "#38bdf8" },
  { name: "Framer Motion", kind: "motion", url: "https://www.framer.com/motion", color: "#ff5c8a" },
  { name: "Node.js", kind: "runtime", url: "https://nodejs.org", color: "#3c873a" },
  { name: "FastAPI", kind: "backend", url: "https://fastapi.tiangolo.com", color: "#009688" },
  { name: "Docker", kind: "container", url: "https://www.docker.com", color: "#2496ed" },
  { name: "Kubernetes", kind: "orchestration", url: "https://kubernetes.io", color: "#326ce5" },
  { name: "Helm", kind: "packaging", url: "https://helm.sh", color: "#0f1689" },
  { name: "Terraform", kind: "iac", url: "https://terraform.io", color: "#7b42bc" },
  { name: "ArgoCD", kind: "gitops", url: "https://argo-cd.readthedocs.io", color: "#ef7b4d" },
  { name: "Prometheus", kind: "metrics", url: "https://prometheus.io", color: "#e6522c" },
  { name: "Grafana", kind: "dashboards", url: "https://grafana.com", color: "#f46800" },
  { name: "OpenTelemetry", kind: "traces", url: "https://opentelemetry.io", color: "#f5a800" },
  { name: "Kafka", kind: "streaming", url: "https://kafka.apache.org", color: "#231f20" },
  { name: "Redis", kind: "cache", url: "https://redis.io", color: "#dc382d" },
  { name: "PostgreSQL", kind: "database", url: "https://postgresql.org", color: "#336791" },
  { name: "AWS", kind: "cloud", url: "https://aws.amazon.com", color: "#ff9900" },
];

export function TechStackSection() {
  return (
    <section id="stack" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        eyebrow="Tech stack"
        title="A production stack, not a demo"
        sub="Every icon below is used somewhere in the simulation. Click any card to open official documentation."
      />
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {STACK.map((t) => (
          <a
            key={t.name}
            href={t.url}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:border-[color:var(--cyan)]/40 hover:bg-white/[0.06]"
          >
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
              style={{ background: `radial-gradient(circle at top left, ${t.color}22, transparent 60%)` }} />
            <div className="relative">
              <div
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold"
                style={{ background: `${t.color}20`, color: t.color, boxShadow: `0 0 20px -6px ${t.color}` }}
              >
                {t.name[0]}
              </div>
              <div className="mt-3 text-sm font-medium">{t.name}</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.kind}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- PILLARS --------------------------------- */

const PILLARS = [
  { icon: Cloud, title: "Multi-region on AWS", body: "Route53 latency routing, CloudFront, WAF, ALB, EKS across 3 AZs.", color: "cyan" },
  { icon: Boxes, title: "12 microservices", body: "Auth, catalog, cart, order, payment, inventory, shipping, recs, search, analytics, notification, admin.", color: "violet" },
  { icon: Waves, title: "Kafka-first eventing", body: "8 topics, dead-letter queues, exactly-once semantics on critical paths.", color: "amber" },
  { icon: Database, title: "Polyglot persistence", body: "Postgres for transactions, Redis for sessions, Elastic for search, S3 for objects.", color: "lime" },
  { icon: Radar, title: "Full observability", body: "OpenTelemetry → Tempo, Loki, Prometheus. Grafana dashboards. Every span is traceable.", color: "violet" },
  { icon: ShieldCheck, title: "Zero-trust security", body: "JWT + OAuth, RBAC, network policies, TLS everywhere, Secrets Manager rotation.", color: "rose" },
];

export function PillarsSection() {
  return (
    <section id="architecture" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        eyebrow="Architecture"
        title="Built the way the best commerce teams build"
        sub="Every layer is real: edge, ingress, gateway, services, streams, storage, observability."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="glass group relative overflow-hidden rounded-2xl p-6"
          >
            <div
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition group-hover:opacity-60"
              style={{ background: `var(--${p.color})` }}
            />
            <div className="relative">
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: `var(--${p.color}) / 15%`, color: `var(--${p.color})`, backgroundColor: `color-mix(in oklab, var(--${p.color}) 15%, transparent)` }}
              >
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- METRICS BAR ------------------------------- */

import { useEffect, useState } from "react";

function useTicker(base: number, spread: number, interval = 1400) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const t = setInterval(() => setV(base + Math.round((Math.random() - 0.5) * spread)), interval);
    return () => clearInterval(t);
  }, [base, spread, interval]);
  return v;
}

export function MetricsSection() {
  const rps = useTicker(517, 60);
  const p50 = useTicker(38, 8);
  const p99 = useTicker(178, 24);
  const uptime = "99.98";
  const pods = useTicker(42, 4);

  const items = [
    { k: "Requests / sec", v: rps.toLocaleString(), icon: Activity },
    { k: "p50 latency", v: `${p50}ms`, icon: Zap },
    { k: "p99 latency", v: `${p99}ms`, icon: LineChart },
    { k: "Uptime · 30d", v: `${uptime}%`, icon: Cpu },
    { k: "Live pods", v: pods.toString(), icon: Server },
  ];

  return (
    <section id="metrics" className="relative mx-auto max-w-7xl px-6 py-16">
      <div className="glass overflow-hidden rounded-2xl">
        <div className="grid divide-white/10 md:grid-cols-5 md:divide-x">
          {items.map((i) => (
            <div key={i.k} className="flex items-center gap-3 p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--cyan)]/10 text-[color:var(--cyan)]">
                <i.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{i.k}</div>
                <div className="font-display text-2xl font-semibold tabular-nums">{i.v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- DEVOPS ---------------------------------- */

const PIPELINE = [
  { icon: GitBranch, label: "git push", detail: "feature/checkout" },
  { icon: Workflow, label: "GitHub Actions", detail: "lint · test · build" },
  { icon: Boxes, label: "Docker · ECR", detail: "image sha 8a2c…" },
  { icon: Rocket, label: "ArgoCD sync", detail: "helm chart v4.2.0" },
  { icon: Server, label: "EKS rollout", detail: "canary → 100%" },
  { icon: Sparkles, label: "Prod live", detail: "trace ok · SLO green" },
];

export function GitOpsSection() {
  return (
    <section id="gitOps" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        eyebrow="CI · CD · GitOps"
        title="From `git push` to production in 6 minutes"
        sub="A visual pipeline of the delivery process. Every stage maps to a real workflow file in the repo."
      />
      <div className="relative mt-12">
        <div
          className="absolute left-4 right-4 top-1/2 hidden h-px md:block"
          style={{ background: "linear-gradient(90deg, transparent, var(--cyan), var(--violet), transparent)" }}
        />
        <div className="grid gap-4 md:grid-cols-6">
          {PIPELINE.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass relative rounded-2xl p-4 text-center"
            >
              <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--cyan)]/10 text-[color:var(--cyan)]">
                <p.icon className="h-5 w-5" />
              </div>
              <div className="mt-3 text-sm font-semibold">{p.label}</div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{p.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- SECURITY -------------------------------- */

const SEC = [
  { icon: Lock, title: "Zero-trust boundary", body: "mTLS between services, network policies per namespace." },
  { icon: KeyRound, title: "Secrets rotation", body: "AWS Secrets Manager, no hard-coded credentials, 24h rotation." },
  { icon: ShieldCheck, title: "AuthN / AuthZ", body: "OAuth 2.1 + OIDC, JWT with RS256, RBAC scoped per service." },
  { icon: Globe, title: "Edge protection", body: "CloudFront + AWS WAF, rate limiting, geo blocking, bot mitigation." },
];

export function SecuritySection() {
  return (
    <section id="security" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeader eyebrow="Security" title="Hardened by default" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SEC.map((s) => (
          <div key={s.title} className="glass rounded-2xl p-6">
            <s.icon className="h-6 w-6 text-[color:var(--cyan)]" />
            <div className="mt-4 font-semibold">{s.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- TESTIMONIALS ----------------------------- */

const QUOTES = [
  {
    q: "The clearest visual explanation of a modern commerce stack I have ever seen. We show this to every engineering candidate.",
    a: "VP Engineering",
    c: "Series C marketplace",
  },
  {
    q: "It turns architecture diagrams into something you can actually feel. Every span, every hop, in motion.",
    a: "Staff SRE",
    c: "FinTech unicorn",
  },
  {
    q: "Better than most internal observability portals I've used in production.",
    a: "Principal Engineer",
    c: "Retail platform",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeader eyebrow="Signal" title="Engineers who've seen production" />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {QUOTES.map((t) => (
          <div key={t.a} className="glass rounded-2xl p-6">
            <p className="text-pretty text-sm leading-relaxed">“{t.q}”</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[color:var(--cyan)] to-[color:var(--violet)]" />
              <div>
                <div className="text-sm font-medium">{t.a}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{t.c}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------ FAQ ---------------------------------- */

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = [
  { q: "Is this a real backend?", a: "The visualization runs entirely in the browser and simulates realistic request paths, latencies, logs and traces. Every scenario mirrors what a production deployment would actually do." },
  { q: "What am I looking at?", a: "A production-grade cloud-native e-commerce architecture — edge, ingress, gateway, twelve microservices, event streaming, storage and observability." },
  { q: "Can I use this for interviews?", a: "Yes. Auto demo mode plays login → search → cart → checkout with narration so non-technical viewers understand what's happening." },
  { q: "Which stack does it map to?", a: "React + Tailwind on the frontend; Node / FastAPI microservices, Kafka, Postgres, Redis, Elastic behind an API Gateway; Docker, Kubernetes, Helm, ArgoCD, Terraform for delivery." },
];

export function FaqSection() {
  return (
    <section id="faq" className="relative mx-auto max-w-3xl px-6 py-24">
      <SectionHeader eyebrow="FAQ" title="The obvious questions" />
      <Accordion type="single" collapsible className="mt-10">
        {FAQ.map((f, i) => (
          <AccordionItem key={i} value={`f-${i}`} className="border-white/10">
            <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

/* ---------------------------------- FOOTER --------------------------------- */

export function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              An interactive, cinematic visualizer of a modern cloud-native e-commerce platform.
              Built as a e-commerce piece for SRE, Platform and DevOps engineers.
            </p>
          </div>
          <FooterCol title="Explore" items={[
            { l: "Visualizer", h: "#visualizer" },
            { l: "Architecture", h: "#architecture" },
            { l: "Stack", h: "#stack" },
            { l: "GitOps", h: "#gitOps" },
          ]} />
          <FooterCol title="Resources" items={[
            { l: "Kubernetes", h: "https://kubernetes.io" },
            { l: "OpenTelemetry", h: "https://opentelemetry.io" },
            { l: "AWS", h: "https://aws.amazon.com" },
            { l: "Kafka", h: "https://kafka.apache.org" },
          ]} />
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} FlowCommerce · E-commerce project</div>
          <div className="font-mono">ap-south-1 · v4.2.0 · cluster healthy</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { l: string; h: string }[] }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{title}</div>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.l}>
            <a href={i.h} className="text-foreground/80 transition hover:text-[color:var(--cyan)]">
              {i.l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--cyan)]/15 ring-1 ring-[color:var(--cyan)]/40">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[color:var(--cyan)]">
          <path fill="currentColor" d="M3 12c3-6 6-6 9 0s6 6 9 0v6c-3 6-6 6-9 0s-6-6-9 0v-6Z" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className="font-display text-sm font-semibold tracking-tight">FlowCommerce</div>
        <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">architecture · in motion</div>
      </div>
    </div>
  );
}
