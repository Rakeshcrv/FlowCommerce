import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
}

export default function AnimatedCounter({
  target,
  duration = 1.4,
}: AnimatedCounterProps) {
  const count = useMotionValue(0);

  const rounded = useTransform(count, (latest) =>
    latest.toFixed(2)
  );

  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const controls = animate(count, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => setFinished(true),
    });

    return () => controls.stop();
  }, [count, duration, target]);

  return (
    <div className="relative flex items-center justify-center">

      {/* Glow */}
      <motion.div
        className="absolute h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"
        animate={{
          scale: finished ? [1, 1.2, 1] : [1, 1.05, 1],
          opacity: finished ? [0.4, 0.7, 0.4] : [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: finished ? 0.8 : 3,
          repeat: finished ? 0 : Infinity,
        }}
      />

      <motion.div
        animate={
          finished
            ? {
                scale: [1, 1.05, 1],
              }
            : {}
        }
        transition={{
          duration: 0.45,
        }}
        className="relative"
      >
        <motion.span
          style={{
            fontVariantNumeric: "tabular-nums",
          }}
          className="
            text-7xl
            md:text-8xl
            lg:text-9xl
            font-bold
            tracking-tight
            text-white
            drop-shadow-[0_0_30px_rgba(34,211,238,.25)]
          "
        >
          {rounded}
        </motion.span>

        {/* underline */}
        <motion.div
          className="mx-auto mt-4 h-[2px] rounded-full bg-cyan-400"
          initial={{ width: 0 }}
          animate={{
            width: finished ? 120 : 80,
          }}
          transition={{
            duration: 0.8,
          }}
        />
      </motion.div>
    </div>
  );
}