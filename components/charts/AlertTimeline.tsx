"use client";

interface TimelineEvent {
  time: string;
  label: string;
  level?: "info" | "warning" | "critical";
}

interface AlertTimelineProps {
  events: TimelineEvent[];
}

export function AlertTimeline({ events }: AlertTimelineProps) {
  const dotColor = {
    info: "bg-emerald-500",
    warning: "bg-orange-500",
    critical: "bg-red-500 pulse-critical",
  };

  return (
    <div className="space-y-3">
      {events.map((event, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div
              className={`h-2.5 w-2.5 rounded-full ${dotColor[event.level ?? "info"]}`}
            />
            {i < events.length - 1 && <div className="mt-1 w-px flex-1 bg-white/10" />}
          </div>
          <div className="pb-3">
            <p className="text-xs text-white/40">{event.time}</p>
            <p className="text-sm text-white/80">{event.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
