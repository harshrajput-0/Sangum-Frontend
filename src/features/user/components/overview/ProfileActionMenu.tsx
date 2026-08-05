import { Flag, Link as LinkIcon, Share2, ShieldOff, UserMinus } from "lucide-react";
import type { ConnectionStatus } from "../../types/profile.types";

export interface ProfileActionMenuProps {
  connectionStatus: ConnectionStatus;
  isBusy: boolean;
  onRemove: () => void;
  onBlock: () => void;
  onReport: () => void;
}

const ITEM_CLASS =
  "flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-text hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-50";

export function ProfileActionMenu({
  connectionStatus,
  isBusy,
  onRemove,
  onBlock,
  onReport,
}: ProfileActionMenuProps) {
  return (
    <div className="absolute right-0 top-full z-10 mt-1 w-52 overflow-hidden rounded-md border border-border bg-surface shadow-md">
      {connectionStatus === "own" ? (
        <>
          <button type="button" className={ITEM_CLASS}>
            <Share2 size={15} />
            Share Profile
          </button>
          <button type="button" className={ITEM_CLASS}>
            <LinkIcon size={15} />
            Copy Profile Link
          </button>
        </>
      ) : (
        <>
          {connectionStatus === "connected" && (
            <button
              type="button"
              className={ITEM_CLASS}
              onClick={onRemove}
              disabled={isBusy}
            >
              <UserMinus size={15} />
              Remove Connection
            </button>
          )}
          <button type="button" className={ITEM_CLASS} onClick={onBlock} disabled={isBusy}>
            <ShieldOff size={15} />
            Block
          </button>
          <button
            type="button"
            className={[ITEM_CLASS, "text-danger"].join(" ")}
            onClick={onReport}
            disabled={isBusy}
          >
            <Flag size={15} />
            Report
          </button>
        </>
      )}
    </div>
  );
}
