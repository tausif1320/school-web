type Props = {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
};

export default function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: Props) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xs text-slate-400">{label}</label>
      )}

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-blue-500/40"
      />
    </div>
  );
}
