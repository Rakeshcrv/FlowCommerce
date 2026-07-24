import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/BackgroundFX";
import { Hero, Nav } from "@/components/Hero";
import {
  DevOpsSection,
  Footer,
  PillarsSection,
  SecuritySection,
  TechStackSection,
} from "@/components/Sections";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen font-sans text-foreground">
      <BackgroundFX />
      <Nav />
      <main>
        <Hero />
        

        <PillarsSection />
        <TechStackSection />
        <DevOpsSection />
        <SecuritySection />

        <section className="relative mx-auto max-w-5xl px-6 pb-24">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center">
            <div className="pointer-events-none absolute inset-0 opacity-60"
              style={{ background: "radial-gradient(ellipse at center, color-mix(in oklab, var(--cyan) 25%, transparent), transparent 60%)" }} />
            <div className="relative">
              <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to see production, in motion?
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Open the visualizer and trigger a checkout. Every hop, every log, every span — animated.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link to="/visualizer" className="rounded-full bg-[color:var(--cyan)] px-5 py-2.5 text-sm font-semibold text-[color:var(--primary-foreground)] shadow-[0_0_36px_-6px_var(--cyan)] transition hover:brightness-110">
                  Launch Visualizer
                </Link>
                <a href="#stack" className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
                  Explore the stack
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
