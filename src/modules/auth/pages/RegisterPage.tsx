"use client";

import AuthFormHeader from "@/modules/auth/components/AuthFormHeader";
import RegisterForm from "@/modules/auth/components/RegisterForm";
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



export const RegisterPage = () => {
  return (
    <main className='w-full h-full  p-8 flex items-center justify-center'>
      <div className=" items-center justify-center max-w-[480px] h-full my-auto">

        <AuthFormHeader
          eyebrow="Join Sangum"
          title="Create your"
          description="Join thousands of developers building the future together. It's free and only takes a minute."
        />

        <RegisterForm onSubmit={(values) => { console.log(values) }} />
        <OAuthButtonGroup />

              <p className="text-center text-(length:--fs-sm) text-text-secondary mt-[18px]">
        Already have an account?{" "}
      
          <Link href="/login" className="text-primary-light hover:underline">
          Log in
          </Link>
      </p>

      </div>
    </main>
  )
}