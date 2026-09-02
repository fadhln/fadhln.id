"use client";

import {
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { SPRING_PANEL } from "-/modules/shared/constants/ease";
import cn from "-/modules/shared/utils/cn";
import { ChevronRightIcon, TrashIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type SubItem = { text: string; symbol?: ReactNode };
type MenuItem = SubItem & { children?: MenuItem[]; isDanger?: boolean };

const DUMMY_DATA = [
  [
    {
      text: "New File",
      symbol: "⌘N",
    },
    {
      text: "Open",
      symbol: "⌘O",
    },
  ],
  [
    {
      text: "Share",
      children: [
        {
          text: "Copy link",
        },
        {
          text: "Publish to Web",
        },
      ],
    },
    {
      text: "Export",
      children: [
        {
          text: "Microsoft Word (.docx)",
        },
        {
          text: "PDF Document (.pdf)",
        },
        {
          text: "Plain Text (.txt)",
        },
      ],
    },
  ],
  [
    {
      text: "Print",
      symbol: "⌘P",
    },
    {
      text: "Delete",
      symbol: <TrashIcon />,
      isDanger: true,
    },
  ],
] satisfies MenuItem[][];

type Pt = { x: number; y: number };

// Sign of the cross product — positive on one side of the p1 -> p2 line.
function crossSign(p1: Pt, p2: Pt, p3: Pt) {
  return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

function isInsideTriangle(p: Pt, a: Pt, b: Pt, c: Pt) {
  const d1 = crossSign(p, a, b);
  const d2 = crossSign(p, b, c);
  const d3 = crossSign(p, c, a);
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNeg && hasPos);
}

const CLOSE_DELAY = 10;

type MenuProps = {
  data: readonly MenuItem[][];
  /** Keep the submenu open while the pointer travels inside its hit triangle. */
  dynamic?: boolean;
  /** Render the live hit triangle as an SVG overlay. */
  showHitArea?: boolean;
};

function Menu({ data, dynamic = false, showHitArea = false }: MenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const submenuRef = useRef<HTMLDivElement | null>(null);

  const pointerRef = useRef<Pt | null>(null);
  const anchorsRef = useRef<{ p: Pt; a: Pt; b: Pt } | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [openText, setOpenText] = useState<string | null>(null);
  const [triangle, setTriangle] = useState<[Pt, Pt, Pt] | null>(null);
  const reduce = useReducedMotion();

  // Capture the hit triangle when a submenu opens: pointer position plus the
  // submenu's two leading (left-edge) corners, all relative to the container.
  useEffect(() => {
    anchorsRef.current = null;
    setTriangle(null);

    const container = containerRef.current;
    const submenu = submenuRef.current;
    const pointer = pointerRef.current;
    if (!dynamic || openText == null || !container || !submenu || !pointer) return;

    const sr = submenu.getBoundingClientRect();
    const cr = container.getBoundingClientRect();
    anchorsRef.current = {
      p: pointer,
      a: { x: sr.left - cr.left, y: sr.top - cr.top },
      b: { x: sr.left - cr.left, y: sr.bottom - cr.top },
    };
  }, [dynamic, openText]);

  // Clear timer on unmount
  useEffect(() => () => clearTimeout(closeTimerRef.current), []);

  const cancelClose = () => clearTimeout(closeTimerRef.current);

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => setOpenText(null), CLOSE_DELAY);
  };

  /** True when the pointer is inside the open submenu's hit triangle. */
  const inHitArea = () => {
    const anchors = anchorsRef.current;
    const pointer = pointerRef.current;
    return Boolean(
      anchors && pointer && isInsideTriangle(pointer, anchors.p, anchors.a, anchors.b),
    );
  };

  const onPointerMove = (event: ReactPointerEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const cr = container.getBoundingClientRect();
    const pointer = { x: event.clientX - cr.left, y: event.clientY - cr.top };
    pointerRef.current = pointer;
    if (showHitArea && anchorsRef.current) {
      if (dynamic && inHitArea()) {
        setTriangle([anchorsRef.current.a, anchorsRef.current.b, pointer]);
        cancelClose();
      } else {
        // Outside the hit area — drop the overlay right away.
        setTriangle(null);
      }
    }
  };

  const enterItem = (item: MenuItem) => {
    if (dynamic && inHitArea()) return;
    if (item.children) {
      cancelClose();
      setOpenText(item.text);
    } else {
      scheduleClose();
    }
  };

  return (
    <div
      ref={containerRef}
      // The reserved right padding keeps the roam zone between panel and
      // submenu inside the container, so pointer events keep firing there.
      className={cn("relative w-fit", dynamic && "pr-56")}
      onPointerMove={onPointerMove}
      onPointerEnter={cancelClose}
      onPointerLeave={scheduleClose}
    >
      {showHitArea && triangle && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 z-10 h-full w-full">
          <title>Dynamic hit area</title>
          <polygon
            points={triangle.map((pt) => `${pt.x},${pt.y}`).join(" ")}
            className="fill-info-subtle/50 stroke-info"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
        </svg>
      )}

      <div className="bg-bg-elevated border-border shadow-border w-44 rounded-xs border p-1">
        {data.map((group, gi) => (
          <div key={group.map((item) => item.text).join("-")}>
            {gi > 0 && <hr className="border-border my-1" />}
            {group.map((item) => (
              <div key={item.text} className="relative">
                <div
                  onPointerEnter={() => enterItem(item)}
                  className={cn(
                    "hover:bg-bg-inset flex cursor-default items-center justify-between gap-6 rounded-xs px-3 py-1.5 text-sm whitespace-nowrap",
                    openText === item.text && "bg-bg-inset",
                    item.isDanger ? "text-error-text" : "text-on-bg",
                  )}
                >
                  <span>{item.text}</span>
                  {item.symbol && (
                    <span
                      aria-hidden
                      className={item.isDanger ? "text-error-text" : "text-on-bg-muted"}
                    >
                      {item.symbol}
                    </span>
                  )}
                  {item.children && (
                    <ChevronRightIcon aria-hidden className="text-on-bg-muted size-3.5" />
                  )}
                </div>

                {item.children && (
                  <AnimatePresence>
                    {openText === item.text && (
                      <motion.div
                        // Ignore the null detach from an exiting sibling that
                        // shares this ref during AnimatePresence swaps.
                        ref={(el) => {
                          if (el) submenuRef.current = el;
                        }}
                        initial={reduce ? false : { opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduce ? undefined : { opacity: 0, x: -4 }}
                        transition={SPRING_PANEL}
                        className="bg-bg-elevated border-border shadow-border absolute top-0 left-full z-10 ml-1 w-52 rounded-xs border p-1"
                      >
                        {item.children.map((child) => (
                          <div
                            key={child.text}
                            className="hover:bg-bg-inset flex cursor-default items-center justify-between gap-6 rounded-xs px-3 py-1.5 text-sm whitespace-nowrap"
                          >
                            <span>{child.text}</span>
                            {child.symbol && (
                              <span aria-hidden className="text-on-bg-muted">
                                {child.symbol}
                              </span>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DynamicHitArea() {
  const [showHitArea, setShowHitArea] = useState(false);

  return (
    <div className="my-4">
      <label className="text-on-bg-secondary mb-4 flex w-fit cursor-default items-center gap-2 font-mono text-xs tracking-widest uppercase select-none">
        <input
          type="checkbox"
          checked={showHitArea}
          onChange={(event) => setShowHitArea(event.target.checked)}
          className="accent-info size-3.5"
        />
        Show hit area
      </label>

      <div className="flex items-start justify-center gap-12">
        <div>
          <p className="text-on-bg-muted mb-2 font-mono text-xs tracking-widest uppercase">
            Dynamic
          </p>
          <Menu data={DUMMY_DATA} dynamic showHitArea={showHitArea} />
        </div>
        <div>
          <p className="text-on-bg-muted mb-2 font-mono text-xs tracking-widest uppercase">
            Static
          </p>
          <Menu data={DUMMY_DATA} />
        </div>
      </div>
    </div>
  );
}

export default DynamicHitArea;
