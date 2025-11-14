'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScreenshotShowcaseProps {
  imageSrc: string;
  title: string;
  description: string;
  reverse?: boolean;
  index?: number;
  className?: string;
}

export default function ScreenshotShowcase({
  imageSrc,
  title,
  description,
  reverse = false,
  index = 0,
  className = '',
}: ScreenshotShowcaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 lg:gap-16 ${className}`}
    >
      {/* Screenshot */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: reverse ? -2 : 2 }}
        transition={{ duration: 0.3 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <img
          src={imageSrc}
          alt={title}
          className="h-[500px] md:h-[600px] w-auto max-w-none rounded-3xl shadow-2xl"
        />
      </motion.div>

      {/* Content */}
      <div className="w-full md:w-1/2 space-y-4">
        <motion.h3
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-text"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
          className="text-lg md:text-xl text-secondary-text leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}
