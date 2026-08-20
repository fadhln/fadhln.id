import type { PropsWithChildren } from "react";

function Timeline({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="border-border bg-bg-secondary h-4 w-4 border" />
        <h2 className="text-on-bg text-2xl font-semibold">{title}</h2>
      </div>
      <div className="border-border ml-2 border-l pl-6">{children}</div>
    </div>
  );
}

export default Timeline;
