'use client';

import { useState } from 'react';
import type { Comment } from '../types/comment.types';
import { Avatar, Badge } from '../../components/ui';
import { CommentActionsRow } from './CommentActionsRow';
import { CommentMenu } from './CommentMenu';
import { CommentEditForm } from './CommentEditForm';
import { CommentComposer } from './CommentComposer';
import { CommentList } from './CommentList';
import { useCommentComposer } from '../hooks/useCommentComposer';
import { useInlineEditField } from '../hooks/useInlineEditField';
import { useCurrentUser } from '../../hooks/useCurrentUser';

export interface CommentNodeProps {
  comment: Comment;
  depth: number;
  onReply: (parentId: string, text: string) => void;
  onEdit: (commentId: string, text: string) => void;
  onDelete: (commentId: string, isTopLevel: boolean) => void;
  onToggleLike: (commentId: string, nextLikedState: boolean) => void;
  onReport: (commentId: string) => void;
}

export function CommentNode({ comment, depth, onReply, onEdit, onDelete, onToggleLike, onReport }: CommentNodeProps) {
  const currentUser = useCurrentUser();
  const isOwn = comment.author.name === currentUser.name;
  const hasReplies = comment.replies.length > 0;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const reply = useCommentComposer({ composerId: `reply-${comment.id}`, onSubmit: (text) => onReply(comment.id, text) });
  const edit = useInlineEditField(comment.text, (text) => onEdit(comment.id, text));

  return (
    <div className="comment-node">
      <div className="flex gap-3">
        <div className="flex shrink-0 flex-col items-center">
          <Avatar initials={comment.author.initials} color={comment.author.color} size={depth > 0 ? 'sm' : 'md'} />
          {hasReplies && !isCollapsed && <div className="mt-1.5 w-[1.5px] flex-1 bg-border-strong opacity-60" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-text">{comment.author.name}</span>
            {comment.author.badge && <Badge tone={comment.author.badge.tone}>{comment.author.badge.label}</Badge>}
            <span className="text-xs text-text-muted">{comment.time}</span>
            <CommentMenu
              isOwn={isOwn}
              onEdit={edit.startEditing}
              onDelete={() => onDelete(comment.id, depth === 0)}
              onReport={() => onReport(comment.id)}
            />
          </div>

          {edit.isEditing ? (
            <CommentEditForm value={edit.value} onChange={edit.setValue} onSave={edit.save} onCancel={edit.cancel} />
          ) : (
            <p className="mb-0 mt-1.5 text-sm text-text-secondary">{comment.text}</p>
          )}

          <CommentActionsRow
            likes={comment.likes}
            likedByCurrentUser={!!comment.likedByCurrentUser}
            onToggleLike={() => onToggleLike(comment.id, !comment.likedByCurrentUser)}
            onToggleReply={reply.toggle}
          />

          {hasReplies && (
            <button type="button" onClick={() => setIsCollapsed((v) => !v)} className="mt-2 block text-xs text-text-muted hover:text-text hover:underline">
              {isCollapsed
                ? `${comment.replies.length} repl${comment.replies.length === 1 ? 'y' : 'ies'} hidden — click to expand`
                : 'Hide replies'}
            </button>
          )}

          {reply.isOpen && (
            <div className="mt-4">
              <CommentComposer
                authorInitials={currentUser.initials}
                authorColor={currentUser.avatarColor}
                value={reply.value}
                onChange={reply.onChange}
                onKeyDown={reply.onKeyDown}
                onSubmit={reply.onSubmit}
                onCancel={reply.onCancel}
                isSubmitDisabled={reply.isSubmitDisabled}
                placeholder="Write a reply…"
                submitLabel="Reply"
                size="compact"
              />
            </div>
          )}

          {hasReplies && !isCollapsed && (
            <div className="mt-4 space-y-4">
              <CommentList
                comments={comment.replies}
                depth={depth + 1}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleLike={onToggleLike}
                onReport={onReport}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}