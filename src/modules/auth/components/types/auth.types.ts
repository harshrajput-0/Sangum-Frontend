// modules/auth/components/types.ts

export type OAuthProvider = "google" | "github" | "linkedin";

export interface LoginFormValues {
  identifier: string; // email or username
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormValues {
  fullName: string;
  username: string;
  email: string;
  password: string;
  agreedToTerms: boolean;
}

export interface AuthStat {
  value: string;
  label: string;
}
