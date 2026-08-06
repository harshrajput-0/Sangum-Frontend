import SectionHeading from './SectionHeading';
import RoadmapItem, { type RoadmapStatus } from './RoadmapItem';

type Step = {
  status: RoadmapStatus;
  step: number;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  { status: 'done', step: 1, title: 'Planning', description: 'Research, scope, and product definition.' },
  { status: 'done', step: 2, title: 'Product design', description: 'UI/UX design and the design system.' },
  {
    status: 'current',
    step: 3,
    title: 'Frontend & backend development',
    description: 'Building the interface and interactions.',
  },
  { status: 'upcoming', step: 4, title: 'Backend integration', description: 'APIs, real-time features, and data.' },
  { status: 'upcoming', step: 5, title: 'Beta launch', description: 'Early access rollout and feedback.' },
];

// Static fill — reaches through the "current" step. No scroll-linked
// animation, per the brief.
const DONE_COUNT = STEPS.filter((s) => s.status === 'done').length;
const FILL_PERCENT = ((DONE_COUNT + 0.5) / STEPS.length) * 100;

export default function ProgressSection() {
  return (
    <section id="roadmap" className="border-t border-[#313d4d] bg-[#0b0f14] py-16">
      <div className="mx-auto max-w-[1040px] px-6">
        <SectionHeading
          eyebrow="Where we are"
          title="Roadmap"
          description="Building in the open. Here's where things stand."
        />

        <div className="relative mx-auto max-w-[600px]">
          <div className="absolute bottom-2 left-[19px] top-2 w-0.5 bg-[#313d4d]" />
          <div
            className="absolute left-[19px] top-2 w-0.5 bg-gradient-to-b from-[#6d5dfe] to-[#8b7dff]"
            style={{ height: `${FILL_PERCENT}%` }}
          />

          {STEPS.map((s, i) => (
            <RoadmapItem
              key={s.title}
              status={s.status}
              step={s.step}
              title={s.title}
              description={s.description}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}