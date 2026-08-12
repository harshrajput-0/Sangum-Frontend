import type { RefObject } from "react";
import {
  Edit3,
  MessageCircle,
  MoreHorizontal,
  UserCheck,
  UserPlus,
  X,
} from "lucide-react";
import { Button } from "@/shared/components/ui";
import { ProfileActionMenu } from "./ProfileActionMenu";
import type { ConnectionStatus } from "../../types/profile.types";

export interface ProfileActionAreaProps {
  connectionStatus: ConnectionStatus;
  isMenuOpen: boolean;
  isBusy: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  onToggleMenu: () => void;
  onConnect: () => void;
  onCancelRequest: () => void;
  onAccept: () => void;
  onDecline: () => void;
  onRemove: () => void;
  onBlock: () => void;
  onReport: () => void;
  onEditProfile: () => void;
}

export function ProfileActionArea({
  connectionStatus,
  isMenuOpen,
  isBusy,
  menuRef,
  onToggleMenu,
  onConnect,
  onCancelRequest,
  onAccept,
  onDecline,
  onRemove,
  onBlock,
  onReport,
  onEditProfile,
}: ProfileActionAreaProps) {
  return (
    <div className="flex items-center gap-2">
      {connectionStatus === "own" && (
        <Button variant="primary" iconLeft={<Edit3 size={16} />} onClick={onEditProfile}>
          Edit Profile
        </Button>
      )}

      {connectionStatus === "not_connected" && (
        <>
          <Button
            variant="primary"
            iconLeft={<UserPlus size={16} />}
            onClick={onConnect}
            disabled={isBusy}
          >
            Connect
          </Button>
          <Button variant="outline" iconLeft={<MessageCircle size={16} />}>
            Message
          </Button>
        </>
      )}

      {connectionStatus === "pending" && (
        <>
          <Button
            variant="outline"
            iconLeft={<X size={16} />}
            onClick={onCancelRequest}
            disabled={isBusy}
          >
            Cancel Request
          </Button>
          <Button variant="outline" iconLeft={<MessageCircle size={16} />}>
            Message
          </Button>
        </>
      )}

      {connectionStatus === "received" && (
        <>
          <Button
            variant="primary"
            iconLeft={<UserCheck size={16} />}
            onClick={onAccept}
            disabled={isBusy}
          >
            Accept
          </Button>
          <Button
            variant="outline"
            iconLeft={<X size={16} />}
            onClick={onDecline}
            disabled={isBusy}
          >
            Decline
          </Button>
        </>
      )}

      {connectionStatus === "connected" && (
        <>
          <Button variant="primary" iconLeft={<MessageCircle size={16} />}>
            Message
          </Button>
          <Button variant="outline" iconLeft={<UserCheck size={16} />}>
            Connected
          </Button>
        </>
      )}

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          aria-label="More actions"
          onClick={onToggleMenu}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-text-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-text"
        >
          <MoreHorizontal size={18} />
        </button>
        {isMenuOpen && (
          <ProfileActionMenu
            connectionStatus={connectionStatus}
            isBusy={isBusy}
            onRemove={onRemove}
            onBlock={onBlock}
            onReport={onReport}
          />
        )}
      </div>
    </div>
  );
}
