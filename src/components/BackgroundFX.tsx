export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 grid-bg opacity-[0.35]" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--cyan) 0%, transparent 60%)" }} />
      <div className="absolute right-[-10%] top-1/3 h-[420px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--violet) 0%, transparent 60%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[color:var(--background)] to-transparent" />
    </div>
  );
}
