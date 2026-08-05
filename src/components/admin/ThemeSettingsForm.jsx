"use client";

import { Moon, Sun } from "lucide-react";

const OPTIONS = [
  { value: "dark", label: "Dark", icon: Moon, desc: "Visitors without a saved preference see dark mode first." },
  { value: "light", label: "Light", icon: Sun, desc: "Visitors without a saved preference see light mode first." },
];

/** Site-wide default theme. A visitor's own toggle choice (saved to their browser) always wins. */
export function ThemeSettingsForm({ value, onChange }) {
  const current = value?.defaultTheme === "light" ? "light" : "dark";

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {OPTIONS.map((opt) => {
        const Icon = opt.icon;
        const active = current === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange({ ...value, defaultTheme: opt.value })}
            className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${
              active
                ? "border-[#c9ff33]/50 bg-[#c9ff33]/[0.06]"
                : "border-white/10 bg-white/[0.02] hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon className={`h-4 w-4 ${active ? "text-[#c9ff33]" : "text-white/50"}`} />
              <span className={`text-sm font-semibold ${active ? "text-white" : "text-white/80"}`}>{opt.label}</span>
            </div>
            <p className="text-xs text-white/40">{opt.desc}</p>
          </button>
        );
      })}
    </div>
  );
}
