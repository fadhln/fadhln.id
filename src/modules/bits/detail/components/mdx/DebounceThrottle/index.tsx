"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "-/modules/shared/components/Button";
import Text from "-/modules/shared/components/Text";

type Lane = "raw" | "debounce" | "throttle";
type Mark = { id: number; time: number };

type LaneConfig = {
  key: Lane;
  title: string;
  description: string;
  tickClassName: string;
};

const LANES: LaneConfig[] = [
  { key: "raw", title: "Raw", description: "Every event", tickClassName: "bg-warning" },
  {
    key: "debounce",
    title: "Debounce",
    description: "After events stop",
    tickClassName: "bg-success",
  },
  {
    key: "throttle",
    title: "Throttle",
    description: "At most once per delay",
    tickClassName: "bg-info",
  },
];

const WINDOW_MS = 4_000;
const BURST_EVENTS = 12;
const BURST_INTERVAL_MS = 80;

const EMPTY_LANES: Record<Lane, Mark[]> = { raw: [], debounce: [], throttle: [] };
const EMPTY_COUNTS: Record<Lane, number> = { raw: 0, debounce: 0, throttle: 0 };

function Timeline({
  marks,
  now,
  tickClassName,
}: {
  marks: Mark[];
  now: number;
  tickClassName: string;
}) {
  return (
    <div
      className="border-border-strong bg-bg relative h-8 overflow-hidden border"
      aria-hidden="true"
    >
      <div className="bg-border-strong absolute top-0 right-0 h-full w-px" />
      {marks.map((mark) => (
        <span
          key={mark.id}
          className={`absolute top-1/2 size-2 -translate-y-1/2 ${tickClassName}`}
          style={{
            left: `${Math.min(100, Math.max(0, 100 - ((now - mark.time) / WINDOW_MS) * 100))}%`,
          }}
        />
      ))}
    </div>
  );
}

function DebounceThrottle() {
  const [delay, setDelay] = useState(500);
  const [query, setQuery] = useState("");
  const [marks, setMarks] = useState<Record<Lane, Mark[]>>(EMPTY_LANES);
  const [counts, setCounts] = useState<Record<Lane, number>>(EMPTY_COUNTS);
  const [now, setNow] = useState(0);
  const debounceTimer = useRef<number | undefined>(undefined);
  const burstTimers = useRef<number[]>([]);
  const throttleUntil = useRef(0);
  const nextMarkId = useRef(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const time = performance.now();
      setNow(time);
      setMarks((current) => {
        const next = Object.fromEntries(
          Object.entries(current).map(([lane, laneMarks]) => [
            lane,
            laneMarks.filter((mark) => time - mark.time < WINDOW_MS),
          ]),
        ) as Record<Lane, Mark[]>;

        return Object.entries(current).some(
          ([lane, laneMarks]) => next[lane as Lane].length !== laneMarks.length,
        )
          ? next
          : current;
      });
    }, 100);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(debounceTimer.current);
      burstTimers.current.forEach(window.clearTimeout);
    },
    [],
  );

  function mark(lane: Lane, time: number) {
    setMarks((current) => ({
      ...current,
      [lane]: [...current[lane], { id: nextMarkId.current++, time }],
    }));
    setCounts((current) => ({ ...current, [lane]: current[lane] + 1 }));
  }

  function fireEvent() {
    const time = performance.now();
    mark("raw", time);

    window.clearTimeout(debounceTimer.current);
    debounceTimer.current = window.setTimeout(() => mark("debounce", performance.now()), delay);

    if (time >= throttleUntil.current) {
      mark("throttle", time);
      throttleUntil.current = time + delay;
    }
  }

  function simulateBurst() {
    burstTimers.current.forEach(window.clearTimeout);
    burstTimers.current = Array.from({ length: BURST_EVENTS }, (_, index) =>
      window.setTimeout(fireEvent, index * BURST_INTERVAL_MS),
    );
  }

  function reset() {
    window.clearTimeout(debounceTimer.current);
    burstTimers.current.forEach(window.clearTimeout);
    burstTimers.current = [];
    throttleUntil.current = 0;
    setQuery("");
    setMarks(EMPTY_LANES);
    setCounts(EMPTY_COUNTS);
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col justify-center gap-8 p-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="text-xxs text-on-bg-secondary font-mono tracking-wider uppercase">
            Event source
          </span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              fireEvent();
            }}
            placeholder="Type quickly..."
            className="border-border-strong bg-bg placeholder:text-on-bg-muted focus:border-primary h-10 w-full border px-3 text-sm outline-none"
          />
        </label>
        <div className="flex items-end gap-2">
          <Button variant="secondary" onClick={simulateBurst}>
            Simulate burst
          </Button>
          <Button variant="ghost" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-xxs text-on-bg-secondary flex justify-between font-mono tracking-wider uppercase">
          <span>Delay</span>
          <span>{delay}ms</span>
        </span>
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={delay}
          onChange={(event) => setDelay(Number(event.target.value))}
          className="accent-primary w-full"
        />
      </label>

      <div className="flex flex-col gap-4">
        {LANES.map((lane) => (
          <div key={lane.key} className="grid grid-cols-[7rem_1fr_3rem] items-center gap-3">
            <div>
              <Text variant="label" className="text-on-bg">
                {lane.title}
              </Text>
              <Text variant="label" className="mt-0.5 text-[10px] tracking-normal normal-case">
                {lane.description}
              </Text>
            </div>
            <Timeline marks={marks[lane.key]} now={now} tickClassName={lane.tickClassName} />
            <output
              className="text-right font-mono text-sm tabular-nums"
              aria-label={`${lane.title} calls`}
            >
              {counts[lane.key]}
            </output>
          </div>
        ))}
      </div>

      <Text variant="label" className="text-center text-[10px] tracking-normal normal-case">
        Each line shows the last four seconds. The right edge is now.
      </Text>
    </div>
  );
}

export default DebounceThrottle;
