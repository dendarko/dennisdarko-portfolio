import { journeyTimeline } from "@/lib/site";

export function JourneyTimeline() {
  return (
    <ol className="relative space-y-4 border-l border-ink-200 pl-5 dark:border-white/10">
      {journeyTimeline.map((item, index) => (
        <li key={item.phase} className="relative">
          <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-ink-50 bg-accent-500 dark:border-ink-900" />
          <div className="card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold">{item.phase}</span>
              <span className="chip">{item.period}</span>
              <span className="text-xs text-ink-500 dark:text-ink-300">Step {index + 1}</span>
            </div>
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{item.note}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
