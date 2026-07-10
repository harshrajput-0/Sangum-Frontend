import AuthFormHeader from "@/modules/auth/components/AuthFormHeader";
import RegisterForm from "@/modules/auth/components/RegisterFrom";


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



const PreviewTestingPage = () => {
  return (
    <main className='w-full h-full  p-8 flex items-center justify-center'>
      <div className=" items-center justify-center max-w-xl h-full my-auto">
 
<AuthFormHeader 
eyebrow="Join Sangum"
title="Create your sangum account"
description="Join thousands of developers building the future together. It's free and only takes a minute."
/>

<RegisterForm onSubmit={() => {}} />


      </div>
    </main>
  )
}

export default PreviewTestingPage