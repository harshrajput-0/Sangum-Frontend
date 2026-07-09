import type { ReactNode, SVGProps } from "react";

/**
 * Single source of truth for every icon used anywhere in the app — real,
 * self-contained SVG markup, not a wrapper around a third-party icon
 * package. Extracted and reconciled directly from the approved mockups
 * (67 files) so every shape here is pixel-identical to what's already been
 * designed and signed off — nothing reinvented, nothing drifted.
 *
 * Components should always import `{ Icons }` from here and reference
 * `Icons.home`, `Icons.search`, etc. — never redefine an icon inline in a
 * component file. Swapping what "notifications" looks like is then a
 * one-line change here instead of a find-and-replace across the app.
 *
 * Keys are named by UI *role* ("notifications"), not by visual shape
 * ("bell"), so the name stays correct even if the icon's shape changes.
 *
 * NOTE ON THE BRAND LOGO: the Sangum logo mark (icon/horizontal/full
 * variants) is intentionally NOT in this file. It needs its own gradient
 * defs and fixed brand colors rather than the currentColor convention every
 * icon below follows, so it belongs in its own `shared/components/Logo.tsx`
 * rather than mixed into this interchangeable icon set.
 */

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Convenience shorthand for width+height. Defaults to 24. Overridden by an explicit className like "h-4 w-4". */
  size?: number | string;
}

export type IconComponent = (props: IconProps) => React.JSX.Element;

/** Shared defaults for outline/line-style icons (the vast majority of the set). */
function LineIcon({ size = 24, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Shared defaults for solid/filled icons (brand marks: GitHub, Twitter/X, LinkedIn, Google). */
function SolidIcon({ size = 24, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

// =============================================================================
// NAVIGATION — Sidebar / Topbar / PublicNavbar / MobileBottomNav / Breadcrumb
// =============================================================================

export const HomeIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M3 12l9-9 9 9M5 10v10h14V10" />
  </LineIcon>
);

export const CommunitiesIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </LineIcon>
);

export const ExploreIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36z" />
  </LineIcon>
);

export const MessagesIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </LineIcon>
);

/** Distinct glyph from MessagesIcon — a closed rectangular speech bubble, used specifically for MobileBottomNav's "Chat" tab. */
export const ChatTabIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </LineIcon>
);

export const NotificationsIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </LineIcon>
);

export const BookmarksIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
  </LineIcon>
);

export const ResourcesIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z" />
  </LineIcon>
);

export const EventsIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </LineIcon>
);

export const SettingsIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 005 15.84a1.65 1.65 0 00-1.51-1H3.5a2 2 0 110-4h.09A1.65 1.65 0 005 9.6a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 5.18a1.65 1.65 0 001-1.51V3.5a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019 8.6a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </LineIcon>
);

export const CollapseSidebarIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M15 18l-6-6 6-6" />
  </LineIcon>
);

export const ExpandSidebarIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M9 18l6-6-6-6" />
  </LineIcon>
);

export const BreadcrumbSeparatorIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M9 18l6-6-6-6" />
  </LineIcon>
);

export const SearchIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </LineIcon>
);

export const CreateIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M12 5v14M5 12h14" />
  </LineIcon>
);

export const MenuOpenIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M3 12h18M3 6h18M3 18h18" />
  </LineIcon>
);

export const MenuCloseIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M18 6L6 18M6 6l12 12" />
  </LineIcon>
);

export const BackIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </LineIcon>
);

export const FilterIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M22 3H2l8 9.46V19l4 2v-8.54z" />
  </LineIcon>
);

export const MoreHorizontalIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </LineIcon>
);

// =============================================================================
// THEME — Topbar quick-toggle + Account Settings Light/Dark/System
// =============================================================================

export const ThemeLightIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </LineIcon>
);

export const ThemeDarkIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </LineIcon>
);

export const ThemeSystemIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <rect x="2" y="4" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 18v3" />
  </LineIcon>
);

// =============================================================================
// ADMIN — AdminSidebar / AdminDashboard / ModerationActions
// =============================================================================

export const DashboardIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </LineIcon>
);

/** AdminSidebar "Communities" — a deliberately minimal glyph, matching the approved mockup exactly. */
export const AdminCommunitiesIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="9" />
  </LineIcon>
);

/** AdminSidebar "Posts" — a stacked-documents glyph, distinct from the single-file ArticleTypeIcon. */
export const AdminPostsIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M12 2l9 5-9 5-9-5 9-5z" />
    <path d="M3 12l9 5 9-5" />
    <path d="M3 17l9 5 9-5" />
  </LineIcon>
);

/** AdminSidebar "Reports" nav item (flag only) — distinct from ReportContentIcon (flag + pole), which is the "report this post" action. */
export const ReportsIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
  </LineIcon>
);

export const UserIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <circle cx="9" cy="7" r="4" />
    <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
  </LineIcon>
);

export const ApproveIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M9 12l2 2 4-4M21 12a9 9 0 11-9-9 9 9 0 019 9z" />
  </LineIcon>
);

export const DeleteIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
  </LineIcon>
);

export const SuccessCircleIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <path d="M22 4L12 14.01l-3-3" />
  </LineIcon>
);

export const ErrorCircleIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M15 9l-6 6M9 9l6 6" />
  </LineIcon>
);

export const InfoCircleIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </LineIcon>
);

export const WarningIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
  </LineIcon>
);

export const EmptyStateIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </LineIcon>
);

export const CheckIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M20 6L9 17l-5-5" />
  </LineIcon>
);

// =============================================================================
// POST / FEEDBACK — PostActions, CommentActions, PostTypeSelector, ReportButton
// =============================================================================

export const LikeIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3z" />
  </LineIcon>
);

export const ReplyIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M9 17l-5-5 5-5" />
    <path d="M4 12h10.5a5.5 5.5 0 015.5 5.5v0a5.5 5.5 0 01-5.5 5.5H15" />
  </LineIcon>
);

export const ShareIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
  </LineIcon>
);

export const RepostIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
  </LineIcon>
);

export const EditIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4z" />
  </LineIcon>
);

/** "Report this post/comment" action — flag + pole. Distinct from ReportsIcon (AdminSidebar nav, flag only). */
export const ReportContentIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <path d="M4 22v-7" />
  </LineIcon>
);

export const PinIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M12 20l9-16H3z" />
  </LineIcon>
);

// Post type / resource type icons ------------------------------------------

export const TextTypeIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </LineIcon>
);

export const ImageTypeIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </LineIcon>
);

export const VideoTypeIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" />
  </LineIcon>
);

export const LinkTypeIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </LineIcon>
);

export const PollTypeIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M21 21H4a1 1 0 01-1-1V3M7 14l4-4 4 4 5-5" />
  </LineIcon>
);

export const ArticleTypeIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6" />
  </LineIcon>
);

export const CourseTypeIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </LineIcon>
);

export const ToolTypeIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94z" />
  </LineIcon>
);

export const PaperTypeIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M9 12h6M9 16h6M9 8h6" />
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h9l5 5v11a2 2 0 01-2 2z" />
  </LineIcon>
);

// =============================================================================
// COMMUNITY — CommunityTypeBadge
// =============================================================================

export const PublicBadgeIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="10" />
  </LineIcon>
);

export const LockIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </LineIcon>
);

// =============================================================================
// USER — UserBadge / ProfilePage
// =============================================================================

export const VerifiedIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M12 2l2.5 4.5L19 8l-3.5 3.5L16 16l-4-2-4 2 .5-4.5L5 8l4.5-1.5z" />
  </LineIcon>
);

export const LocationIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" />
    <circle cx="12" cy="10" r="3" />
  </LineIcon>
);

/** "View profile" action icon — a person inside a circle frame, used in ConversationPage's header. */
export const ProfileCircleIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.5a5 5 0 0110 0" />
  </LineIcon>
);

// =============================================================================
// CHAT — ChatInput / ConversationPage
// =============================================================================

export const SendIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
  </LineIcon>
);

export const AttachIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
  </LineIcon>
);

export const EmojiIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
  </LineIcon>
);

export const PhoneIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.36 1.6.67 2.34a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.74-1.27a2 2 0 012.11-.45c.74.31 1.53.54 2.34.67A2 2 0 0122 16.92z" />
  </LineIcon>
);

/** Bullet-list icon — RichTextEditor toolbar. */
export const ListIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </LineIcon>
);

// =============================================================================
// FORM — Input / PasswordInput / ImageUpload
// =============================================================================

export const EmailIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <rect x="2" y="4" width="20" height="14" rx="2" />
    <path d="M22 6l-10 7L2 6" />
  </LineIcon>
);

export const EyeIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
    <circle cx="12" cy="12" r="3" />
  </LineIcon>
);

export const UploadIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
  </LineIcon>
);

// =============================================================================
// ONBOARDING
// =============================================================================

/** "Web Development" interest topic — code brackets. */
export const CodeIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </LineIcon>
);

// =============================================================================
// LEGAL — TermsPage / CookiesPage
// =============================================================================

export const ShieldIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </LineIcon>
);

export const CookieIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
    <circle cx="14" cy="11" r="1" fill="currentColor" stroke="none" />
  </LineIcon>
);

// =============================================================================
// AUTH / OAUTH — solid brand marks, monochrome (currentColor) by design
// =============================================================================

export const GoogleIcon: IconComponent = (props) => (
  <SolidIcon {...props}>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  </SolidIcon>
);

export const GithubIcon: IconComponent = (props) => (
  <SolidIcon {...props}>
    <path d="M12 0a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.23c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.6-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0012 0z" />
  </SolidIcon>
);

export const LinkedinIcon: IconComponent = (props) => (
  <SolidIcon {...props}>
    <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5v-14a5 5 0 00-5-5zM8 19h-3v-9h3zm-1.5-10.3a1.74 1.74 0 110-3.49 1.74 1.74 0 010 3.49zM20 19h-3v-4.74c0-1.13-.02-2.58-1.57-2.58-1.57 0-1.81 1.23-1.81 2.5v4.82h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
  </SolidIcon>
);

export const TwitterIcon: IconComponent = (props) => (
  <SolidIcon {...props}>
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03A12.94 12.94 0 013 1.64a4.48 4.48 0 001.4 6.04 4.48 4.48 0 01-2.05-.57v.06c0 2.2 1.57 4.04 3.65 4.46a4.5 4.5 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9.06 9.06 0 010 19.54a12.83 12.83 0 006.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z" />
  </SolidIcon>
);

export const ExternalLinkIcon: IconComponent = (props) => (
  <LineIcon {...props}>
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
  </LineIcon>
);

// =============================================================================
// Collected map — the primary import surface for every component
// =============================================================================

// eslint-disable-next-line react-refresh/only-export-components
export const Icons = {
  // Navigation
  home: HomeIcon,
  communities: CommunitiesIcon,
  explore: ExploreIcon,
  messages: MessagesIcon,
  chatTab: ChatTabIcon,
  notifications: NotificationsIcon,
  bookmarks: BookmarksIcon,
  resources: ResourcesIcon,
  events: EventsIcon,
  settings: SettingsIcon,
  collapseSidebar: CollapseSidebarIcon,
  expandSidebar: ExpandSidebarIcon,
  breadcrumbSeparator: BreadcrumbSeparatorIcon,
  search: SearchIcon,
  create: CreateIcon,
  menuOpen: MenuOpenIcon,
  menuClose: MenuCloseIcon,
  back: BackIcon,
  filter: FilterIcon,
  moreHorizontal: MoreHorizontalIcon,

  // Theme
  themeLight: ThemeLightIcon,
  themeDark: ThemeDarkIcon,
  themeSystem: ThemeSystemIcon,

  // Admin
  dashboard: DashboardIcon,
  adminCommunities: AdminCommunitiesIcon,
  adminPosts: AdminPostsIcon,
  reports: ReportsIcon,
  user: UserIcon,
  approve: ApproveIcon,
  delete: DeleteIcon,
  successCircle: SuccessCircleIcon,
  errorCircle: ErrorCircleIcon,
  infoCircle: InfoCircleIcon,
  warning: WarningIcon,
  emptyState: EmptyStateIcon,
  check: CheckIcon,

  // Post / Feedback
  like: LikeIcon,
  reply: ReplyIcon,
  share: ShareIcon,
  repost: RepostIcon,
  edit: EditIcon,
  reportContent: ReportContentIcon,
  pin: PinIcon,

  // Post & Resource types
  typeText: TextTypeIcon,
  typeImage: ImageTypeIcon,
  typeVideo: VideoTypeIcon,
  typeLink: LinkTypeIcon,
  typePoll: PollTypeIcon,
  typeArticle: ArticleTypeIcon,
  typeCourse: CourseTypeIcon,
  typeTool: ToolTypeIcon,
  typePaper: PaperTypeIcon,

  // Community
  publicBadge: PublicBadgeIcon,
  lock: LockIcon,

  // User
  verified: VerifiedIcon,
  location: LocationIcon,
  profileCircle: ProfileCircleIcon,

  // Chat
  send: SendIcon,
  attach: AttachIcon,
  emoji: EmojiIcon,
  phone: PhoneIcon,
  list: ListIcon,

  // Form
  email: EmailIcon,
  eye: EyeIcon,
  upload: UploadIcon,

  // Onboarding
  code: CodeIcon,

  // Legal
  shield: ShieldIcon,
  cookie: CookieIcon,

  // Auth / OAuth
  google: GoogleIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  externalLink: ExternalLinkIcon,
} as const satisfies Record<string, IconComponent>;

export type IconName = keyof typeof Icons;
