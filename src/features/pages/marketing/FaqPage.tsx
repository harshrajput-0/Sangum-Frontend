'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Sangum — FAQ page
 *
 * Drop this in `app/faq/page.tsx`. Tailwind handles all layout/spacing;
 * lucide-react replaces the inline chevron SVGs.
 *
 * Fonts: the original design uses "Inter" (body) and "Plus Jakarta Sans"
 * (headings). Load them in app/layout.tsx with next/font and expose them
 * as CSS variables, e.g.:
 *
 *   import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
 *   const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
 *   const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-heading' });
 *   // then on <html> or <body>: className={`${inter.variable} ${jakarta.variable}`}
 *
 * Until then, this file falls back to system fonts so it renders correctly
 * on its own.
 */

const FONT_SANS =
    'var(--font-sans), Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const FONT_HEADING = 'var(--font-heading), "Plus Jakarta Sans", ' + FONT_SANS;

type FaqItem = { question: string; answer: string };
type FaqGroup = { title: string; items: FaqItem[] };

const FAQ_GROUPS: FaqGroup[] = [
    {
        title: 'Getting started',
        items: [
            {
                question: 'What is Sangum, exactly?',
                answer:
                    'Sangum is a single platform that brings together structured discussions, professional networking, collaborative communities, and educational resources — the useful parts of a forum, a network, and a course site, without needing separate apps for each.',
            },
            {
                question: 'Is Sangum free to use?',
                answer:
                    "Sangum will launch with a free tier covering core community and networking features. We'll share pricing details for any paid plans closer to the beta launch.",
            },
            {
                question: 'When can I start using it?',
                answer:
                    "We're currently in active development. Joining the waitlist puts you in line for early access ahead of the public beta launch.",
            },
        ],
    },
    {
        title: 'Communities & content',
        items: [
            {
                question: 'Can I create my own community?',
                answer:
                    'Yes. Any member will be able to start a community around a shared interest or area of expertise, set its structure, and invite others to contribute.',
            },
            {
                question: 'How is this different from a regular forum?',
                answer:
                    'Discussions are organized by topic instead of a single chronological feed, so conversations stay easy to find later instead of getting buried the next day.',
            },
            {
                question: "Can I share courses or guides I've made?",
                answer:
                    'Yes. Educational resources are a core part of Sangum — members can publish guides and materials for others in their communities to learn from.',
            },
        ],
    },
    {
        title: 'Account & privacy',
        items: [
            {
                question: 'Do I need an invite to join the waitlist?',
                answer:
                    "No invite needed — anyone can join the waitlist with just an email address. We'll notify you when early access opens up.",
            },
            {
                question: 'How is my data handled?',
                answer:
                    'We only use your email to notify you about early access and product updates. Full privacy details will be published alongside the beta launch.',
            },
            {
                question: 'Can I delete my account later?',
                answer:
                    'Yes, account deletion will be available directly from your settings once the platform launches, with no need to contact support.',
            },
        ],
    },
];

/* ------------------------------------------------------------------ */
/* Scroll-triggered fade/slide-up wrapper (mirrors the .reveal class)  */
/* ------------------------------------------------------------------ */

function Reveal({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setVisible(true);
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4.5'
                } ${className}`}
        >
            {children}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Ambient background: fixed grid + animated node network + fade       */
/* ------------------------------------------------------------------ */

function NetworkCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        type Node = {
            x: number;
            y: number;
            tx: number;
            ty: number;
            vx: number;
            vy: number;
            r: number;
            color: string;
            born: number;
            spawned: boolean;
            settleSpeed: number;
            isOrigin?: boolean;
        };

        let w = 0;
        let h = 0;
        let dpr = 1;
        let t = 0;
        let raf = 0;
        let nodes: Node[] = [];

        const MAX_NODES = 46;
        const COLORS = ['#6d5dfe', '#4f8cff', '#39BFBF'];

        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas!.width = w * dpr;
            canvas!.height = h * dpr;
            ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        // function resize() {
        //   dpr = Math.min(window.devicePixelRatio || 1, 2);
        //   w = canvas!.clientWidth = window.innerWidth;
        //   h = canvas!.clientHeight = window.innerHeight;
        //   canvas!.width = w * dpr;
        //   canvas!.height = h * dpr;
        //   ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
        // }

        function makeNode(delay: number): Node {
            const cx = w / 2;
            const cy = h * 0.42;
            const angle = Math.random() * Math.PI * 2;
            const dist = 60 + Math.random() * Math.min(w, h) * 0.48;
            return {
                x: cx + Math.cos(angle) * dist * 0.15,
                y: cy + Math.sin(angle) * dist * 0.15,
                tx: cx + Math.cos(angle) * dist,
                ty: cy + Math.sin(angle) * dist,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                r: 1.6 + Math.random() * 2.4,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                born: delay,
                spawned: false,
                settleSpeed: 0.02 + Math.random() * 0.02,
            };
        }

        function init() {
            resize();
            nodes = [];
            nodes.push({
                x: w / 2,
                y: h * 0.42,
                tx: w / 2,
                ty: h * 0.42,
                vx: 0,
                vy: 0,
                r: 3.6,
                color: '#8b7dff',
                born: 0,
                spawned: true,
                settleSpeed: 1,
                isOrigin: true,
            });
            for (let i = 1; i < MAX_NODES; i++) nodes.push(makeNode(200 + i * 70));
        }

        function draw(active: Node[]) {
            ctx!.clearRect(0, 0, w, h);
            for (let i = 0; i < active.length; i++) {
                for (let j = i + 1; j < active.length; j++) {
                    const a = active[i];
                    const b = active[j];
                    const dist = Math.hypot(a.x - b.x, a.y - b.y);
                    const isFromOrigin = a.isOrigin || b.isOrigin;
                    const limit = isFromOrigin ? 999 : 100;
                    if (dist < limit) {
                        const alpha = isFromOrigin ? 0.22 : Math.max(0, 0.14 - dist / 900);
                        if (alpha <= 0) continue;
                        ctx!.beginPath();
                        ctx!.moveTo(a.x, a.y);
                        ctx!.lineTo(b.x, b.y);
                        ctx!.strokeStyle = `rgba(109,93,254,${alpha})`;
                        ctx!.lineWidth = isFromOrigin ? 0.6 : 0.5;
                        ctx!.stroke();
                    }
                }
            }
            active.forEach((n) => {
                const age = Math.min(1, (t - n.born) / 500);
                ctx!.beginPath();
                ctx!.arc(n.x, n.y, n.r * (n.isOrigin ? 1 : age), 0, Math.PI * 2);
                ctx!.fillStyle = n.color;
                ctx!.globalAlpha = n.isOrigin ? 1 : 0.85 * age;
                ctx!.fill();
                ctx!.globalAlpha = 1;
            });
        }

        function step() {
            t += 16;
            nodes.forEach((n) => {
                if (!n.spawned && t >= n.born) n.spawned = true;
                if (!n.spawned || n.isOrigin) return;
                n.x += (n.tx - n.x) * n.settleSpeed;
                n.y += (n.ty - n.y) * n.settleSpeed;
                n.x += n.vx;
                n.y += n.vy;
                n.tx += n.vx;
                n.ty += n.vy;
                const cx = w / 2;
                const cy = h * 0.42;
                const d = Math.hypot(n.x - cx, n.y - cy);
                const maxD = Math.min(w, h) * 0.5;
                if (d > maxD) {
                    n.vx *= -1;
                    n.vy *= -1;
                }
            });
            draw(nodes.filter((n) => n.spawned));
            raf = requestAnimationFrame(step);
        }

        function handleResize() {
            resize();
        }

        init();
        if (!reduceMotion) {
            raf = requestAnimationFrame(step);
        } else {
            nodes.forEach((n) => {
                n.spawned = true;
                n.x = n.tx;
                n.y = n.ty;
            });
            draw(nodes);
        }

        window.addEventListener('resize', handleResize);

        let ro: ResizeObserver | undefined;
        let lastW = w;
        let lastH = h;
        if (typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver(() => {
                const newW = window.innerWidth;
                const newH = window.innerHeight;
                if (Math.abs(newW - lastW) > 1 || Math.abs(newH - lastH) > 1) {
                    lastW = newW;
                    lastH = newH;
                    init();
                    if (reduceMotion) {
                        nodes.forEach((n) => {
                            n.spawned = true;
                            n.x = n.tx;
                            n.y = n.ty;
                        });
                        draw(nodes);
                    }
                }
            });
            ro.observe(document.documentElement);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            if (raf) cancelAnimationFrame(raf);
            ro?.disconnect();
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />;
}

function SiteBackdrop() {
    return (
        <div
            className="fixed inset-0 z-0 overflow-hidden bg-dbg pointer-events-none"
            aria-hidden="true"
        >
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '44px 44px',
                    WebkitMaskImage:
                        'radial-gradient(ellipse 70% 60% at 50% 38%, black 25%, transparent 78%)',
                    maskImage: 'radial-gradient(ellipse 70% 60% at 50% 38%, black 25%, transparent 78%)',
                }}
            />
            <NetworkCanvas />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse 70% 70% at 50% 42%, rgba(11,15,20,0.1) 0%, rgba(11,15,20,0.92) 88%)',
                }}
            />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* FAQ accordion item                                                   */
/* ------------------------------------------------------------------ */

function FaqRow({
    item,
    isOpen,
    onToggle,
}: {
    item: FaqItem;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="border-b border-dborder first:border-t first:border-t-dborder">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent px-0.5 py-4.5 text-left text-md font-semibold text-dtext"
                style={{ fontFamily: FONT_HEADING }}
            >
                <span>{item.question}</span>
                <ChevronDown
                    className={`h-4.5 w-4.5 flex-none transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'rotate-180 text-[#39BFBF]' : 'text-dtext-muted'
                        }`}
                />
            </button>
            <div
                className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
                <div className="overflow-hidden">
                    <div className="px-0.5 pb-4.5 text-sm leading-[1.65] text-dtext-muted">
                        {item.answer}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                                  */
/* ------------------------------------------------------------------ */

export default function FaqPage() {
    // Only one FAQ item open at a time, page-wide — mirrors the original
    // behaviour. The very first item starts open.
    const [openId, setOpenId] = useState<string | null>('0-0');

    return (
        <div
            className="min-h-screen bg-dbg text-dtext antialiased"
            style={{ fontFamily: FONT_SANS }}
        >
            <SiteBackdrop />

            <section className="relative z-10 py-16">
                <div className="mx-auto max-w-170 px-6">
                    <Reveal className="mx-auto mb-10 max-w-155 text-center">
                        <div className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#39BFBF]">
                            Need to know
                        </div>
                        <h2
                            className="mb-3 text-[clamp(24px,3.6vw,34px)] font-bold leading-[1.2] tracking-[-0.015em]"
                            style={{ fontFamily: FONT_HEADING }}
                        >
                            Frequently asked questions
                        </h2>
                        <p className="text-base leading-[1.6] text-dtext-muted">
                            Everything you might want to know before joining. Can&apos;t find your answer?{' '}
                            <a href="#" className="text-[#8b7dff] no-underline hover:text-[#39BFBF]">
                                Reach out to us
                            </a>
                            .
                        </p>
                    </Reveal>

                    {FAQ_GROUPS.map((group, gi) => (
                        <Reveal key={group.title} className="mb-10 last:mb-0">
                            <h3
                                className="mb-2 text-[13px] font-bold uppercase tracking-[0.06em] text-[#39BFBF]"
                                style={{ fontFamily: FONT_HEADING }}
                            >
                                {group.title}
                            </h3>
                            <div>
                                {group.items.map((item, ii) => {
                                    const id = `${gi}-${ii}`;
                                    return (
                                        <FaqRow
                                            key={id}
                                            item={item}
                                            isOpen={openId === id}
                                            onToggle={() => setOpenId((prev) => (prev === id ? null : id))}
                                        />
                                    );
                                })}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>
    );
}