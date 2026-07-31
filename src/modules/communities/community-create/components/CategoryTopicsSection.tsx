"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Card, FormField } from "@/modules/communities/shared/components/ui";
import { CategoryOption, CategoryTopicsValue } from "../types";

interface CategoryTopicsSectionProps {
  categories: CategoryOption[];
  value: CategoryTopicsValue;
  onChange: (value: CategoryTopicsValue) => void;
  maxTopics?: number;
}

export function CategoryTopicsSection({
  categories,
  value,
  onChange,
  maxTopics = 5,
}: CategoryTopicsSectionProps) {
  const [topicInput, setTopicInput] = useState("");

  const addTopic = () => {
    const trimmed = topicInput.trim();
    if (!trimmed || value.topics.length >= maxTopics || value.topics.includes(trimmed)) return;
    onChange({ ...value, topics: [...value.topics, trimmed] });
    setTopicInput("");
  };

  const removeTopic = (topic: string) => {
    onChange({ ...value, topics: value.topics.filter((t) => t !== topic) });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTopic();
    }
  };

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary-light">
          2
        </span>
        <span className="text-sm font-semibold text-text">Category &amp; Topics</span>
      </div>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <FormField label="Category" htmlFor="create-category">
          <select
            id="create-category"
            value={value.categoryId}
            onChange={(e) => onChange({ ...value, categoryId: e.target.value })}
            className="w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text outline-none focus:border-primary"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label={`Topics (up to ${maxTopics})`} htmlFor="create-topics">
          <input
            id="create-topics"
            placeholder="Add topics and press Enter…"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={value.topics.length >= maxTopics}
            className="w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 disabled:opacity-60"
          />
          {value.topics.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {value.topics.map((topic) => (
                <span
                  key={topic}
                  className="flex items-center gap-1 rounded-full bg-neutral-bg px-2.5 py-1 text-xs text-text-secondary"
                >
                  {topic}
                  <button
                    type="button"
                    onClick={() => removeTopic(topic)}
                    aria-label={`Remove ${topic}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </FormField>
      </div>
    </Card>
  );
}