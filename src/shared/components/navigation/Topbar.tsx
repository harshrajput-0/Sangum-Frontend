// import { useEffect, useState } from "react";
// import { IconBell, IconMenu, IconMoon, IconPlus, IconSearch, IconSun } from "@/shared/components/ui/icons/SidebarIcons";
// import { cn } from "@/shared/utils/cn";

// /**
//  * Topbar
//  * App-shell topbar: search, "create" action, theme toggle, notification
//  * bell, and avatar menu. The search field hides below 980px and a
//  * hamburger (to open your mobile sidebar) appears below 680px.
//  *
//  * Theme toggle works standalone (flips `data-theme` on <html> directly),
//  * or pass `theme`/`onThemeChange` to control it from a shared ThemeProvider.
//  */

// export type TopbarTheme = "dark" | "light";
// export type UserStatus = "online" | "away" | "busy" | "offline";

// export interface TopbarUser {
//   name: string;
//   initials: string;
//   avatarUrl?: string;
//   status?: UserStatus;
// }

// export interface TopbarProps {
//   /** Opens your app's mobile sidebar/drawer. Button only shows below 680px. */
//   onMenuClick?: () => void;
//   onSearch?: (query: string) => void;
//   searchPlaceholder?: string;
//   onCreateClick?: () => void;
//   createLabel?: string;
//   notificationCount?: number;
//   onNotificationsClick?: () => void;
//   user?: TopbarUser;
//   onAvatarClick?: () => void;
//   theme?: TopbarTheme;
//   onThemeChange?: (theme: TopbarTheme) => void;
//   className?: string;
// }

// const statusColor: Record<UserStatus, string> = {
//   online: "var(--success)",
//   away: "var(--warning)",
//   busy: "var(--danger)",
//   offline: "var(--neutral)",
// };

// const iconButton =
//   "flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-[var(--text-secondary)] outline-none transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-purple)]";

// export default function Topbar({
//   onMenuClick,
//   onSearch,
//   searchPlaceholder = "Search communities, posts, people…",
//   onCreateClick,
//   createLabel = "Create",
//   notificationCount = 0,
//   onNotificationsClick,
//   user = { name: "Alex", initials: "AV", status: "online" },
//   onAvatarClick,
//   theme: themeProp,
//   onThemeChange,
//   className,
// }: TopbarProps) {
//   const [internalTheme, setInternalTheme] = useState<TopbarTheme>("dark");
//   const isThemeControlled = themeProp !== undefined;
//   const theme = isThemeControlled ? themeProp : internalTheme;

//   // Sync with whatever theme is already active on <html> on first mount.
//   useEffect(() => {
//     if (isThemeControlled) return;
//     const current = document.documentElement.getAttribute("data-theme");
//     if (current === "light" || current === "dark") setInternalTheme(current);
//   }, []);

//   const handleThemeToggle = () => {
//     const next: TopbarTheme = theme === "dark" ? "light" : "dark";
//     if (!isThemeControlled) {
//       setInternalTheme(next);
//       document.documentElement.setAttribute("data-theme", next);
//     }
//     onThemeChange?.(next);
//   };

//   return (
//     <header
//       className={cn(
//         "flex h-[var(--topbar-h)] items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--bg)] px-6 font-[var(--font-sans)]",
//         className
//       )}
//     >
//       <div className="flex min-w-0 flex-1 items-center gap-3">
//         <button
//           type="button"
//           onClick={onMenuClick}
//           aria-label="Open menu"
//           className={cn("hidden max-[680px]:flex", iconButton)}
//         >
//           <IconMenu />
//         </button>

//         <div className="relative w-[340px] max-w-full max-[979px]:hidden">
//           <span className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]">
//             <IconSearch />
//           </span>
//           <input
//             type="text"
//             placeholder={searchPlaceholder}
//             onChange={(e) => onSearch?.(e.target.value)}
//             className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--input-bg)] py-2.5 pl-9 pr-3.5 text-[13px] text-[var(--text)] outline-none transition-[border-color,box-shadow] duration-[120ms] placeholder:text-[var(--text-muted)] focus:border-[var(--brand-purple)] focus:shadow-[var(--shadow-glow-purple)]"
//           />
//         </div>
//       </div>

//       <div className="flex shrink-0 items-center gap-2.5">
//         <button
//           type="button"
//           onClick={onCreateClick}
//           className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] bg-[var(--brand-purple)] px-3 py-[7px] text-[12px] font-semibold text-white shadow-[var(--shadow-sm)] outline-none transition-colors hover:bg-[var(--brand-purple-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-purple-light)]"
//         >
//           <IconPlus className="h-3.5 w-3.5" />
//           {createLabel}
//         </button>

//         <button type="button" onClick={handleThemeToggle} aria-label="Toggle theme" title="Toggle theme" className={iconButton}>
//           {theme === "dark" ? <IconMoon /> : <IconSun />}
//         </button>

//         <div className="relative">
//           <button type="button" onClick={onNotificationsClick} aria-label="Notifications" className={iconButton}>
//             <IconBell />
//           </button>
//           {notificationCount > 0 && (
//             <span className="pointer-events-none absolute -right-0.5 -top-0.5 flex min-w-[15px] items-center justify-center rounded-[var(--radius-full)] bg-[var(--danger)] px-[4px] py-[1px] text-[9px] font-semibold leading-tight text-white">
//               {notificationCount > 9 ? "9+" : notificationCount}
//             </span>
//           )}
//         </div>

//         <button
//           type="button"
//           onClick={onAvatarClick}
//           aria-label="Open account menu"
//           className="relative inline-flex shrink-0 rounded-full outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-purple)]"
//         >
//           {user.avatarUrl ? (
//             <img src={user.avatarUrl} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
//           ) : (
//             <span
//               className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
//               style={{ background: "var(--brand-purple)" }}
//             >
//               {user.initials}
//             </span>
//           )}
//           {user.status && (
//             <span
//               className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--surface)]"
//               style={{ background: statusColor[user.status] }}
//             />
//           )}
//         </button>
//       </div>
//     </header>
//   );
// }
