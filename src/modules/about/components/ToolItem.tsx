"use client";

import Popover from "-/modules/shared/components/Popover";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

import type { Tool } from "../data";

export function ToolItem({ tool }: { tool: Tool }) {
  return (
    <Popover>
      <Popover.Trigger className="border-border bg-bg-elevated hover:bg-bg-secondary hover:border-border-hover group focus-visible:outline-primary data-popup-open:border-primary data-popup-open:bg-bg-secondary flex w-full cursor-pointer items-center gap-3 rounded-xs border p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2">
        <span className="border-border bg-bg-secondary text-on-bg-secondary group-hover:text-on-bg group-hover:bg-bg-elevated flex size-8 shrink-0 items-center justify-center rounded-xs border transition-colors">
          <span
            aria-hidden="true"
            className="text-on-bg text-xxs font-mono font-semibold tracking-wider uppercase"
          >
            {tool.shortCode}
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-on-bg truncate text-sm font-medium">{tool.name}</p>
          <p className="text-on-bg-muted text-xxs truncate font-mono uppercase">{tool.category}</p>
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup>
            <Popover.Arrow />
            <div className="border-border mb-2 flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <span className="border-border bg-bg-secondary flex size-5 items-center justify-center rounded-xs border">
                  <span
                    aria-hidden="true"
                    className="text-on-bg text-xxs font-mono font-semibold tracking-wider uppercase"
                  >
                    {tool.shortCode}
                  </span>
                </span>
                <Popover.Title className="text-on-bg text-sm font-semibold">
                  {tool.name}
                </Popover.Title>
              </div>
              <span className="text-on-bg-muted text-xxs font-mono uppercase">{tool.category}</span>
            </div>
            <Popover.Description className="text-on-bg-secondary text-xs leading-relaxed">
              {tool.howIUseIt}
            </Popover.Description>
            <a
              href={tool.url}
              target="_blank"
              rel="noreferrer noopener"
              className="border-border text-on-bg-secondary hover:text-on-bg mt-3 flex items-center justify-between border-t pt-2.5 text-xs transition-colors"
            >
              <span className="text-xxs font-mono tracking-wider uppercase">Official site</span>
              <span className="flex items-center gap-1 font-medium">
                <span>{new URL(tool.url).hostname}</span>
                <ExternalLinkIcon className="size-3" />
              </span>
            </a>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover>
  );
}

export default ToolItem;
