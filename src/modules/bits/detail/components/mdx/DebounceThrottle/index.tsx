"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "-/modules/shared/components/Button";

import EventLane, { LANES, type Lane } from "./EventLane";
import { type Mark, WINDOW_MS } from "./Timeline";

const BURST_EVENTS = 12;
const BURST_INTERVAL_MS = 80;
const DELAY_PRESETS = [100, 300, 500, 1_000];
const EMPTY_LANES: Record<Lane, Mark[]> = { raw: [], debounce: [], throttle: [] };

function formatDelay(delay: number) {
  return delay === 1_000 ? "1 s" : `${delay} ms`;
}

function DebounceThrottle() {
  const [delay, setDelay] = useState(500);
  const [query, setQuery] = useState("");
  const [marks, setMarks] = useState<Record<Lane, Mark[]>>(EMPTY_LANES);
  const [now, setNow] = useState(() => performance.now());
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
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-8 md:px-8 md:py-10">
      <section aria-labelledby="activity-title">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 id="activity-title" className="text-xl font-semibold tracking-tight">
              Event activity
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {LANES.map((lane) => (
            <EventLane key={lane.key} lane={lane} marks={marks[lane.key]} now={now} />
          ))}
        </div>
      </section>

      <section className="border-border bg-bg-elevated rounded-xs border p-6" aria-label="Controls">
        <div>
          <label
            htmlFor="debounce-throttle-source"
            className="text-xxs text-on-bg-secondary font-semibold tracking-wider uppercase"
          >
            Event source
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="debounce-throttle-source"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                fireEvent();
              }}
              className="border-border-strong bg-bg placeholder:text-on-bg-muted focus:border-primary h-10 min-w-0 flex-1 rounded-xs border px-3 text-sm tracking-normal outline-none"
              placeholder="Start typing ..."
            />
            <div className="border-border h-full w-px border-l" />
            <span className="flex gap-2">
              <Button size="lg" onClick={simulateBurst} className="flex-1 sm:flex-none">
                Simulate burst
              </Button>
              <Button size="lg" variant="secondary" onClick={reset}>
                Reset
              </Button>
            </span>
          </div>
        </div>

        <label className="mt-6 flex flex-col gap-3">
          <span className="text-xxs text-on-bg-secondary flex justify-between font-semibold tracking-normal uppercase">
            <span>Delay</span>
            <span className="text-xxs font-normal normal-case">{formatDelay(delay)}</span>
          </span>
          <input
            type="range"
            min="100"
            max="1000"
            value={delay}
            onChange={(event) => setDelay(Number(event.target.value))}
            className="accent-primary h-1.5 w-full cursor-pointer"
          />
          <span className="mt-4 flex flex-wrap gap-3">
            {DELAY_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setDelay(preset)}
                className={`rounded-xs border px-4 py-1.5 text-sm font-medium transition-colors ${
                  delay === preset
                    ? "border-primary bg-info-subtle text-primary"
                    : "border-border bg-bg-secondary text-on-bg-secondary hover:border-border-hover"
                }`}
              >
                {formatDelay(preset)}
              </button>
            ))}
          </span>
        </label>
      </section>
    </div>
  );
}

export default DebounceThrottle;
