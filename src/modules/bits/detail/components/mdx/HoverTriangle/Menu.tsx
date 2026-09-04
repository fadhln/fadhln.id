"use client";

import { type PointerEvent, useEffect, useRef, useState } from "react";

import Text from "-/modules/shared/components/Text";
import cn from "-/modules/shared/utils/cn";
import { ChevronRightIcon } from "@radix-ui/react-icons";

import type { MenuItem, TriangleVertices } from "./types";
import { isPointInTriangle } from "./utils";

type MenuProps = {
  data: MenuItem[][];
  safeHover?: boolean;
  showHitArea?: boolean;
};

function Menu({ data, safeHover = false, showHitArea = false }: MenuProps) {
  const [active, setActive] = useState<string | null>(null);
  const [triangle, setTriangle] = useState<TriangleVertices | null>(null);

  const submenuRef = useRef<HTMLDivElement | null>(null);
  const apexRef = useRef({ x: 0, y: 0 });
  const triangleRef = useRef<TriangleVertices | null>(null);

  // a = apex at the cursor on the parent row,
  // b/c = top-left and bottom-left corners of the submenu.
  // No submenu (closed, or active row is a leaf) clears the triangle.
  useEffect(() => {
    if (active == null || !submenuRef.current) {
      triangleRef.current = null;
      setTriangle(null);
      return;
    }

    const { left, top, bottom } = submenuRef.current.getBoundingClientRect();
    triangleRef.current = {
      a: apexRef.current,
      b: { x: left, y: top },
      c: { x: left, y: bottom },
    };

    if (showHitArea) setTriangle(triangleRef.current);
  }, [active, showHitArea]);

  const isCursorSafe = (x: number, y: number) =>
    safeHover && triangleRef.current !== null && isPointInTriangle({ x, y }, triangleRef.current);

  const handlePanelLeave = () => {
    setActive(null);
  };

  const handleRowPointerEnter = (item: MenuItem, event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch" && isCursorSafe(event.clientX, event.clientY)) return;
    if (item.children) apexRef.current = { x: event.clientX, y: event.clientY };
    setActive(item.text);
  };

  const handlePanelPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || !triangleRef.current) return;

    const { clientX: x, clientY: y } = event;
    const row = (event.target as HTMLElement).closest<HTMLElement>("[data-item-text]");

    if (row?.dataset.itemText !== active) return;

    apexRef.current = { x, y };
    const next = { ...triangleRef.current, a: { x, y } };
    triangleRef.current = next;

    if (showHitArea) setTriangle(next);
  };

  return (
    <div
      className="bg-bg-elevated border-border w-44 rounded-xs border p-1"
      onPointerLeave={handlePanelLeave}
      onPointerMove={handlePanelPointerMove}
    >
      {showHitArea && triangle && (
        <svg aria-hidden className="pointer-events-none fixed inset-0 z-40 h-full w-full">
          <title>Safe hit area</title>
          <polygon
            points={`${triangle.a.x},${triangle.a.y} ${triangle.b.x},${triangle.b.y} ${triangle.c.x},${triangle.c.y}`}
            className="fill-info-subtle/40 stroke-info"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
          <circle cx={triangle.a.x} cy={triangle.a.y} r={4} className="fill-info" />
        </svg>
      )}

      {data.map((group, groupIdx) => (
        <div key={group.map((item) => item.text).join("_")}>
          {groupIdx > 0 && <hr className="border-border my-1" />}
          {group.map((item) => (
            <div key={`item_${item.text}`} className="relative">
              <div
                data-item-text={item.text}
                onPointerEnter={(event) => handleRowPointerEnter(item, event)}
                className={cn(
                  "flex cursor-default items-center justify-between gap-6 px-3 py-1.5 text-sm whitespace-nowrap",
                  item.isDanger ? "text-error-text" : "text-on-bg",
                  active === item.text && "bg-bg-inset",
                )}
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
                    submenuRef.current = el;
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
