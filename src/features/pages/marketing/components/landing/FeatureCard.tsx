import type { LucideIcon } from 'lucide-react';
import { FONT_HEADING } from './fonts';

export type FeatureCardColor = 'violet' | 'teal' | 'blue';

const ICON_STYLES: Record<FeatureCardColor, { bg: string; color: string }> = {
  violet: { bg: 'rgba(109,93,254,0.14)', color: '#8b7dff' },
  teal: { bg: 'rgba(57,191,191,0.14)', color: '#39BFBF' },
  blue: { bg: 'rgba(79,140,255,0.14)', color: '#7fb0ff' },
};

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: FeatureCardColor;
};

export default function FeatureCard({ icon: Icon, title, description, color }: FeatureCardProps) {
  const iconStyle = ICON_STYLES[color];

  return (
    <div
      className="rounded-[14px] border border-white/[0.08] p-6 transition-[transform,border-color,background] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[3px] hover:border-white/[0.16]"
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.015) 100%)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      <div
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px]"
        style={{ background: iconStyle.bg, color: iconStyle.color }}
      >
        <Icon className="h-[19px] w-[19px]" strokeWidth={2} />
      </div>
      <h3
        className="mb-2 text-base font-bold text-[#f8fafc]"
        style={{ fontFamily: FONT_HEADING }}
      >
        {title}
      </h3>
      <p className="text-sm leading-[1.6] text-[#94a3b8]">{description}</p>
    </div>
  );
}