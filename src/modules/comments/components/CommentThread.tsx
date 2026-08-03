'use client';

import { useState } from 'react';
import { CommentCard } from './CommentCard';
import type { Comment } from '../types';

interface CommentThreadProps {
  comment: Comment;
  depth?: number;
  onLike: (id: string) => void;
  onReply: (parentId: string, text: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onReport: (id: string) => void;
}

export function CommentThread({ comment, depth = 0, onLike, onReply, onEdit, onDelete, onReport }: CommentThreadProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const hasReplies = comment.replies.length > 0;

  return (
    <div>
      <CommentCard
        comment={comment}
        avatarSize={depth === 0 ? 'md' : 'sm'}
        hasReplies={hasReplies}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        onLike={onLike}
        onReply={onReply}
        onEdit={onEdit}
        onDelete={onDelete}
        onReport={onReport}
      />
      {hasReplies && !isCollapsed && (
        <div className="ml-4 mt-4 space-y-4 border-l border-border pl-4">
          {comment.replies.map((reply) => (
            <CommentThread key={reply.id} comment={reply} depth={depth + 1} onLike={onLike} onReply={onReply} onEdit={onEdit} onDelete={onDelete} onReport={onReport} />
          ))}
        </div>
      )}
    </div>
  );
}