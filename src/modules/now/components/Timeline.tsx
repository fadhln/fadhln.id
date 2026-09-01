import type { PropsWithChildren } from "react";

import { formatDate } from "-/modules/shared/utils/date";

function Timeline({ date, children }: PropsWithChildren<{ date: string }>) {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-3">
        <div className="border-border bg-bg-secondary h-4 w-4 border" />
        <h2 className="text-on-bg text-2xl font-semibold">
          {formatDate(new Date(date), "date-month-year-long")}
        </h2>
      </div>
      <div className="border-border ml-2 border-l pt-2 pl-6">{children}</div>
    </div>
  );
}

export default Timeline;
