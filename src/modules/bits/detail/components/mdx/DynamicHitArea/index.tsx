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

import { SafeTriangle, type TriangleVertices } from "./safeTriangle";

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
      children: [
        {
          text: "Print current tab",
          symbol: "⌘P",
        },
        {
          text: "Print all tabs",
        },
      ],
    },
    {
      text: "Delete",
      symbol: <TrashIcon />,
      isDanger: true,
    },
  ],
] satisfies MenuItem[][];

type Viz = { vertices: Readonly<TriangleVertices>; rect: DOMRect };

/** Dwell time before a row entered inside the safe zone activates anyway. */
const SWITCH_DELAY = 300;

type Pending = { row: string; timer: ReturnType<typeof setTimeout>; fire: () => void };

type MenuProps = {
  data: readonly MenuItem[][];
  /** Keep the submenu open while the pointer travels inside its safe zone. */
  dynamic?: boolean;
  /** Render the live safe zone as an SVG overlay. */
  showHitArea?: boolean;
};

function Menu({ data, dynamic = false, showHitArea = false }: MenuProps) {
  const submenuRef = useRef<HTMLDivElement | null>(null);
  const stRef = useRef<SafeTriangle | null>(null);
  const openTextRef = useRef<string | null>(null);
  const overSubmenuRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const pendingRef = useRef<Pending | null>(null);
  const [openText, setOpenText] = useState<string | null>(null);
  const [viz, setViz] = useState<Viz | null>(null);
  const reduce = useReducedMotion();

  const cancelPending = () => {
    if (pendingRef.current) clearTimeout(pendingRef.current.timer);
    pendingRef.current = null;
  };

  const closeSubmenu = () => {
    cancelPending();
    openTextRef.current = null;
    setOpenText(null);
  };

  const openSubmenu = (text: string, x: number, y: number) => {
    cancelPending();
    openTextRef.current = text;
    lastPosRef.current = { x, y };
    setOpenText(text);
  };

  // Create the safe triangle once; onExpire closes the submenu unless the
  // pointer is currently inside the submenu panel.
  useEffect(() => {
    const st = new SafeTriangle({
      delay: 150,
      padding: 2,
      onExpire: () => {
        if (overSubmenuRef.current) return;
        if (pendingRef.current) clearTimeout(pendingRef.current.timer);
        pendingRef.current = null;
        openTextRef.current = null;
        setOpenText(null);
      },
    });
    stRef.current = st;
    return () => {
      st.deactivate();
      if (pendingRef.current) clearTimeout(pendingRef.current.timer);
      pendingRef.current = null;
    };
  }, []);

  // Measure the submenu after it mounts and aim the safe zone at it.
  useEffect(() => {
    const st = stRef.current;
    if (!dynamic || !st) return;
    if (openText == null) {
      st.deactivate();
      setViz(null);
      return;
    }
    const submenu = submenuRef.current;
    if (!submenu) return;
    st.activate(lastPosRef.current, submenu.getBoundingClientRect());
    if (showHitArea) setViz(st.getGeometry());
  }, [dynamic, openText, showHitArea]);

  // Single pointermove on the panel. Re-aims the apex over the owner row,
  // fires a pending switch immediately once the pointer exits the zone, and
  // refreshes the overlay.
  const onPanelPointerMove = (event: ReactPointerEvent) => {
    const st = stRef.current;
    if (event.pointerType === "touch" || !st) return;
    const { clientX: x, clientY: y } = event;
    lastPosRef.current = { x, y };

    const row = (event.target as HTMLElement).closest<HTMLElement>("[data-item-text]");
    if (row?.dataset.itemText === openTextRef.current) {
      st.updateApex({ x, y });
    }

    if (pendingRef.current && !st.isInSafeZone(x, y)) {
      pendingRef.current.fire();
    }

    if (showHitArea) {
      setViz(st.isInSafeZone(x, y) ? st.getGeometry() : null);
    }
  };

  /** Zone hit: delay the action instead of dropping it (menu-aim). */
  const scheduleSwitch = (row: string, fire: () => void) => {
    cancelPending();
    stRef.current?.cancelExpiry();
    pendingRef.current = {
      row,
      fire,
      timer: setTimeout(() => {
        pendingRef.current = null;
        fire();
      }, SWITCH_DELAY),
    };
  };

  const inZone = (event: ReactPointerEvent) => {
    const st = stRef.current;
    return Boolean(
      dynamic &&
      st &&
      event.pointerType !== "touch" &&
      st.isInSafeZone(event.clientX, event.clientY),
    );
  };

  const enterParent = (item: MenuItem, event: ReactPointerEvent) => {
    if (openTextRef.current === item.text) {
      // Back on the owner row: the submenu stays, any countdown is moot.
      cancelPending();
      stRef.current?.cancelExpiry();
      return;
    }
    if (inZone(event)) {
      const { clientX: x, clientY: y } = event;
      scheduleSwitch(item.text, () => openSubmenu(item.text, x, y));
      return;
    }
    openSubmenu(item.text, event.clientX, event.clientY);
  };

  const enterLeaf = (item: MenuItem, event: ReactPointerEvent) => {
    if (inZone(event)) {
      scheduleSwitch(item.text, closeSubmenu);
      return;
    }
    closeSubmenu();
  };

  const leaveRow = (item: MenuItem, event: ReactPointerEvent) => {
    // Pending switch for this row is moot once the pointer leaves it.
    if (pendingRef.current?.row === item.text) cancelPending();
    if (!item.children || event.pointerType === "touch") return;
    // Only the owner row can arm the close countdown.
    if (openTextRef.current !== item.text) return;
    const st = stRef.current;
    if (st && !st.isInSafeZone(event.clientX, event.clientY)) st.startExpiry();
  };

  const leavePanel = () => {
    cancelPending();
    if (dynamic) stRef.current?.startExpiry();
    else closeSubmenu();
  };

  return (
    <div
      className="bg-bg-elevated border-border shadow-border w-44 rounded-xs border p-1"
      onPointerMove={onPanelPointerMove}
      onPointerLeave={leavePanel}
    >
      {showHitArea && viz && (
        <svg aria-hidden className="pointer-events-none fixed inset-0 z-40 h-full w-full">
          <title>Safe zone</title>
          <polygon
            points={`${viz.vertices.a.x},${viz.vertices.a.y} ${viz.vertices.b.x},${viz.vertices.b.y} ${viz.vertices.c.x},${viz.vertices.c.y}`}
            className="fill-info-subtle stroke-info"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
          <rect
            x={viz.rect.left}
            y={viz.rect.top}
            width={viz.rect.width}
            height={viz.rect.height}
            className="stroke-info"
            strokeWidth={1}
            strokeDasharray="2 3"
            opacity={0.7}
          />
          <circle
            cx={viz.vertices.a.x}
            cy={viz.vertices.a.y}
            r={4}
            className="fill-error"
            opacity={0.9}
          />
        </svg>
      )}

      {data.map((group, gi) => (
        <div key={group.map((item) => item.text).join("-")}>
          {gi > 0 && <hr className="border-border my-1" />}
          {group.map((item) => (
            <div key={item.text} className="relative">
              <div
                data-item-text={item.text}
                onPointerEnter={(event) =>
                  item.children ? enterParent(item, event) : enterLeaf(item, event)
                }
                onPointerLeave={(event) => leaveRow(item, event)}
                className={cn(
                  "hover:bg-bg-inset flex cursor-default items-center justify-between gap-6 rounded-xs px-3 py-1.5 text-sm whitespace-nowrap",
                  openText === item.text && "bg-bg-inset",
                  item.isDanger ? "text-error-text" : "text-on-bg",
                )}
              >
                <span>{item.text}</span>
                {item.symbol && (
                  <span aria-hidden className="text-on-bg-muted">
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
                      onPointerEnter={() => {
                        overSubmenuRef.current = true;
                        cancelPending();
                        stRef.current?.cancelExpiry();
                      }}
                      onPointerLeave={() => {
                        overSubmenuRef.current = false;
                        stRef.current?.startExpiry();
                      }}
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
