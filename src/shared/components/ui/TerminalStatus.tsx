"use client"
import { useState } from "react";

export type Status = "shipped" | "building" | "next";

export interface StatusStyleProps {
    icon: string;
    text: string;
    color: string;
}

export interface ItemsProps {
    label: string;
    status: Status;
}

export interface TerminalStatusProps {
    items?: ItemsProps[];
    statusMap?: Record<Status, StatusStyleProps>;
    title?: string;
    cursorStatus?: Status;
}

const DEFAULT_ITEMS: ItemsProps[] = [
  { label: "community spaces", status: "shipped" },
  { label: "direct messages", status: "shipped" },
  { label: "notifications", status: "building" },
  { label: "admin tools", status: "building" },
  { label: "public launch", status: "next" },
];

const STATUS_STYLE: Record<Status, StatusStyleProps> = {
  shipped: { icon: "✓", text: "SHIPPED", color: "var(--success)" },
  building: { icon: "▸", text: "BUILDING", color: "var(--primary)" },
  next: { icon: "○", text: "NEXT", color: "var(--text-muted)" },
};

/**
 * TerminalStatus — presentational only. Reads Sangum's existing
 * design tokens (--surface, --border, --text, --success, --primary,
 * --text-muted, etc.) so it automatically follows whatever
 * [data-theme] is set on an ancestor element — nothing to configure.
 *
 * Drop this directly into the app; it assumes tokens.css is already
 * loaded globally, same as every other component.
 */
export function TerminalStatus({
  items = DEFAULT_ITEMS,
  statusMap = STATUS_STYLE,
  title = "sangum — status",
  cursorStatus = "building",
}: TerminalStatusProps) {
  let cursorPlaced = false;

  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        borderRadius: "var(--radius-xl)",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        overflow: "hidden",
        transition: "background var(--t-base), border-color var(--t-base)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--sp-4) var(--sp-5)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
        </div>
        <span style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", letterSpacing: "0.02em" }}>
          {title}
        </span>
      </div>

      <div style={{ padding: "var(--sp-2) var(--sp-6) var(--sp-5)" }}>
        {items.map((item, i) => {
          const cfg = statusMap[item.status] ?? { icon: "•", text: item.status, color: "var(--text-muted)" };
          const showCursor = cursorStatus && item.status === cursorStatus && !cursorPlaced;
          // eslint-disable-next-line react-hooks/immutability
          if (showCursor) cursorPlaced = true;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 0",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 13 }}>
                <span style={{ width: 16, textAlign: "center", fontSize: "var(--text-sm)", color: cfg.color }}>
                  {cfg.icon}
                </span>
                <span
                  style={{
                    fontSize: "var(--text-md)",
                    color: item.status === "next" ? "var(--text-muted)" : "var(--text)",
                  }}
                >
                  {item.label}
                </span>
              </span>
              <span
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  letterSpacing: "0.09em",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: cfg.color,
                }}
              >
                {cfg.text}
                {showCursor && (
                  <span
                    className="ts-cursor"
                    style={{ display: "inline-block", width: 7, height: 13, background: cfg.color }}
                  />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Default export — a themed demo wrapper with a light/dark toggle,
 * only so this artifact is previewable standalone. The toggle just
 * flips data-theme on a local div; TerminalStatus itself has no
 * theme logic of its own.
 */
export default function TerminalStatusDemo() {
  const [theme, setTheme] = useState("dark");

  return (
    <div
      data-theme={theme}
      style={{
        minHeight: "100%",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--sp-4)",
        padding: "var(--sp-6) var(--sp-4)",
        transition: "background var(--t-base)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
        [data-theme]{
          --font-mono: "JetBrains Mono", "Fira Code", monospace;
          --text-xs: 12px; --text-sm: 13px; --text-md: 15px;
          --radius-xl: 20px;
          --ease-brand: cubic-bezier(0.4, 0, 0.2, 1);
          --t-base: 200ms var(--ease-brand);
          --sp-2: 8px; --sp-4: 16px; --sp-5: 20px; --sp-6: 24px;
          --primary: #6d5dfe;
          --success: #22c55e;
        }
        [data-theme="dark"]{
          --bg: #0b0f14;
          --surface: #171d25;
          --border: #313d4d;
          --text: #f8fafc;
          --text-muted: #94a3b8;
        }
        [data-theme="light"]{
          --bg: #eef0f6;
          --surface: #ffffff;
          --border: #e0e3ee;
          --text: #171a26;
          --text-muted: #64748b;
        }
        .ts-cursor{ animation: ts-blink 1s steps(1) infinite; }
        @keyframes ts-blink{ 50%{ opacity:0; } }
      `}</style>

      <button
        onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        style={{
          alignSelf: "flex-end",
          maxWidth: 560,
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 9999,
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            cursor: "pointer",
          }}
        >
          {theme === "dark" ? "🌙 dark" : "☀️ light"}
        </span>
      </button>

      <div style={{ width: "100%", maxWidth: 560 }}>
        <TerminalStatus />
      </div>
    </div>
  );
}