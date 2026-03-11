"use client";

import { motion } from "motion/react";
import { useMemo, useState, useEffect } from "react";
import svgPaths from "@/imports/svg-5zhiubpff2";

/* ─── Figma Spaceship ─── */
export function Spaceship({
  className = "",
  size = 150,
  flip = false,
  style = {},
}: {
  className?: string;
  size?: number;
  flip?: boolean;
  style?: React.CSSProperties;
}) {
  const scale = size / 150;
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        width: size,
        height: size * 0.56,
        transform: flip ? "scaleX(-1)" : undefined,
        ...style,
      }}
    >
      <div className="relative w-full h-full" style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {/* Trail / exhaust */}
        <svg className="absolute" style={{ left: "26.5%", top: "16%", width: "73.5%", height: "84%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 111.029 55.2579">
          <path d={svgPaths.p3a3de00} fill="url(#sp_trail)" style={{ mixBlendMode: "screen" }} />
          <defs>
            <linearGradient id="sp_trail" gradientUnits="userSpaceOnUse" x1="6.7" x2="98.1" y1="1.78" y2="51.39">
              <stop stopColor="white" /><stop offset="1" stopColor="black" />
            </linearGradient>
          </defs>
        </svg>
        {/* Body shadow */}
        <svg className="absolute" style={{ left: "0%", top: "5.12%", width: "39.34%", height: "50.88%", mixBlendMode: "multiply", opacity: 0.3 }} fill="none" viewBox="0 0 59.4272 33.4765" preserveAspectRatio="none">
          <path d={svgPaths.p2c93cd00} fill="#0C0D4D" />
        </svg>
        {/* Cyan wing */}
        <svg className="absolute" style={{ left: "16.68%", top: "27.67%", width: "21.5%", height: "23.24%" }} fill="none" viewBox="0 0 32.478 15.2873" preserveAspectRatio="none">
          <path d={svgPaths.p1f77c400} fill="#00B7FF" />
        </svg>
        {/* Wing shadow */}
        <svg className="absolute" style={{ left: "16.68%", top: "27.67%", width: "15.92%", height: "13.04%", mixBlendMode: "multiply", opacity: 0.6 }} fill="none" viewBox="0 0 24.0488 8.57958" preserveAspectRatio="none">
          <path d={svgPaths.p397d100} fill="#00B7FF" />
        </svg>
        {/* Top fin */}
        <svg className="absolute" style={{ left: "17.54%", top: "0%", width: "23.46%", height: "17.66%" }} fill="none" viewBox="0 0 35.4388 11.6145" preserveAspectRatio="none">
          <path d={svgPaths.p29f38600} fill="#00B7FF" />
        </svg>
        {/* Main body */}
        <svg className="absolute" style={{ left: "1.67%", top: "4.71%", width: "30.33%", height: "33.77%" }} fill="none" viewBox="0 0 45.8169 22.218" preserveAspectRatio="none">
          <path d={svgPaths.p2831ef80} fill="white" />
        </svg>
        {/* Cockpit stripe */}
        <svg className="absolute" style={{ left: "29.18%", top: "13.11%", width: "2.82%", height: "22.69%" }} fill="none" viewBox="0 0 4.2599 14.9248" preserveAspectRatio="none">
          <path d={svgPaths.p3c6cf280} fill="#A4ACBF" />
        </svg>
        {/* Belly shade */}
        <svg className="absolute" style={{ left: "20.76%", top: "21.56%", width: "10.74%", height: "10.7%", mixBlendMode: "multiply" }} fill="none" viewBox="0 0 16.2239 7.03942" preserveAspectRatio="none">
          <path d={svgPaths.p19d14c00} fill="#E6E6E6" />
        </svg>
        {/* Engine detail */}
        <svg className="absolute" style={{ left: "13.45%", top: "14.67%", width: "5.92%", height: "11.87%" }} fill="none" viewBox="0 0 8.94278 7.80962" preserveAspectRatio="none">
          <path d={svgPaths.p36fc1b80} fill="#A4ACBF" />
        </svg>
        {/* Tail fin */}
        <svg className="absolute" style={{ left: "1.67%", top: "6.27%", width: "11.43%", height: "25.16%" }} fill="none" viewBox="0 0 17.2665 16.5562" preserveAspectRatio="none">
          <path d={svgPaths.p1e62d880} fill="#00B7FF" />
        </svg>
        {/* Tail shadow */}
        <svg className="absolute" style={{ left: "1.75%", top: "15.45%", width: "10.59%", height: "15.98%", mixBlendMode: "multiply", opacity: 0.5 }} fill="none" viewBox="0 0 15.9953 10.5138" preserveAspectRatio="none">
          <path d={svgPaths.p21da6600} fill="#00B7FF" />
        </svg>
        {/* Small rear */}
        <svg className="absolute" style={{ left: "1.67%", top: "9.43%", width: "6.13%", height: "15.71%" }} fill="none" viewBox="0 0 9.26025 10.3325" preserveAspectRatio="none">
          <path d={svgPaths.p2bf80d80} fill="#A4ACBF" />
        </svg>
        {/* Exhaust line */}
        <svg className="absolute" style={{ left: "20.16%", top: "20.59%", width: "19.44%", height: "7.08%" }} fill="none" viewBox="0 0 29.3724 4.65739" preserveAspectRatio="none">
          <path d={svgPaths.p28299880} fill="#00B7FF" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Twinkling Star ─── */
export function TwinkleStar({
  size = 4,
  color = "white",
  delay = 0,
  duration = 3,
  className = "",
  style = {},
}: {
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={`rounded-full pointer-events-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${size * 0.5}px ${color}`,
        ...style,
      }}
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ─── Four-pointed Star SVG ─── */
export function StarShape({
  size = 20,
  color = "#00B7FF",
  className = "",
  style = {},
}: {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`pointer-events-none ${className}`}
      style={style}
    >
      <path
        d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
        fill={color}
      />
    </svg>
  );
}

/* ─── Planet with ring ─── */
export function Planet({
  size = 40,
  color = "#6C63FF",
  ringColor = "rgba(255,255,255,0.3)",
  className = "",
  style = {},
}: {
  size?: number;
  color?: string;
  ringColor?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative pointer-events-none ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      {/* Planet body */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.6,
          height: size * 0.6,
          top: size * 0.2,
          left: size * 0.2,
          background: `radial-gradient(circle at 35% 35%, ${color}, ${color}88)`,
          boxShadow: `inset -${size * 0.06}px -${size * 0.06}px ${size * 0.15}px rgba(0,0,0,0.4), 0 0 ${size * 0.3}px ${color}44`,
        }}
      />
      {/* Ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size * 0.3,
          top: size * 0.35,
          left: 0,
          border: `1.5px solid ${ringColor}`,
          borderRadius: "50%",
          transform: "rotateX(70deg)",
        }}
      />
    </div>
  );
}

/* ─── Orbiting dot ─── */
export function OrbitDot({
  orbitSize = 60,
  dotSize = 6,
  color = "#00B7FF",
  duration = 8,
  delay = 0,
  className = "",
  style = {},
}: {
  orbitSize?: number;
  dotSize?: number;
  color?: string;
  duration?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      style={{
        width: orbitSize,
        height: orbitSize,
        ...style,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      <div
        className="rounded-full absolute"
        style={{
          width: dotSize,
          height: dotSize,
          backgroundColor: color,
          boxShadow: `0 0 ${dotSize * 2}px ${color}`,
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
    </motion.div>
  );
}

/* ─── Scattered Stars Field ─── */
export function StarField({
  count = 20,
  color = "white",
  className = "",
}: {
  count?: number;
  color?: string;
  className?: string;
}) {
  // Render stars only after client mount to avoid motion.div SSR hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 3,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, mounted]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {mounted && stars.map((s) => (
        <TwinkleStar
          key={s.id}
          size={s.size}
          color={color}
          delay={s.delay}
          duration={s.duration}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Shooting Star ─── */
export function ShootingStar({
  delay = 0,
  duration = 1.5,
  className = "",
  style = {},
}: {
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: 60,
        height: 2,
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, white 100%)",
        borderRadius: 1,
        ...style,
      }}
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: [0, 300], opacity: [0, 1, 1, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 5 + delay * 2,
        ease: "easeOut",
      }}
    />
  );
}
