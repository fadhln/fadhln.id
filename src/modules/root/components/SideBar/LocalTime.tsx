"use client";

import { useEffect, useState } from "react";

const TIME_ZONE = "Asia/Jakarta";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

function formatTime(date: Date): string {
  const parts = timeFormatter.formatToParts(date);
  const part = (type: Intl.DateTimeFormatPart["type"]) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const dayPeriod = part("dayPeriod").toLowerCase();
  return `${part("hour")}:${part("minute")}:${part("second")} ${dayPeriod}`;
}

function LocalTime() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const update = () => setTime(formatTime(new Date()));

    update();
    const id = setInterval(update, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="shadow-border-b bg-text-primary text-text-inverse dark:bg-surface-tertiary dark:text-text-primary flex h-12 items-center justify-between px-3">
      <div className="flex items-center gap-2">
        <div className="bg-brand h-2 w-2 rounded-full" />
        <p className="font-semibold">{time}</p>
      </div>
      <p className="text-xs opacity-70">{TIME_ZONE}</p>
    </div>
  );
}

export default LocalTime;
