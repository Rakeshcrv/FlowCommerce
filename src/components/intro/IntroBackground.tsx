import { motion } from "framer-motion";

export default function IntroBackground() {
  return (
    <>
      {/* Base Background */}
      <div className="absolute inset-0 bg-[#050816]" />

      {/* Radial Gradient */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,.12) 0%, rgba(6,182,212,.04) 35%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Moving Light Beam */}
      <motion.div
        className="absolute top-0 -left-1/3 h-full w-40"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,211,238,.14), transparent)",
          filter: "blur(60px)",
        }}
        animate={{
          x: ["0%", "240%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.15,
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.05, 0.25, 0.05],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Top Glow */}
      <motion.div
        className="absolute left-1/2 top-0 h-56 w-[700px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,.18), transparent 70%)",
          filter: "blur(90px)",
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      {/* Bottom Glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-72 w-[800px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,.12), transparent 75%)",
          filter: "blur(120px)",
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, transparent 45%, rgba(0,0,0,.55) 100%)",
        }}
      />
    </>
  );
}