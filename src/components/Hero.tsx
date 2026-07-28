import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Home, Play } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Sections";


function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { l: "Architecture", h: "architecture" },
    { l: "Stack", h: "stack" },
    { l: "GitOps", h: "gitOps" },
  ];
  
  return (
    <motion.header
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-8 z-50 px-6"
    >
      <motion.div
        animate={{
          width: scrolled ? "92%" : "100%",
          y: scrolled ? 0 : 6,
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 py-3 transition-all duration-300 ${
          scrolled
            ? "rounded-2xl border border-white/10 bg-[#050816]/75 shadow-2xl backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <Link to="/" className="transition hover:opacity-90">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{
              className:
                "rounded-full bg-white/10 px-3 py-1.5 text-sm text-foreground",
            }}
            inactiveProps={{
              className:
                "rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground",
            }}
          >
            <span className="inline-flex items-center gap-1.5">
              <Home className="h-3.5 w-3.5" />
              Home
            </span>
          </Link>

          {items.map((item) => (
            <Link
              key={item.h}
              to="/"
              hash={item.h}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
            >
              {item.l}
            </Link>
          ))}
        </nav>

        <Link
          to="/visualizer"
          className="inline-flex items-center gap-2 rounded-full bg-[color:var(--cyan)] px-5 py-2 text-sm font-semibold text-[color:var(--primary-foreground)] shadow-[0_0_24px_-4px_var(--cyan)] transition hover:brightness-110"
        >
          Launch Visualizer
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </motion.header>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 pb-16 pt-36 md:pt-40 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:pb-24">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
          >
            <span className="text-[color:var(--cyan)]">PRODUCTION READY</span>
            <span className="text-muted-foreground">Cloud Infrastructure · Observability</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
          >
            See what happens{" "}
            <span className="text-gradient">behind every click</span>{" "}
            in production.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
          Simulate production traffic through a cloud-native e-commerce platform and observe every request flowing across API Gateway,
          Kubernetes, Redis, Kafka, PostgreSQL and distributed microservices in real time.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/visualizer"
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--cyan)] px-5 py-2.5 text-sm font-semibold text-[color:var(--primary-foreground)] shadow-[0_0_40px_-6px_var(--cyan)] transition hover:brightness-110"
            >
              Launch Visualizer
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <button
              onClick={() => scrollTo("stack")}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-[color:var(--violet)]/60 hover:bg-white/10"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--violet)]/20 text-[color:var(--violet)]">
                <Play className="h-2.5 w-2.5 fill-current" />
              </span>
              Explore the stack
            </button>
          </motion.div>
        </div>

        <HeroCard />
      </div>
    </section>
  );
}

function HeroCard() {
  const svcs: { l: string; c: string; sub: string }[] = [
    { l: "AUTH", c: "var(--violet)", sub: "svc-auth-1" },
    { l: "CATALOG", c: "var(--lime)", sub: "svc-catalog-2" },
    { l: "CART", c: "var(--amber)", sub: "svc-cart-3" },
    { l: "ORDER", c: "var(--amber)", sub: "svc-order-4" },
    { l: "PAYMENT", c: "var(--rose)", sub: "svc-payment-5" },
    { l: "INVENTORY", c: "var(--lime)", sub: "svc-inventory-6" },
    { l: "SHIPPING", c: "var(--amber)", sub: "svc-shipping-7" },
    { l: "NOTIFY", c: "var(--cyan)", sub: "svc-notify-8" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative"
    >
      <div className="glass-strong relative overflow-hidden rounded-2xl p-5 shadow-[0_30px_80px_-30px_var(--cyan)]">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--lime)] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--lime)]" />
            </span>
            Live simulation
          </div>
          <div className="font-mono text-[10px] text-muted-foreground">ap-south-1 · v4.2.0</div>
        </div>

        <div className="relative mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {svcs.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.05 }}
              className="rounded-lg border p-2.5"
              style={{ borderColor: `color-mix(in oklab, ${s.c} 40%, transparent)`, background: `color-mix(in oklab, ${s.c} 8%, transparent)` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-semibold tracking-widest" style={{ color: s.c }}>{s.l}</span>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.c, boxShadow: `0 0 8px ${s.c}` }} />
              </div>
              <div className="mt-1 font-mono text-[10px] text-muted-foreground">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-3 space-y-1 rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-[11px]">
          {[
            ["gateway", "POST /api/orders/checkout · 87ms · 201"],
            ["kafka", "order.created offset=8421 partition=2"],
            ["payment", "charge $249.00 · succeeded"],
            ["notify", "email queued to sqs"],
          ].map(([svc, msg], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.4 }}
              className="flex gap-2"
            >
              <span className="text-[color:var(--cyan)]">▸</span>
              <span className="text-foreground/80">{svc}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-foreground/70">{msg}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating chips */}
      <div className="pointer-events-none absolute -left-6 top-8 hidden animate-float-slow rounded-lg border border-[color:var(--cyan)]/40 bg-black/60 px-3 py-1.5 font-mono text-[10px] text-[color:var(--cyan)] backdrop-blur md:block">
        trace 7f3a·1e9b · 14 spans
      </div>
    </motion.div>
  );
}
