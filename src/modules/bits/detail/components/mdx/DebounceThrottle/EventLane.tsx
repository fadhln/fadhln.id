import Timeline, { type Mark } from "./Timeline";

export type Lane = "raw" | "debounce" | "throttle";

export type LaneConfig = {
  key: Lane;
  title: string;
  colorClassName: string;
};

export const LANES: LaneConfig[] = [
  {
    key: "raw",
    title: "Raw",
    colorClassName: "text-warning-text border-warning bg-warning",
  },
  {
    key: "debounce",
    title: "Debounce",
    colorClassName: "text-success-text border-success bg-success",
  },
  {
    key: "throttle",
    title: "Throttle",
    colorClassName: "text-info-text border-info bg-info",
  },
];

function EventLane({ lane, marks, now }: { lane: LaneConfig; marks: Mark[]; now: number }) {
  return (
    <div className="border-border bg-bg-elevated rounded-xs border p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className={lane.colorClassName.split(" ")[1]}>
          <p className={`text-sm font-semibold uppercase ${lane.colorClassName.split(" ")[0]}`}>
            {lane.title}
          </p>
        </div>
        <output className="flex shrink-0 items-baseline gap-2" aria-label={`${lane.title} events`}>
          <span className="font-mono text-2xl font-medium tabular-nums">{marks.length}</span>
          <span className="text-xxs text-on-bg-secondary font-mono font-semibold tracking-wider uppercase">
            events
          </span>
        </output>
      </div>
      <Timeline marks={marks} now={now} colorClassName={lane.colorClassName} />
    </div>
  );
}

export default EventLane;
