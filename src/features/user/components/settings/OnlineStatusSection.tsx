import { Card, ToggleSwitch } from "@/shared/components/ui";


export interface OnlineStatusSectionProps {
  showOnlineStatus: boolean;
  searchIndexing: boolean;
  onToggleOnlineStatus: (value: boolean) => void;
  onToggleSearchIndexing: (value: boolean) => void;
}

export function OnlineStatusSection({
  showOnlineStatus,
  searchIndexing,
  onToggleOnlineStatus,
  onToggleSearchIndexing,
}: OnlineStatusSectionProps) {
  return (
    <Card>
      <h2 className="text-sm font-semibold text-text">Online Status & Search</h2>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-text">Show online status</p>
            <p className="text-xs text-text-muted">{"Let others see when you're active."}</p>
          </div>
          <ToggleSwitch
            checked={showOnlineStatus}
            onChange={onToggleOnlineStatus}
            label="Show online status"
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-text">Allow search indexing</p>
            <p className="text-xs text-text-muted">
              Let search engines index your public profile.
            </p>
          </div>
          <ToggleSwitch
            checked={searchIndexing}
            onChange={onToggleSearchIndexing}
            label="Allow search indexing"
          />
        </div>
      </div>
    </Card>
  );
}
