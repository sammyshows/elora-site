'use client';

import React from 'react';
import Image from 'next/image';
import { StoreBadges } from './StoreBadges';

/**
 * App screenshot showcase for the guided finale: store buttons side by side
 * above the shots, then the three product screenshots in order (build,
 * never-stare, daily-patterns). On mobile only never-stare is shown — the
 * others are hidden below the tablet breakpoint.
 */
export function ScreenshotShowcase() {
  const shots = [
    { src: '/screenshots/build.jpg', alt: 'Elora reflection in the Elora app', className: 'hidden md:block' },
    { src: '/screenshots/never-stare.jpg', alt: 'Elora in the Elora app', className: '' },
    { src: '/screenshots/daily-patterns.jpg', alt: 'Daily patterns in the Elora app', className: 'hidden md:block' },
  ];

  return (
    <section className="flex flex-col gap-6">
      {/* Store buttons — side by side above the shots */}
      <StoreBadges />

      {/* Screenshots — build, never-stare, daily-patterns */}
      <div className="flex items-start justify-center gap-4 sm:gap-6">
        {shots.map((shot) => (
          <Image
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            width={1290}
            height={2796}
            className={`h-auto w-2/3 sm:w-1/3 rounded-2xl shadow-2xl ${shot.className}`}
            unoptimized
          />
        ))}
      </div>
    </section>
  );
}