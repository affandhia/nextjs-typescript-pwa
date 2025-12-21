import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from 'next/constants';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.ENV === 'development' ? '/dev' : '',
  // Provide an empty turbopack config to avoid Turbopack/webpack conflict error
  turbopack: {},
};

export default (phase: string) => {
  if (
    // disable PWA in development mode (PHASE_DEVELOPMENT_SERVER) to allow `next dev --turbopack`
    phase === PHASE_DEVELOPMENT_SERVER ||
    phase === PHASE_PRODUCTION_BUILD
  ) {
    const withPWA = require('@ducanh2912/next-pwa').default({
      dest: 'public',
      cacheOnFrontEndNav: true,
      aggressiveFrontEndNavCaching: true,
      reloadOnOnline: true,
      swcMinify: true,
      disable: process.env.NODE_ENV === 'development',
      workboxOptions: {
        disableDevLogs: true,
      },
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};
