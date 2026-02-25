"use client";

import { useTheme } from "@/components/ui/theme-provider";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" }
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <fieldset className="flex items-center gap-1 rounded-xl border border-ink-200 bg-white/80 p-1 dark:border-white/10 dark:bg-white/5">
      <legend className="sr-only">Theme</legend>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cn(
            "rounded-lg px-2 py-1 text-xs font-medium transition",
            theme === option.value
              ? "bg-ink-900 text-white dark:bg-white dark:text-ink-900"
              : "text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/10"
          )}
          onClick={() => setTheme(option.value)}
          aria-pressed={theme === option.value}
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}
