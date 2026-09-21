'use client';

import React from 'react';
import Image from 'next/image';

const APP_STORE_URL = 'https://apps.apple.com/au/app/elora-journal-with-insight/id6753067869';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.elora.ai';

/**
 * Classic store download badges (App Store + Google Play) with their official
 * logos — used on the guided finale and the quota showcase.
 */
export function StoreBadges({ layout = 'row' }: { layout?: 'row' | 'stacked' }) {
  const className =
    layout === 'stacked'
      ? 'flex flex-col items-center justify-center gap-3'
      : 'flex flex-col items-center justify-center gap-3 sm:flex-row';

  return (
    <div className={className}>
      <a href={APP_STORE_URL} target="_blank" rel="noreferrer" aria-label="Download on the App Store">
        <Image
          src="/app-store-badge.svg"
          alt="Download on the App Store"
          width={120}
          height={40}
          className="h-auto w-[172px]"
          unoptimized
          priority
        />
      </a>
      <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer" aria-label="Get it on Google Play">
        <Image
          src="/play-store-badge.svg"
          alt="Get it on Google Play"
          width={135}
          height={40}
          className="h-auto w-[172px]"
          unoptimized
          priority
        />
      </a>
    </div>
  );
}