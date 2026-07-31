interface DangerZoneCardProps {
  message?: string;
  onDelete: () => void;
}

export function DangerZoneCard({
  message = "Once you delete a community, there is no going back.",
  onDelete,
}: DangerZoneCardProps) {
  return (
    <div className="rounded-xl border border-danger/30 bg-danger/5 p-4 sm:p-5">
      <p className="mb-1.5 text-sm font-semibold text-danger">Danger Zone</p>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-text-muted">{message}</p>
        <button
          type="button"
          onClick={onDelete}
          className="shrink-0 rounded-md bg-danger px-3.5 py-2 text-xs font-medium text-white hover:bg-danger-hover"
        >
          Delete Community
        </button>
      </div>
    </div>
  );
}