import type { ResourceType } from '../../types';

export interface ResourceDraft {
  title: string;
  type: ResourceType;
  community: string;
  description: string;
  link: string;
  tags: string;
  thumbnailFile: File | null;
  agreedToGuidelines: boolean;
}

export const DEFAULT_RESOURCE_DRAFT: ResourceDraft = {
  title: '',
  type: 'Article',
  community: 'None',
  description: '',
  link: '',
  tags: '',
  thumbnailFile: null,
  agreedToGuidelines: false,
};