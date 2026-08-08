"use client";

import React, { useEffect, useRef, useState } from "react";
import SectionHeading from "./landing/SectionHeading";

type StepStatus = "done" | "active" | "upcoming";

interface Step {
  label: string;
  status: StepStatus;
  description: string;
}

const steps: Step[] = [
  {
    label: "Planning",
    status: "done",
    description: "Research, scope, and product definition.",
  },
  {
    label: "Product Design",
    status: "done",
    description: "UI/UX design and design system.",
  },
  {
    label: "Frontend and Backend Development",
    status: "active",
    description: "Building the interface and interactions.",
  },
  {
    label: "Backend Integration",
    status: "upcoming",
    description: "APIs, real-time features, and data.",
  },
  {
    label: "Beta Launch",
    status: "upcoming",
    description: "Early access rollout and feedback.",
  },
];

const StepIcon: React.FC<{ status: StepStatus; index: number }> = ({ status, index }) => {
  if (status === "done") {
    return (
      <div className="w-9 h-9 rounded-full flex items-center justify-center bg-primary border-2 border-primary shrink-0">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    );
  }
  if (status === "active") {
    return (
      <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-primary bg-surface shrink-0 relative">
        {/* ambient ring pulse behind the dot */}
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse relative" />
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-border bg-surface shrink-0">
      <span className="text-xs text-text-muted font-medium">{index + 1}</span>
    </div>
  );
};

/**
 * Wraps a single step. Fades/slides in the first time it enters the
 * viewport, then "draws" its connector line down to the next step over a
 * short duration. Falls back to an instant, fully-drawn state if the user
 * prefers reduced motion.
 */
const RevealStep: React.FC<{
  step: Step;
  index: number;
  isLast: boolean;
}> = ({ step, index, isLast }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) {
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
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      className="flex gap-5 transition-all ease-out"
      style={{
        transitionDuration: reduceMotion ? "0ms" : "600ms",
        transitionDelay: reduceMotion ? "0ms" : `${index * 90}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
      }}
    >
      {/* Left column: icon + connector */}
      <div className="flex flex-col items-center">
        <div
          className="transition-transform ease-out"
          style={{
            transitionDuration: reduceMotion ? "0ms" : "500ms",
            transitionDelay: reduceMotion ? "0ms" : `${index * 90 + 120}ms`,
            transform: visible ? "scale(1)" : "scale(0.6)",
          }}
        >
          <StepIcon status={step.status} index={index} />
        </div>
        {!isLast && (
          <div
            className={`w-px flex-1 my-1 origin-top transition-transform ease-out ${
              step.status === "done" ? "bg-primary/50" : "bg-border"
            }`}
            style={{
              minHeight: "2rem",
              transitionDuration: reduceMotion ? "0ms" : "500ms",
              transitionDelay: reduceMotion ? "0ms" : `${index * 90 + 250}ms`,
              transform: visible ? "scaleY(1)" : "scaleY(0)",
            }}
          />
        )}
      </div>

      {/* Right column: content */}
      <div className={`pb-8 flex-1 ${isLast ? "pb-0" : ""}`}>
        <div className="flex items-center gap-3 mb-1">
          <span
            className={`text-base font-semibold ${
              step.status === "upcoming" ? "text-text-muted" : "text-text"
            }`}
          >
            {step.label}
          </span>
          {step.status === "done" && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-accent font-medium">
              Completed
            </span>
          )}
          {step.status === "active" && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 border border-primary/30 text-primary font-medium">
              In Progress
            </span>
          )}
          {step.status === "upcoming" && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-surface border border-border text-text-muted">
              Upcoming
            </span>
          )}
        </div>
        <p className="text-sm text-text-muted">{step.description}</p>
      </div>
    </div>
  );
};

export const Progress: React.FC = () => {
  return (
    <section id="progress" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
 
        <SectionHeading
          eyebrow="Where we are"
          title="Roadmap"
          description="We're building in the open. Here's where things stand."
          className="mb-8"
        />
        {/* Steps */}
        <div className="relative">
          {steps.map((step, i) => (
            <RevealStep key={step.label} step={step} index={i} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};