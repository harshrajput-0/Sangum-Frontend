import { Card, Avatar, GradientBanner } from "@/modules/communities/shared/components/ui";

interface AvatarBannerUploaderProps {
  avatarLabel: string;
  avatarImageUrl?: string;
  bannerGradientClassName?: string;
  onChangeAvatar?: () => void;
  onChangeBanner?: () => void;
}

export function AvatarBannerUploader({
  avatarLabel,
  avatarImageUrl,
  bannerGradientClassName = "from-primary to-info",
  onChangeAvatar,
  onChangeBanner,
}: AvatarBannerUploaderProps) {
  return (
    <Card>
      <p className="mb-4 text-sm font-semibold text-text">Community Avatar &amp; Banner</p>
      <div className="flex flex-wrap gap-6">
        <div>
          <Avatar
            label={avatarLabel}
            imageUrl={avatarImageUrl}
            shape="square"
            tone="success"
            size="xl"
          />
          <button
            type="button"
            onClick={onChangeAvatar}
            className="mt-2 rounded-md border border-border-strong px-3 py-1.5 text-xs font-medium text-text hover:bg-surface-hover"
          >
            Change
          </button>
        </div>
        <div className="min-w-[200px] flex-1">
          <GradientBanner height="lg" gradientClassName={bannerGradientClassName} />
          <button
            type="button"
            onClick={onChangeBanner}
            className="mt-2 rounded-md border border-border-strong px-3 py-1.5 text-xs font-medium text-text hover:bg-surface-hover"
          >
            Change
          </button>
        </div>
      </div>
    </Card>
  );
}