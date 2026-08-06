import { Globe } from "lucide-react";
import { GitHub, LinkedIn, X, YouTube } from "@/shared/components/icons";

import { Card } from "@/shared/components/ui";
import { PlatformLinkRow } from "./PlatformLinkRow";
import type { EditProfileFormData } from "../../types/profile.types";

export interface LinksSocialsSectionProps {
  links: EditProfileFormData["links"];
  onLinkChange: (
    field: keyof EditProfileFormData["links"],
    value: string,
  ) => void;
}

export function LinksSocialsSection({ links, onLinkChange }: LinksSocialsSectionProps) {
  return (
    <Card>
      <h2 className="text-sm font-semibold text-text">Links & Socials</h2>
      <div className="mt-4 flex flex-col gap-4">
        <PlatformLinkRow
          icon={<Globe size={16} />}
          label="Website"
          placeholder="https://yoursite.com"
          value={links.website ?? ""}
          onChange={(value) => onLinkChange("website", value)}
        />
        <PlatformLinkRow
          icon={<GitHub size={16} />}
          label="GitHub"
          placeholder="https://github.com/username"
          value={links.github ?? ""}
          onChange={(value) => onLinkChange("github", value)}
        />
        <PlatformLinkRow
          icon={<X size={16} />}
          label="Twitter / X"
          placeholder="https://x.com/username"
          value={links.twitter ?? ""}
          onChange={(value) => onLinkChange("twitter", value)}
        />
        <PlatformLinkRow
          icon={<LinkedIn size={16} />}
          label="LinkedIn"
          placeholder="https://linkedin.com/in/username"
          value={links.linkedin ?? ""}
          onChange={(value) => onLinkChange("linkedin", value)}
        />
        <PlatformLinkRow
          icon={<YouTube size={16} />}
          label="YouTube"
          placeholder="https://youtube.com/@username"
          value={links.youtube ?? ""}
          onChange={(value) => onLinkChange("youtube", value)}
        />
      </div>
    </Card>
  );
}
