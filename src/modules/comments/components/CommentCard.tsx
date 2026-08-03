'use client';

import { getCommentAccent, getInitials } from '../lib/deriveCommentDisplay';
import { useState } from 'react';
import { Heart, Reply as ReplyIcon, Minus, Plus } from 'lucide-react';
import { CommentAvatar } from './CommentAvatar';
import { CommentMenu } from './CommentMenu';
import { CommentComposer } from './CommentComposer';
import type { Comment } from '../types';

interface CommentCardProps {
  comment: Comment;
  avatarSize: 'sm' | 'md';
  hasReplies: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onLike: (id: string) => void;
  onReply: (parentId: string, text: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onReport: (id: string) => void;
}

export function CommentCard({ comment, avatarSize, hasReplies, isCollapsed, onToggleCollapse, onLike, onReply, onEdit, onDelete, onReport }: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const authorInitials = comment.author.initials ?? getInitials(comment.author.name);
  const authorAccent = comment.author.accent ?? getCommentAccent(comment.author.name);

  return (
    <div className="flex gap-3">
      <CommentAvatar initials={authorInitials} accent={authorAccent} size={avatarSize} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text">{comment.author.name}</span>
          {comment.author.badge && (
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                comment.author.badge.tone === 'success' ? 'bg-success-bg text-success' : 'border border-border-strong text-text-secondary'
              }`}
            >
              {comment.author.badge.label}
            </span>
          )}
          <span className="text-xs text-text-muted">{comment.time}</span>
          <CommentMenu
            isOwn={comment.author.isOwn}
            onEdit={() => setIsEditing(true)}
            onDelete={() => onDelete(comment.id)}
            onReport={() => onReport(comment.id)}
          />
        </div>

        {isEditing ? (
          <div className="mt-1.5">
            <CommentComposer
              avatarInitials={authorInitials}
              avatarAccent={authorAccent}
              placeholder="Edit your comment…"
              submitLabel="Save"
              initialValue={comment.text}
              autoFocus
              onCancel={() => setIsEditing(false)}
              onSubmit={(text) => { onEdit(comment.id, text); setIsEditing(false); }}
            />
          </div>
        ) : (
          <p className="mt-1 text-sm text-text">{comment.text}</p>
        )}

        <div className="mt-2.5 flex items-center gap-4">
          {hasReplies && (
            <button
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Expand thread' : 'Collapse thread'}
              className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-border-strong text-text-secondary hover:border-text-muted hover:text-text"
            >
              {isCollapsed ? <Plus size={9} /> : <Minus size={9} />}
            </button>
          )}
          <button
            onClick={() => onLike(comment.id)}
            className={`flex items-center gap-1.5 text-xs ${comment.liked ? 'text-primary-light' : 'text-text-muted hover:text-text'}`}
          >
            <Heart size={14} fill={comment.liked ? 'currentColor' : 'none'} />
            {comment.likeCount}
          </button>
          <button onClick={() => setIsReplying((prev) => !prev)} className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text">
            <ReplyIcon size={14} />
            Reply
          </button>
        </div>

        {isCollapsed && hasReplies && (
          <button onClick={onToggleCollapse} className="mt-2.5 block text-xs text-text-muted hover:text-text-secondary hover:underline">
            {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'} hidden
          </button>
        )}

        {isReplying && (
          <div className="mt-2.5">
            <CommentComposer
              avatarInitials="AV"
              avatarAccent="primary"
              placeholder="Write a reply…"
              submitLabel="Reply"
              autoFocus
              onCancel={() => setIsReplying(false)}
              onSubmit={(text) => { onReply(comment.id, text); setIsReplying(false); }}
            />
          </div>
        )}
      </div>
    </div>
  );
}