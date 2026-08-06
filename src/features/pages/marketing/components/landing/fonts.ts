/**
 * Shared font stacks for the Sangum landing page.
 *
 * Load the real fonts once in app/layout.tsx with next/font and expose them
 * as CSS variables:
 *
 *   import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
 *   const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
 *   const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-heading' });
 *   // <body className={`${inter.variable} ${jakarta.variable}`}>
 *
 * Until that's wired up, these stacks fall back to system fonts.
 */
export const FONT_SANS =
  'var(--font-sans), Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const FONT_HEADING = `var(--font-heading), "Plus Jakarta Sans", ${FONT_SANS}`;