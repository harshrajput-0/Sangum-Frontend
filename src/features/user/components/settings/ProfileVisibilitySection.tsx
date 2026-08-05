import { Card } from "@/shared/components/ui";
import { SegmentedControl } from "../primitives/SegmentedControl";
import { VISIBILITY_OPTIONS } from "../../constants/profile.constants";
import type { VisibilityOption } from "../../types/profile.types";

export interface ProfileVisibilitySectionProps {
  visibility: VisibilityOption;
  onChange: (value: VisibilityOption) => void;
}

export function ProfileVisibilitySection({
  visibility,
  onChange,
}: ProfileVisibilitySectionProps) {
  return (
    <Card>
      <h2 className="text-sm font-semibold text-text">Profile Visibility</h2>
      <p className="mt-1 text-xs text-text-muted">Control who can see your profile.</p>
      <div className="mt-4">
        <SegmentedControl options={VISIBILITY_OPTIONS} value={visibility} onChange={onChange} />
      </div>
    </Card>
  );
}
