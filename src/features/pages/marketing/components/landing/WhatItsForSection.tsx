import { BookOpen, MessageSquare, Share2, Users, Zap } from 'lucide-react';
import SectionHeading from './SectionHeading';
import FeatureCard, { type FeatureCardColor } from './FeatureCard';

type Feature = {
  icon: typeof MessageSquare;
  title: string;
  description: string;
  color: FeatureCardColor;
};

const FEATURES: Feature[] = [
  {
    icon: MessageSquare,
    title: 'Structured discussions',
    description: 'Threads organized by topic, not buried in a chronological feed.',
    color: 'violet',
  },
  {
    icon: Share2,
    title: 'Professional networking',
    description: 'Find people through what they know and build, not just who they follow.',
    color: 'teal',
  },
  {
    icon: Users,
    title: 'Collaborative communities',
    description: 'Spaces built around shared interests and expertise, not follower counts.',
    color: 'blue',
  },
  {
    icon: BookOpen,
    title: 'Educational resources',
    description: "Knowledge shared by people who've actually done the thing.",
    color: 'violet',
  },
  {
    icon: Zap,
    title: 'Real-time interaction',
    description: 'Conversation that happens when it happens, not hours later in a comment thread.',
    color: 'teal',
  },
];

export default function WhatItsForSection() {
  return (
    <section id="features" className="border-t border-dborder py-16">
      <div className="mx-auto max-w-260 px-6">
        <SectionHeading
          eyebrow="What it's for"
          title="Everything a community actually needs"
          description="Five pieces, working together instead of five separate apps."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}