'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TimelineCardProps {
  date: string;
  title: string;
  content: string;
  mood?: string;
  position?: 'left' | 'right';
  index?: number;
  className?: string;
}

export default function TimelineCard({
  date,
  title,
  content,
  mood,
  position = 'left',
  index = 0,
  className = '',
}: TimelineCardProps) {
  const isLeft = position === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex items-center gap-4 md:gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'} ${className}`}
    >
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
          className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50"
        />
        {index !== 4 && (
          <div className="w-0.5 h-24 md:h-32 bg-gradient-to-b from-primary to-secondary/30 mt-2" />
        )}
      </div>

      {/* Card content */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`flex-1 bg-surface p-5 md:p-6 rounded-2xl border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 ${isLeft ? 'text-left' : 'text-right'}`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted font-medium">{date}</span>
          {mood && (
            <span className="text-2xl">{mood}</span>
          )}
        </div>

        <h4 className="text-lg md:text-xl font-bold text-text mb-2">
          {title}
        </h4>

        <p className="text-secondary-text text-sm md:text-base leading-relaxed">
          {content}
        </p>
      </motion.div>
    </motion.div>
  );
}
