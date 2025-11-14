'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GradientShimmerProps {
  className?: string;
}

export default function GradientShimmer({ className = '' }: GradientShimmerProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/30 rounded-full filter blur-3xl" />
      </motion.div>
    </div>
  );
}
