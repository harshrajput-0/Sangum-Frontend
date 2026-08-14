/**
 * Set NEXT_PUBLIC_API_URL=https://sangum.onrender.com/api/v1 in your
 * production environment. Falls back to the documented local dev
 * server so this works out of the box during development.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";