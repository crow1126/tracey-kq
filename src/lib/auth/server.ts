import { createNeonAuth } from '@neon/auth/next/server';

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL || 'https://auth.neon.tech',
  cookies: {
    secret:
      process.env.NEON_AUTH_COOKIE_SECRET ||
      'tracey-kuukua-quansah-secret-session-key-32-chars-long!',
  },
});
