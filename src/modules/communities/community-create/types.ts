export interface CategoryOption {
  id: string;
  label: string;
}

export interface SelectOption {
  id: string;
  label: string;
}

export interface BasicInfoValue {
  name: string;
  slug: string;
  tagline: string;
  description: string;
}

export interface CategoryTopicsValue {
  categoryId: string;
  topics: string[];
}

export interface CreateSettingsValue {
  whoCanJoin: string;
  whoCanPost: string;
  requireApproval: boolean;
}