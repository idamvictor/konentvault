"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, var(--color-foreground) 2px, transparent 0), radial-gradient(circle at 75px 75px, var(--color-foreground) 2px, transparent 0)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-extralight text-foreground mb-2 tracking-wider">
            Konent<span className="font-light text-primary">Vault</span>
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-16" />
        </motion.div>

        {/* Progress Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-primary/5 border border-border"
        >
          {/* Progress Bar */}
          <div className="w-80 h-2 bg-muted rounded-full overflow-hidden mb-4 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-sm"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress Percentage */}
          <motion.div
            key={progress}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-light text-card-foreground mb-2"
          >
            {progress}%
          </motion.div>

          {/* Loading Text */}
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="text-muted-foreground text-sm font-light tracking-wide"
          >
            Loading your experience
          </motion.p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-muted-foreground text-xs font-light mt-8 tracking-widest uppercase"
        >
          Your Content • Your Vault • Your Community
        </motion.p>
      </div>

      {/* Floating elements for subtle visual interest */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 1.5,
              ease: "easeOut",
            }}
            style={{
              left: `${30 + i * 20}%`,
              bottom: "10%",
            }}
          />
        ))}
      </div>
    </div>
  );
}
