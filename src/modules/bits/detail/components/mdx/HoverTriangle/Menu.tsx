"use client";

import { type PointerEvent, useRef, useState } from "react";

import Text from "-/modules/shared/components/Text";
import cn from "-/modules/shared/utils/cn";
import { ChevronRightIcon } from "@radix-ui/react-icons";

import type { MenuItem, TriangleVertices } from "./types";

type MenuProps = {
  data: MenuItem[][];
  safeHover?: boolean;
  showHitArea?: boolean;
};

function Menu({ data, safeHover = false, showHitArea = false }: MenuProps) {
  const [active, setActive] = useState<string | null>(null);

  const parentRef = useRef<HTMLDivElement | null>(null);
  const submenuRef = useRef<HTMLDivElement | null>(null);
  const _safeHitAreaRef = useRef<TriangleVertices | null>(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const handleParentEnter = (item: MenuItem, event: PointerEvent<HTMLDivElement>) => {
    setActive(item.text);
    parentRef.current = event.currentTarget;
  };

  const handlePanelLeave = () => {
    setActive(null);
    parentRef.current = null;
  };

  const handlePanelPointerMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    const { clientX: x, clientY: y } = event;
    lastPosRef.current = { x, y };
  };

  return (
    <div
      className="bg-bg-elevated border-border w-44 rounded-xs border p-1"
      onPointerLeave={handlePanelLeave}
      onPointerMove={handlePanelPointerMove}
    >
      {data.map((group, groupIdx) => (
        <div key={group.map((item) => item.text).join("_")}>
          {groupIdx > 0 && <hr className="border-border my-1" />}
          {group.map((item) => (
            <div key={`item_${item.text}`} className="relative">
              <div
                className={cn(
                  "flex cursor-default items-center justify-between gap-6 px-3 py-1.5 text-sm whitespace-nowrap",
                  item.isDanger ? "text-error-text" : "text-on-bg",
                  active === item.text && "bg-bg-inset",
                )}
                onPointerEnter={(e) => handleParentEnter(item, e)}
              >
                <Text>{item.text}</Text>
                {item.symbol && (
                  <span
                    className={cn(
                      item.isDanger ? "text-error-text" : "text-on-bg-muted",
                      typeof item.symbol !== "string" && "size-3",
                    )}
                  >
                    {item.symbol}
                  </span>
                )}
                {item.children && <ChevronRightIcon className="text-on-bg-muted size-3" />}
              </div>
              {item.children && active === item.text && (
                <div
                  className="bg-bg-elevated border-border absolute -top-1.25 left-[97.5%] ml-1 w-52 rounded-xs border p-1"
                  ref={(el) => {
                    if (el) submenuRef.current = el;
                  }}
                >
                  {item.children.map((child) => (
                    <div
                      key={`child_${item.text}_${child.text}`}
                      className="hover:bg-bg-inset flex cursor-default items-center justify-between gap-6 px-3 py-1.5 text-sm whitespace-nowrap"
                    >
                      <Text>{child.text}</Text>
                      {child.symbol && <span className="text-on-bg-muted">{child.symbol}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Menu;
