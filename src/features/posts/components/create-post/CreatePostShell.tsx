'use client';

// src/features/posts/components/create-post/CreatePostShell.tsx
import { PostToCard } from './PostToCard';
import { PostTypeSelector } from './PostTypeSelector';
import { CreatePostForm } from './CreatePostForm';
import { usePostForm } from '../../hooks/usePostForm';
import type { PostGroup } from '../../types';

interface CreatePostShellProps {
  /** The group/community this post will be published to. */
  group: PostGroup;
}

/**
 * Page-level shell for Create Post. Only responsibility: compose UI,
 * call the hook, pass props down — no business logic here.
 *
 * Example usage:
 *   <CreatePostShell group={activeGroup} />
 */
export function CreatePostShell({ group }: CreatePostShellProps) {
  const {
    type,
    setType,
    title,
    setTitle,
    content,
    setContent,
    tags,
    setTags,
    isSubmitting,
    handleChangeGroup,
    handlePreview,
    handleSaveDraft,
    handlePublish,
  } = usePostForm(group);

  return (
    <div className="space-y-6">
      <PostToCard group={group} onChangeGroup={handleChangeGroup} />
      <PostTypeSelector selectedType={type} onSelectType={setType} />
      <CreatePostForm
        title={title}
        content={content}
        tags={tags}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onTagsChange={setTags}
        onPreview={handlePreview}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}