import type { ReactNode } from "react";
import { Github, Globe, Linkedin, Twitter, Youtube } from "lucide-react";
import {
  ICON_BUTTON_BASE_CLASSNAME,
  ICON_BUTTON_SIZE_CLASSES,
} from "@/shared/components/ui";
import type { SocialLinks } from "../../types/profile.types";

export interface ProfileSocialLinksProps {
  links: SocialLinks;
  className?: string;
}

interface LinkConfig {
  key: keyof SocialLinks;
  label: string;
  icon: ReactNode;
}

const LINK_CONFIG: LinkConfig[] = [
  { key: "github", label: "GitHub", icon: <Github size={16} /> },
  { key: "twitter", label: "Twitter / X", icon: <Twitter size={16} /> },
  { key: "linkedin", label: "LinkedIn", icon: <Linkedin size={16} /> },
  { key: "youtube", label: "YouTube", icon: <Youtube size={16} /> },
  { key: "website", label: "Website", icon: <Globe size={16} /> },
];

export function ProfileSocialLinks({ links, className = "" }: ProfileSocialLinksProps) {
  const activeLinks = LINK_CONFIG.filter((item) => links[item.key]);
  if (activeLinks.length === 0) return null;

  return (
    <div className={["flex flex-wrap items-center gap-2", className].join(" ")}>
      {activeLinks.map((item) => (
        <a
          key={item.key}
          href={links[item.key]}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={item.label}
          title={item.label}
          className={[ICON_BUTTON_BASE_CLASSNAME, ICON_BUTTON_SIZE_CLASSES.sm].join(" ")}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
