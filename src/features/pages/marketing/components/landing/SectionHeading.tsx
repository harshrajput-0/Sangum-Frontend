import { FONT_HEADING } from './fonts';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`mx-auto mb-10 max-w-[620px] text-center ${className}`}>
      <div className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#39BFBF]">
        {eyebrow}
      </div>
      <h2
        className="mb-3 text-[clamp(24px,3.6vw,34px)] font-bold leading-[1.2] tracking-[-0.015em] text-[#f8fafc]"
        style={{ fontFamily: FONT_HEADING }}
      >
        {title}
      </h2>
      <p className="text-base leading-[1.6] text-[#94a3b8]">{description}</p>
    </div>
  );
}