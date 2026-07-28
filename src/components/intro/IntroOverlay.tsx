import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroOverlayProps {
  onFinish: () => void;
}

export default function IntroOverlay({
  onFinish,
}: IntroOverlayProps) {
  const counter = useMotionValue(0);
  const display = useTransform(counter, (v) => `${v.toFixed(2)}s`);

  const [step, setStep] = useState(0);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      // Show "The page loaded in"
      await wait(400);
      if (!mounted) return;
      setStep(1);

      // Animate 0.00 -> 1.24
      await animateCounter(counter);

      // Small pause
      await wait(500);
      if (!mounted) return;

      // Show "But..."
      setStep(2);

      await wait(450);
      if (!mounted) return;

      // Show question
      setStep(3);

      await wait(1400);
      if (!mounted) return;

      // Slide away
      setStep(4);

      await wait(850);
      if (!mounted) return;

      onFinish();
    };

    run();

    return () => {
      mounted = false;
    };
  }, [counter, onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050816]"
      animate={{
        y: step === 4 ? "-100%" : 0,
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="px-8 text-center">

        {/* Heading */}

        <motion.p
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: step >= 1 ? 0.7 : 0,
            y: step >= 1 ? 0 : 12,
          }}
          transition={{
            duration: 0.45,
          }}
          className="mb-5 text-lg tracking-wide text-white/60"
        >
          The page loaded in
        </motion.p>

        {/* Counter */}

        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          animate={{
            opacity: step >= 1 ? 1 : 0,
            scale: step >= 1 ? 1 : 0.97,
          }}
          transition={{
            duration: 0.45,
          }}
          style={{
            fontVariantNumeric: "tabular-nums",
          }}
          className="text-7xl font-bold tracking-tight text-white md:text-8xl"
        >
          {display}
        </motion.h1>

        {/* But... */}

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: step >= 2 ? 1 : 0,
            y: step >= 2 ? 0 : 8,
          }}
          transition={{
            duration: 0.25,
          }}
          className="mt-12"
        >
          <p className="text-3xl font-medium text-cyan-300">
            But...
          </p>
        </motion.div>

        {/* Question */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: step >= 3 ? 1 : 0,
            y: step >= 3 ? 0 : 12,
          }}
          transition={{
            duration: 0.35,
          }}
          className="mt-5"
        >
          <p className="text-3xl font-semibold leading-tight text-white md:text-5xl">
            What happened behind
          </p>

          <p className="mt-2 text-3xl font-semibold leading-tight text-cyan-300 md:text-5xl">
            those 1.24 seconds?
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function animateCounter(value: any) {
  return new Promise<void>((resolve) => {
    animate(value, 1.24, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onComplete: resolve,
    });
  });
}