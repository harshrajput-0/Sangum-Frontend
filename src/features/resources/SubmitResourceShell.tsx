'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ResourceInfoForm } from './components/submit/ResourceInfoForm';
import { LivePreviewPanel } from './components/submit/LivePreviewPanel';
import { DEFAULT_RESOURCE_DRAFT, type ResourceDraft } from './components/submit/formTypes';
import { mockCommunities } from './mock';

export function SubmitResourceShell() {
  const router = useRouter();
  const [draft, setDraft] = useState<ResourceDraft>(DEFAULT_RESOURCE_DRAFT);

  function handleChange<K extends keyof ResourceDraft>(field: K, value: ResourceDraft[K]) {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }

  // TODO: Replace with Express API integration — POST /api/resources (multipart if thumbnailFile present)
  function handleSubmit() {
    router.push('/resources');
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/resources" className="rounded-md p-1.5 text-text-muted hover:bg-surface-hover hover:text-text">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-text">Submit a Resource</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ResourceInfoForm draft={draft} onChange={handleChange} communityOptions={mockCommunities} />
        </div>
        <LivePreviewPanel draft={draft} />
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Link
          href="/resources"
          className="rounded-sm border border-border-strong px-4 py-2 text-center text-sm font-medium text-text hover:bg-surface-hover"
        >
          Cancel
        </Link>
        <button
          onClick={handleSubmit}
          disabled={!draft.agreedToGuidelines}
          className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit Resource
        </button>
      </div>
    </div>
  );
}