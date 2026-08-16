// Live-sanitizes username input as the user types — the authoritative
// format check still happens in validation/onboardingWizard.schema.ts.
export function slugifyUsername(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9_.-]/g, '');
}
