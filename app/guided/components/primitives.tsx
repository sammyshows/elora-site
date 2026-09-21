'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Framer Motion renderings of the mobile Reanimated curves.
 *
 * Reanimated → Framer:
 *   Easing.out(Easing.cubic) ≈ cubic-bezier(0.215, 0.61, 0.355, 1)  (easeOutCubic)
 *   Easing.inOut(Easing.quad) ≈ cubic-bezier(0.455, 0.03, 0.515, 0.955) (easeInOutQuad)
 *   spring(friction 9,  tension 70) ≈ spring(stiffness 70, damping 14)
 *   spring(friction 5,  tension 40) ≈ spring(stiffness 120, damping 8)  (bouncy overshoot)
 *   spring(friction 8,  tension 34) ≈ spring(stiffness 100, damping 10)
 */

export type Bezier = [number, number, number, number];

export const EASE_OUT_CUBIC: Bezier = [0.215, 0.61, 0.355, 1];
export const EASE_INOUT_QUAD: Bezier = [0.455, 0.03, 0.515, 0.955];
export const EASE_INOUT_CUBIC: Bezier = [0.65, 0.05, 0.36, 1];

type CSS = React.CSSProperties;

/** Fade + slide-up-in block — the mobile `FadeUp`. */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.34,
  y = 16,
  ease = EASE_OUT_CUBIC,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  ease?: Bezier;
  className?: string;
  style?: CSS;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'tween', duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Press-scale wrapper mirroring the mobile `PressableScale` (spring to 0.97). */
export function PressableScale({
  children,
  onTap,
  className,
  style,
  radius = 26,
}: {
  children: React.ReactNode;
  onTap?: () => void;
  className?: string;
  style?: CSS;
  radius?: number;
}) {
  return (
    <motion.div
      className={className}
      style={{ ...style, borderRadius: radius }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      onTap={() => onTap?.()}
    >
      {children}
    </motion.div>
  );
}

/** Bouncy scale-pop — used for the follow-up prompt arrival. */
export function SpringPop({
  children,
  spring = { stiffness: 120, damping: 8 },
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  spring?: { stiffness: number; damping: number };
  delay?: number;
  className?: string;
  style?: CSS;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: spring.stiffness, damping: spring.damping, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Entrance for the reflection card: fade + slide per journal-entry.tsx. */
export function CardEntrance({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: CSS;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'tween', duration: 0.5, ease: EASE_OUT_CUBIC, delay }}
    >
      {children}
    </motion.div>
  );
}