"use client";

import AuthFormHeader from "@/features/auth/components/AuthFormHeader";
import LoginForm from "@/features/auth/components/LoginForm";
import { OAuthButtonGroup } from "../components/OAuthButtonGroup";
import Link from "next/link";

export interface AuthLayoutProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  /** The form itself — LoginForm, RegisterForm, or anything else. */
  children?: React.ReactNode;
  /** Right-side panel content (AuthIllustrationPanel, or your own) — hidden below the lg breakpoint. */
  aside?: React.ReactNode;
  currentPage?: "login" | "register";
  className?: string;
}



export const LoginPage = () => {
  return (
    <main className='w-full h-full  p-8 flex items-center justify-center'>
      <div className="mx-auto br-red p-4 justify-center max-w-[480px] h-full my-auto">

        <AuthFormHeader
          eyebrow="Welcome Back"
          title="Log in to your"
          description="Join thousands of developers building the future together. It's free and only takes a minute."
        />

        <LoginForm 
        onSubmit={(values) => { console.log(values) }} />
          <OAuthButtonGroup />



              <p className="text-center text-(length:--fs-sm) text-text-secondary mt-5">
        Don&apos;t have an account?{" "}
      
          <Link href="/register" className="text-primary-light hover:underline">
          Register
          </Link>
      </p>
      </div>
    </main>
  )
}
