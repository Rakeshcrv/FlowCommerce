import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { BackgroundFX } from "@/components/BackgroundFX";
import { Hero, Nav } from "@/components/Hero";
import {
  GitOpsSection,
  Footer,
  PillarsSection,
  SecuritySection,
  TechStackSection,
} from "@/components/Sections";

import IntroOverlay from "@/components/intro/IntroOverlay";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const seen = window.sessionStorage.getItem("flowops_intro_seen");

    if (!seen) {
      setShowIntro(true);
    }

    setLoading(false);
  }, []);

  const handleIntroFinish = () => {
    window.sessionStorage.setItem("flowops_intro_seen", "true");
    setShowIntro(false);
  };

  // Wait until we're on the client
  if (loading) {
    return null;
  }

  // Only render the intro
  if (showIntro) {
    return <IntroOverlay onFinish={handleIntroFinish} />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans text-foreground">
      <BackgroundFX />

      <Nav />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Hero />

        <PillarsSection />

        <TechStackSection />

        <GitOpsSection />

        <SecuritySection />

        {/* CTA */}
        <section className="relative mx-auto max-w-5xl px-6 pb-24">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse at center, color-mix(in oklab, var(--cyan) 25%, transparent), transparent 60%)",
              }}
            />

            <div className="relative">
              <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to see production, in motion?
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Open the visualizer and trigger a checkout. Every hop, every
                log, every span — animated.
              </p>

              <div className="mt-6 flex justify-center gap-3">
                <Link
                  to="/visualizer"
                  className="rounded-full bg-[color:var(--cyan)] px-5 py-2.5 text-sm font-semibold text-[color:var(--primary-foreground)] shadow-[0_0_36px_-6px_var(--cyan)] transition hover:brightness-110"
                >
                  Launch Visualizer
                </Link>

                <a
                  href="#stack"
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
                >
                  Explore the stack
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </motion.main>
    </div>
  );
}