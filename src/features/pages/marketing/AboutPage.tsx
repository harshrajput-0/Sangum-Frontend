'use client';

import { useEffect, useState } from 'react';

export function AboutPage() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const reveal = (delayMs: number): React.HTMLAttributes<HTMLElement> => ({
    className: `transition-all duration-700 ease-out ${
      revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
    }`,
    style: { transitionDelay: `${delayMs}ms` },
  });

  return (
    <div className="max-w-150 mx-auto px-6 py-10 pb-8 mb-14">
      <p
        {...reveal(0)}
        className={`${reveal(0).className} text-xs uppercase tracking-wider font-semibold text-text-disabled mb-6`}
      >
        About
      </p>

      <p
        {...reveal(0)}
        className={`${reveal(0).className} font-heading text-2xl sm:text-3xl font-semibold text-text mb-8 leading-snug`}
      >
        Hi — I&apos;m the person building Sangum.
      </p>

      <p
        {...reveal(75)}
        className={`${reveal(75).className} font-heading text-lg leading-relaxed text-text-secondary mb-5`}
      >
        Most &quot;community&quot; apps end up feeling like broadcast channels in a
        friendlier coat of paint. Feeds you scroll past, not places you
        actually show up to.
      </p>

      <p
        {...reveal(150)}
        className={`${reveal(150).className} font-heading text-lg leading-relaxed text-text-secondary mb-5`}
      >
        I wanted something different, so instead of waiting for someone to
        build it, <strong className="text-text font-semibold">I started building it myself.</strong>
      </p>

      <div {...reveal(200)} className={`${reveal(200).className} w-8 h-px bg-border-strong my-8`} />

      <p
        {...reveal(250)}
        className={`${reveal(250).className} font-heading text-lg leading-relaxed text-text-secondary mb-5`}
      >
        Sangum isn&apos;t a startup. There&apos;s no funding, no team, no
        growth targets to hit. It&apos;s just one person, working on it
        steadily, in the open.
      </p>

      <p
        {...reveal(325)}
        className={`${reveal(325).className} font-heading text-lg leading-relaxed text-text-secondary mb-5`}
      >
        Right now, accounts and sign-in are live. Communities, posts, chat,
        and notifications are being built next — piece by piece, not all at
        once.
      </p>

      <p
        {...reveal(400)}
        className={`${reveal(400).className} font-heading text-lg leading-relaxed text-text-secondary mb-5`}
      >
        It&apos;s not finished, and that&apos;s on purpose. It&apos;s built
        one working piece at a time, out in the open.
      </p>

      <div {...reveal(475)} className={`${reveal(475).className} font-heading text-base text-text mt-10`}>
        Thanks for reading.
        <span className="block text-sm text-text-muted mt-1 font-sans">
          — built solo, still growing
        </span>
      </div>
    </div>
  );
}