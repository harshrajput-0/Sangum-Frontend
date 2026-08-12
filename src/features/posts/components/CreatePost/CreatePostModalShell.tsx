'use client';

import { useEffect } from 'react';
import { useCreatePostModal } from '../../hooks/useCreatePostModal';
import { CreatePostHeader } from './CreatePostHeader';
import { PostToCommunityPicker } from './PostToCommunityPicker';
import { PostTypeSelector } from './PostTypeSelector';
import { TagsInput } from './TagsInput';
import { CreatePostFooterActions } from './CreatePostFooterActions';
import { TextPanel } from './panels/TextPanel';
import { ImagePanel } from './panels/ImagePanel';
import { VideoPanel } from './panels/VideoPanel';
import { DocPanel } from './panels/DocPanel';
import { PollPanel } from './panels/PollPanel';
import { Input } from '../../../../shared/components/ui';

/**
 * The single global mount point for Create/Edit Post. Render this
 * ONCE, high in the app (e.g. the root layout's client providers),
 * so it's reachable from any route — the header, mobile nav, and
 * this feature's own composer bar all just call
 * useCreatePostTrigger() to open it.
 */
export function CreatePostModalShell() {
  const { isOpen, mode, close, form } = useCreatePostModal();

  // Escape key + body scroll lock while open — matches the mock exactly.
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const title = mode === 'edit' ? 'Edit post' : 'Create post';

  return (
    <div
      className="no-scrollbar fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-8 backdrop-blur-sm sm:items-center max-phone:items-stretch max-phone:p-0"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="w-full max-w-lg rounded-xl border border-border bg-surface shadow-xl max-phone:flex max-phone:h-full max-phone:max-w-none max-phone:min-h-dvh max-phone:flex-col max-phone:rounded-none">
        <CreatePostHeader title={title} onClose={close} />

        <div className="no-scrollbar max-h-[75vh] space-y-4 overflow-y-auto px-5 py-4 max-phone:max-h-none max-phone:flex-1">
          <PostToCommunityPicker
            communities={form.communities}
            selectedId={form.values.communityId}
            onSelect={(id) => form.setField('communityId', id)}
          />

          <PostTypeSelector value={form.values.type} onChange={form.setType} />

          <Input
            label="Title"
            value={form.values.title}
            onChange={(e) => form.setField('title', e.target.value)}
            placeholder="Write a clear and descriptive title"
            error={form.titleError ?? undefined}
          />

          {form.values.type === 'text' && (
            <TextPanel content={form.values.content} onChange={(v) => form.setField('content', v)} />
          )}
          {form.values.type === 'image' && (
            <ImagePanel
              file={form.values.imageFile}
              caption={form.values.content}
              onFileChange={(file) => form.setField('imageFile', file)}
              onCaptionChange={(v) => form.setField('content', v)}
            />
          )}
          {form.values.type === 'video' && (
            <VideoPanel
              file={form.values.videoFile}
              caption={form.values.content}
              onFileChange={(file) => form.setField('videoFile', file)}
              onCaptionChange={(v) => form.setField('content', v)}
            />
          )}
          {form.values.type === 'doc' && (
            <DocPanel
              file={form.values.docFile}
              description={form.values.content}
              onFileChange={(file) => form.setField('docFile', file)}
              onDescriptionChange={(v) => form.setField('content', v)}
            />
          )}
          {form.values.type === 'poll' && (
            <PollPanel
              question={form.values.pollQuestion}
              options={form.values.pollOptions}
              duration={form.values.pollDuration}
              onQuestionChange={(v) => form.setField('pollQuestion', v)}
              onOptionChange={form.setPollOption}
              onAddOption={form.addPollOption}
              onRemoveOption={form.removePollOption}
              onDurationChange={(v) => form.setField('pollDuration', v)}
            />
          )}

          <TagsInput
            tags={form.tags.tags}
            draft={form.tags.draft}
            isAtLimit={form.tags.isAtLimit}
            onDraftChange={form.tags.onDraftChange}
            onKeyDown={form.tags.onKeyDown}
            onRemoveTag={form.tags.removeTag}
          />
        </div>

        <CreatePostFooterActions mode={mode} isSubmitting={form.isSubmitting} onCancel={close} onPublish={form.submit} />
      </div>
    </div>
  );
}