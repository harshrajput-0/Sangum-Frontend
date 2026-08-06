export interface Community {
  id: string;
  name?: string;
  colorToken?: string;
  initial?: string;
  memberLabel?: string;
  [key: string]: unknown;
}