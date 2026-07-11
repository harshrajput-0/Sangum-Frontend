import AuthFormHeader from "@/modules/auth/components/AuthFormHeader";
import { OAuthButtonGroup } from "@/modules/auth/components/OAuthButtonGroup";
import LgoinForm from "@/modules/auth/components/LoginForm";
import { Link } from "react-router-dom";


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
      <div className="mx-auto br-red p-4 justify-center max-w-[480px] h-full my-auto">

        <AuthFormHeader
          eyebrow="Welcome Back"
          title="Log in to your"
          description="Join thousands of developers building the future together. It's free and only takes a minute."
        />

        <LgoinForm onSubmit={(values) => { console.log(values) }} />
          <OAuthButtonGroup />

              <p className="text-center text-[length:var(--fs-sm)] text-[var(--text-secondary)] mt-5">
        Don't have an account?{" "}
      
          <Link to="/register" className="text-[var(--primary-light)] hover:underline">
          Register
          </Link>
      </p>
      </div>
    </main>
  )
}

export default PreviewTestingPage