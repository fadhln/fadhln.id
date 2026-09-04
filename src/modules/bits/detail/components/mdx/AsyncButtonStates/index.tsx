"use client";

import { useEffect, useRef, useState } from "react";

import { ActionSwapButton, type ActionSwapItem, Button } from "-/modules/shared/components/Button";
import Checkbox from "-/modules/shared/components/Checkbox/Checkbox";
import Text from "-/modules/shared/components/Text";
import { CheckIcon, CrossCircledIcon, ReloadIcon, UpdateIcon } from "@radix-ui/react-icons";
import { motion, useReducedMotion } from "motion/react";

type ButtonState = "idle" | "pending" | "success" | "error";

const ITEMS: ActionSwapItem<ButtonState>[] = [
  { id: "idle", label: "Save changes", icon: <UpdateIcon /> },
  {
    id: "pending",
    label: "Saving",
    icon: <ReloadIcon className="animate-spin motion-reduce:animate-none" />,
  },
  { id: "success", label: "Saved", icon: <CheckIcon /> },
  { id: "error", label: "Retry", icon: <CrossCircledIcon /> },
];

const STATUS: Record<ButtonState, string> = {
  idle: "Ready to save",
  pending: "Saving changes",
  success: "Changes saved",
  error: "Save failed",
};

function AsyncButtonStates() {
  const [state, setState] = useState<ButtonState>("idle");
  const [shouldFail, setShouldFail] = useState(false);
  const [disableWhilePending, setDisableWhilePending] = useState(true);
  const [delay, setDelay] = useState(1_000);
  const [requestCount, setRequestCount] = useState(0);
  const timers = useRef<number[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(
    () => () => {
      timers.current.forEach(window.clearTimeout);
    },
    [],
  );

  function save() {
    const fail = shouldFail;
    setState("pending");
    setRequestCount((count) => count + 1);

    const timer = window.setTimeout(() => setState(fail ? "error" : "success"), delay);
    timers.current.push(timer);
  }

  function reset() {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setState("idle");
    setRequestCount(0);
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center gap-8 p-6">
      <div className="border-border-strong bg-bg-secondary flex min-h-36 flex-col items-center justify-center gap-4 border p-6">
        <motion.div
          className="relative overflow-hidden p-px"
          animate={reduceMotion || state !== "error" ? { x: 0 } : { x: [0, -6, 6, -4, 4, 0] }}
          transition={{ duration: 0.35 }}
        >
          {state === "pending" && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-full"
              style={{
                backgroundImage:
                  "repeating-conic-gradient(var(--color-primary) 0deg 12deg, transparent 12deg 24deg)",
              }}
              animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
              transition={{ duration: 1.2, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
            />
          )}
          <div className="relative">
            <ActionSwapButton
              items={ITEMS}
              value={state}
              disabled={disableWhilePending && state === "pending"}
              aria-busy={state === "pending"}
              onClick={save}
            />
          </div>
        </motion.div>
        <output
          aria-live="polite"
          className="text-xxs text-on-bg-secondary font-mono tracking-wider uppercase"
        >
          {STATUS[state]}
        </output>
      </div>

      <div className="flex flex-col gap-4">
        <Checkbox
          label="Fail request"
          checked={shouldFail}
          onCheckedChange={(checked) => setShouldFail(checked === true)}
          size="sm"
        />
        <Checkbox
          label="Disable while pending"
          checked={disableWhilePending}
          onCheckedChange={(checked) => setDisableWhilePending(checked === true)}
          size="sm"
        />
        <label className="flex flex-col gap-2">
          <span className="text-xxs text-on-bg-secondary flex justify-between font-mono tracking-wider uppercase">
            <span>Response delay</span>
            <span>{delay / 1_000}s</span>
          </span>
          <input
            type="range"
            min="500"
            max="3000"
            step="500"
            value={delay}
            onChange={(event) => setDelay(Number(event.target.value))}
            className="accent-primary w-full"
          />
        </label>
      </div>

      <div className="flex items-center justify-between">
        <Text variant="label" className="tracking-normal normal-case">
          {requestCount} request{requestCount === 1 ? "" : "s"} sent
        </Text>
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default AsyncButtonStates;
