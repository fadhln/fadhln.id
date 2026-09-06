export type Mark = { id: number; time: number };

export const WINDOW_MS = 4_000;

const TIMELINE_TICKS = Array.from({ length: 21 }, (_, index) => index);

function Timeline({
  marks,
  now,
  colorClassName,
}: {
  marks: Mark[];
  now: number;
  colorClassName: string;
}) {
  return (
    <div className="relative mt-4 h-12" aria-hidden="true">
      <div className="border-border-strong absolute inset-x-0 top-3 border-t" />
      {TIMELINE_TICKS.map((tick) => (
        <span
          key={tick}
          className={`bg-border-strong absolute top-3 w-px ${tick % 5 === 0 ? "h-3" : "h-2"}`}
          style={{ left: `${tick * 5}%` }}
        />
      ))}
      {marks.map((mark) => {
        const position = Math.min(99.5, Math.max(0.5, 100 - ((now - mark.time) / WINDOW_MS) * 100));

        return (
          <span
            key={mark.id}
            className={`absolute top-0 size-2 -translate-x-1/2 ${colorClassName.split(" ").pop()}`}
            style={{ left: `${position}%` }}
          />
        );
      })}
      <div className="text-on-bg-muted absolute inset-x-0 top-7 flex justify-between font-mono text-[10px]">
        <span>-4.0s</span>
        <span>-3.0s</span>
        <span>-2.0s</span>
        <span>-1.0s</span>
        <span>0s</span>
      </div>
    </div>
  );
}

export default Timeline;
