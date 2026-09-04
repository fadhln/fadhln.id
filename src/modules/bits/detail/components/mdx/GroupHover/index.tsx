"use client";

import Text from "-/modules/shared/components/Text";
import cn from "-/modules/shared/utils/cn";

function Tile({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-info-100 border-info-500 dark:bg-info-700 dark:border-info-500 size-24 rounded-xs border",
        className,
      )}
    />
  );
}

function GroupHover() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex items-start justify-center gap-12">
        <div className="flex flex-col items-center gap-3">
          <div className="bg-bg-secondary border-border-strong flex items-end justify-center rounded-xs border border-dashed p-0.5">
            <Tile className="transition-transform duration-300 ease-out hover:-translate-y-3" />
          </div>
          <Text variant="label" className="text-xs">
            Normal hover:*
          </Text>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="group bg-bg-secondary border-border-strong flex items-end justify-center rounded-xs border border-dashed p-0.5">
            <Tile className="transition-transform duration-300 ease-out group-hover:-translate-y-3" />
          </div>
          <Text variant="label" className="text-xs">
            group-hover:*
          </Text>
        </div>
      </div>
    </div>
  );
}

export default GroupHover;
