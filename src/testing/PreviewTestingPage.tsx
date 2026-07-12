import { ErrorState } from "@/modules/pages/system/components/ErrorState";

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
    <main className="w-full max-w-screen min-h-screen items-center h-full flex justify-center pb-30" >
<ErrorState variant="crash" code={500} title="Something went wrong" message="..." size="lg" />

    </main>
  )
}

export default PreviewTestingPage