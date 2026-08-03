interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
}

export function TextField({ id, label, value, onChange, placeholder, helperText }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-text-muted">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
      />
      {helperText && <p className="mt-1.5 text-[11px] text-text-disabled">{helperText}</p>}
    </div>
  );
}