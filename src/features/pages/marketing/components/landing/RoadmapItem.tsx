import { Check } from 'lucide-react';
import { FONT_HEADING } from './fonts';

export type RoadmapStatus = 'done' | 'current' | 'upcoming';

type RoadmapItemProps = {
  status: RoadmapStatus;
  step: number;
  title: string;
  description: string;
  isLast?: boolean;
};

const BADGE_STYLES: Record<RoadmapStatus, { label: string; className: string }> = {
  done: {
    label: 'Completed',
    className: 'text-[#39BFBF] bg-[rgba(57,191,191,0.1)] border-[rgba(57,191,191,0.35)]',
  },
  current: {
    label: 'In progress',
    className: 'text-[#8b7dff] bg-[rgba(109,93,254,0.12)] border-[rgba(109,93,254,0.4)]',
  },
  upcoming: {
    label: 'Upcoming',
    className: 'text-[#94a3b8] bg-transparent border-[#445266]',
  },
};

export default function RoadmapItem({
  status,
  step,
  title,
  description,
  isLast = false,
}: RoadmapItemProps) {
  const badge = BADGE_STYLES[status];

  return (
    <div className={`relative pl-12 ${isLast ? 'pb-0' : 'pb-8'}`}>
      {/* node */}
      <div
        className={`absolute left-0 top-0 z-[1] flex h-10 w-10 items-center justify-center rounded-full border-2 text-[13px] font-bold ${
          status === 'done'
            ? 'border-[#6d5dfe] bg-[#6d5dfe] text-white'
            : status === 'current'
              ? 'border-[#6d5dfe] bg-[#171d25] text-[#8b7dff]'
              : 'border-[#445266] bg-[#171d25] text-[#94a3b8]'
        }`}
        style={{ fontFamily: FONT_HEADING }}
      >
        {status === 'done' ? (
          <Check className="h-4 w-4" strokeWidth={3} />
        ) : status === 'current' ? (
          <span className="h-2 w-2 rounded-full bg-[#6d5dfe]" />
        ) : (
          step
        )}
      </div>

      <div className="mb-1.5 flex flex-wrap items-center gap-3 pt-2">
        <h3 className="text-base font-bold text-[#f8fafc]" style={{ fontFamily: FONT_HEADING }}>
          {title}
        </h3>
        <span
          className={`rounded-full border px-2.5 py-[3px] text-[11px] font-bold tracking-[0.02em] ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>
      <p className="text-sm leading-[1.6] text-[#94a3b8]">{description}</p>
    </div>
  );
}