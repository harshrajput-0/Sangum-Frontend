'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/components/ui';

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="bg-glow flex min-h-screen flex-col">
      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 py-16 text-center">
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-heading text-[280px] font-extrabold leading-none text-text opacity-[0.03] sm:text-[380px]"
          aria-hidden="true"
        >
          404
        </span>

        <div className="relative w-full max-w-md">
          <span className="mb-2 block bg-linear-to-r from-primary-hover to-accent bg-clip-text font-heading text-6xl font-extrabold text-transparent sm:text-7xl">
            404
          </span>
          <h1 className="mb-2 text-xl font-semibold text-text sm:text-2xl">Page not found</h1>
          <p className="mb-7 text-sm leading-relaxed text-text-secondary">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Button href="/" variant="primary" size="lg" iconLeft={<Home size={15} />}>
              Go Home
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconLeft={<ArrowLeft size={15} />}
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </div>

          <p className="mt-6 text-xs text-text-muted">
            Think this is a mistake?{' '}
            <Link href="/contact" className="cursor-pointer font-medium text-primary-light hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </main>
    </section>
  );
}