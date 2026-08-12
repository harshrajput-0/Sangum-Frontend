import type { Community } from '../types/community.types';

/**
 * TODO(api): swap for the real Community feature once it exists
 * (likely GET /api/communities/mine or a picker-specific endpoint).
 * Mocked here — matching the reference mockup's three communities —
 * so the "Post to" picker works today.
 */
const MOCK_COMMUNITIES: Community[] = [
  { id: 'mern-developers', name: 'MERN Developers', colorToken: 'bg-success', initial: 'N', memberLabel: 'Public · 24.8K members' },
  { id: 'system-design-hub', name: 'System Design Hub', colorToken: 'bg-info', initial: 'S', memberLabel: 'Public · 12.3K members' },
  { id: 'frontend-wizards', name: 'Frontend Wizards', colorToken: 'bg-danger', initial: 'F', memberLabel: 'Public · 8.7K members' },
];

export async function getCommunitiesForPicker(): Promise<Community[]> {
  return Promise.resolve(MOCK_COMMUNITIES);
}