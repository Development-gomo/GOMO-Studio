/** Figma "Frame 338" component — pink tick + uppercase label, used as a section kicker throughout. */
export function Eyebrow({ children, className }) {
  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <span className="h-3.5 w-0.5 shrink-0 bg-[#FF28BC]" aria-hidden />
      <span className="text-[13px] font-normal uppercase tracking-[0.08em] text-white">{children}</span>
    </div>
  );
}
