import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";

import { BackgroundFX } from "@/components/BackgroundFX";
import { Hero, Nav } from "@/components/Hero";
import {
  DevOpsSection,
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
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans text-foreground">
      <BackgroundFX />

      {/* Intro */}
      {showIntro && (
        <IntroOverlay
          onFinish={() => setShowIntro(false)}
        />
      )}

      {/* Landing Page */}
      <motion.div
        animate={
          showIntro
            ? {
                scale: 1.025,
                filter: "blur(8px)",
                opacity: 0.75,
              }
            : {
                scale: 1,
                filter: "blur(0px)",
                opacity: 1,
              }
        }
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative"
      >
        {/* Dark cinematic overlay */}
        <motion.div
          animate={{
            opacity: showIntro ? 0.45 : 0,
          }}
          transition={{
            duration: 1.2,
          }}
          className="pointer-events-none absolute inset-0 z-20 bg-[#050816]"
        />

        <Nav />

        <main>
          {/* Hero */}
          <motion.div
            animate={
              showIntro
                ? {
                    y: 40,
                    opacity: 0.45,
                  }
                : {
                    y: 0,
                    opacity: 1,
                  }
            }
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Hero />
          </motion.div>

          {/* Pillars */}
          <motion.div
            animate={
              showIntro
                ? {
                    y: 40,
                    opacity: 0,
                  }
                : {
                    y: 0,
                    opacity: 1,
                  }
            }
            transition={{
              duration: 1,
              delay: 0.15,
            }}
          >
            <PillarsSection />
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            animate={
              showIntro
                ? {
                    y: 40,
                    opacity: 0,
                  }
                : {
                    y: 0,
                    opacity: 1,
                  }
            }
            transition={{
              duration: 1,
              delay: 0.3,
            }}
          >
            <TechStackSection />
          </motion.div>

          {/* DevOps */}
          <motion.div
            animate={
              showIntro
                ? {
                    y: 40,
                    opacity: 0,
                  }
                : {
                    y: 0,
                    opacity: 1,
                  }
            }
            transition={{
              duration: 1,
              delay: 0.45,
            }}
          >
            <DevOpsSection />
          </motion.div>

          {/* Security */}
          <motion.div
            animate={
              showIntro
                ? {
                    y: 40,
                    opacity: 0,
                  }
                : {
                    y: 0,
                    opacity: 1,
                  }
            }
            transition={{
              duration: 1,
              delay: 0.6,
            }}
          >
            <SecuritySection />
          </motion.div>

          {/* CTA */}
          <motion.section
            animate={
              showIntro
                ? {
                    y: 40,
                    opacity: 0,
                  }
                : {
                    y: 0,
                    opacity: 1,
                  }
            }
            transition={{
              duration: 1,
              delay: 0.75,
            }}
            className="relative mx-auto max-w-5xl px-6 pb-24"
          >
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
          </motion.section>
        </main>

        <motion.div
          animate={
            showIntro
              ? {
                  opacity: 0,
                  y: 30,
                }
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          transition={{
            duration: 1,
            delay: 0.9,
          }}
        >
          <Footer />
        </motion.div>
      </motion.div>
    </div>
  );
}