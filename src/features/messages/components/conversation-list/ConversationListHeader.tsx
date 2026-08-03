import { Plus } from "lucide-react";
import { SangumLogoHorizontal } from "../../logo/SangumLogo";
import { OverflowMenu, type OverflowMenuEntry } from "../common/OverflowMenu";

interface ConversationListHeaderProps {
  onNewMessage: () => void;
}

/**
 * Static stubs: the approved design shows these menu entries but no target
 * screens exist for them yet. They close the menu and do nothing further —
 * intentionally not wired to any Shell state so nothing here invents new UI.
 */
const LIST_MENU_ITEMS: OverflowMenuEntry[] = [
  { id: "new-group", label: "New group", onSelect: () => {} },
  { id: "starred", label: "Starred messages", onSelect: () => {} },
  { id: "archived", label: "Archived chats", onSelect: () => {} },
  { id: "divider-1", type: "divider" },
  { id: "settings", label: "Settings", onSelect: () => {} },
];

export function ConversationListHeader({ onNewMessage }: ConversationListHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <SangumLogoHorizontal height={28} className="text-text" />
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="New message"
          onClick={onNewMessage}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-hover hover:text-text"
        >
          <Plus className="h-[18px] w-[18px]" />
        </button>
        <OverflowMenu ariaLabel="More options" items={LIST_MENU_ITEMS} />
      </div>
    </div>
  );
}