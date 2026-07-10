import React, { useId, useRef } from "react";

/**
 * RichTextEditor
 * ---------------
 * Lightweight markdown editor: a formatting toolbar (bold, italic, code,
 * link, bulleted list, heading) that wraps/inserts markdown syntax around
 * the current textarea selection. No external editor dependency — it's a
 * plain <textarea> under the hood, so the value is always portable
 * markdown text.
 *
 * Usage:
 *   <RichTextEditor value={body} onChange={setBody} placeholder="Write something…" />
 */

export interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type FormatAction =
  | { type: "wrap"; before: string; after?: string }
  | { type: "line-prefix"; prefix: string };

const TOOLBAR: Array<{ label: string; action: FormatAction; render: () => React.ReactNode }> = [
  {
    label: "Bold",
    action: { type: "wrap", before: "**", after: "**" },
    render: () => <span className="text-[13px] font-bold">B</span>,
  },
  {
    label: "Italic",
    action: { type: "wrap", before: "_", after: "_" },
    render: () => <span className="text-[13px] italic">i</span>,
  },
  {
    label: "Code",
    action: { type: "wrap", before: "`", after: "`" },
    render: () => <span className="text-[12px] font-semibold">{"</>"}</span>,
  },
  {
    label: "Link",
    action: { type: "wrap", before: "[", after: "](url)" },
    render: () => (
      /* icon: replace with real "link" icon */
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path d="M10 13a5 5 0 007.07 0l1.93-1.93a5 5 0 00-7.07-7.07L10 5" />
        <path d="M14 11a5 5 0 00-7.07 0L5 12.93a5 5 0 007.07 7.07L14 19" />
      </svg>
    ),
  },
  {
    label: "Bulleted list",
    action: { type: "line-prefix", prefix: "- " },
    render: () => (
      /* icon: replace with real "list" icon */
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
      </svg>
    ),
  },
  {
    label: "Heading",
    action: { type: "line-prefix", prefix: "## " },
    render: () => <span className="text-[13px] font-bold">H</span>,
  },
];

export function RichTextEditor({
  label,
  value,
  onChange,
  placeholder = "Write something…",
  minRows = 5,
  error,
  helperText,
  disabled,
  className,
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoId = useId();

  const applyFormat = (action: FormatAction) => {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const selected = value.slice(start, end);

    // eslint-disable-next-line no-useless-assignment
    let next = value;
    let cursorStart = start;
    let cursorEnd = end;

    if (action.type === "wrap") {
      const after = action.after ?? action.before;
      next = value.slice(0, start) + action.before + selected + after + value.slice(end);
      cursorStart = start + action.before.length;
      cursorEnd = cursorStart + selected.length;
    } else {
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      next = value.slice(0, lineStart) + action.prefix + value.slice(lineStart);
      cursorStart = start + action.prefix.length;
      cursorEnd = end + action.prefix.length;
    }

    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  return (
    <div className={cx("w-full", className)}>
      {label && (
        <label
          htmlFor={autoId}
          className="mb-[var(--sp-2)] block text-(length:--fs-sm) font-medium text-text-secondary"
        >
          {label}
        </label>
      )}

      <div
        className={`cx(
          "overflow-hidden rounded-md border transition-colors duration-150",
          error ? "border-danger" : "border-[color:vborder-border
        )`}
      >
        <div className="flex gap-(--sp-1) border-b border-[color:var(--border)] bg-surface-2 px-[10px] py-[8px]">
          {TOOLBAR.map((tool) => (
            <button
              key={tool.label}
              type="button"
              title={tool.label}
              aria-label={tool.label}
              disabled={disabled}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyFormat(tool.action)}
              className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-text-secondary transition-colors duration-150 hover:bg-[color:var(--surface-hover)] hover:text-text disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:h-3.5 [&_svg]:w-3.5"
            >
              {tool.render()}
            </button>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          id={autoId}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={minRows}
          className="w-full resize-y bg-[color:var(--surface)] p-[14px] text-[length:var(--fs-sm)] text-text-secondary placeholder:text-text-muted focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {error ? (
        <p role="alert" className="mt-[var(--sp-1)] text-[length:var(--fs-xs)] text-[color:var(--danger)]">
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-[var(--sp-1)] text-[length:var(--fs-xs)] text-text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default RichTextEditor;
