import type { AvatarColorKey } from "../../types/conversation.types";
import { Avatar } from "../common/Avatar";

interface TypingIndicatorProps {
  avatarInitials: string;
  avatarColor: AvatarColorKey;
  avatarRounded: boolean;
}

export function TypingIndicator({
  avatarInitials,
  avatarColor,
  avatarRounded,
}: TypingIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar
        initials={avatarInitials}
        colorKey={avatarColor}
        rounded={avatarRounded}
        size="sm"
      />
      <div className="flex items-center gap-[3px] rounded-2xl rounded-bl-[4px] bg-surface px-3.5 py-2.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted opacity-60"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}