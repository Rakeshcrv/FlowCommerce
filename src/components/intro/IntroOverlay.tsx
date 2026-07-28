import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import AnimatedCounter from "./AnimatedCounter";
import IntroBackground from "./IntroBackground";
import "./intro.css";

interface IntroOverlayProps {
  onFinish: () => void;
}

export default function IntroOverlay({
  onFinish,
}: IntroOverlayProps) {
  const [step, setStep] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timers = [
      // Show "Your page loaded in"
      setTimeout(() => setStep(1), 500),

      // Show counter
      setTimeout(() => setStep(2), 1200),

      // Show "But..."
      setTimeout(() => setStep(3), 3300),

      // Show final question
      setTimeout(() => setStep(4), 4300),

      // Start exit animation
      setTimeout(() => setHide(true), 6200),

      // Remove overlay
      setTimeout(() => onFinish(), 7300),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#050816]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: {
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <IntroBackground />

          <div className="relative z-20 flex h-full items-center justify-center px-6">
            <div className="max-w-4xl text-center">

              {/* --------------------- */}
              {/* Your page loaded in */}
              {/* --------------------- */}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{
                  opacity: step >= 1 ? 1 : 0,
                  y: step >= 1 ? 0 : 12,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="mb-8 text-xl tracking-wide text-white/65"
              >
                Your page loaded in
              </motion.p>

              {/* --------------------- */}
              {/* Counter */}
              {/* --------------------- */}

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: step >= 2 ? 1 : 0,
                  scale: step >= 2 ? 1 : 0.95,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                {step >= 2 && (
                  <AnimatedCounter target={1.24} />
                )}
              </motion.div>

              {/* --------------------- */}
              {/* BUT */}
              {/* --------------------- */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: step >= 3 ? 1 : 0,
                  y: step >= 3 ? 0 : 20,
                }}
                transition={{
                  duration: 0.7,
                }}
                className="mt-24"
              >
                <h2 className="text-5xl font-semibold text-white md:text-6xl">
                  But...
                </h2>
              </motion.div>

              {/* --------------------- */}
              {/* Question */}
              {/* --------------------- */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: step >= 4 ? 1 : 0,
                  y: step >= 4 ? 0 : 15,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="mt-8"
              >
                <h1 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
                  where did those
                </h1>

                <motion.h1
                  className="mt-2 bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                >
                  1.24 seconds go?
                </motion.h1>
              </motion.div>

              {/* --------------------- */}
              {/* Hint */}
              {/* --------------------- */}


            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}