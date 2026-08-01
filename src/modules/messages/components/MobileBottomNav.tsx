import { Home, Search, Plus, MessageCircle } from "lucide-react";
import { cn } from "../utils/cn";

interface MobileBottomNavProps {
  onNewMessage: () => void;
  className?: string;
}

/**
 * Home and Search are visual-only here — this feature doesn't own those
 * routes/screens, so wiring them to real navigation is out of scope until
 * they exist. "Chats" is marked active since this nav only ever renders on
 * the Messages page.
 */
export function MobileBottomNav({ onNewMessage, className }: MobileBottomNavProps) {
  return (
    <nav
      className={cn(
        "flex flex-shrink-0 items-center justify-around border-t border-border bg-bg-elevated py-2",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Home"
        className="flex h-11 w-11 items-center justify-center rounded-full text-text-muted transition-colors hover:text-text"
      >
        <Home className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Search"
        className="flex h-11 w-11 items-center justify-center rounded-full text-text-muted transition-colors hover:text-text"
      >
        <Search className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="New message"
        onClick={onNewMessage}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-text-on-primary shadow-md transition-colors hover:bg-primary-hover"
      >
        <Plus className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Chats"
        aria-current="true"
        className="flex h-11 w-11 items-center justify-center rounded-full text-primary-light"
      >
        <MessageCircle className="h-5 w-5 fill-current" />
      </button>
    </nav>
  );
}