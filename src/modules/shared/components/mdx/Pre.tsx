"use client";

import { useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

import cn from "-/modules/shared/utils/cn";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

type PreProps = ComponentPropsWithoutRef<"pre">;

function Pre({ className, children, ...props }: PreProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const language = className?.replace(/^language-/, "");

  async function copyCode() {
    const code = preRef.current?.querySelector("code")?.textContent ?? "";

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1_500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <pre
      ref={preRef}
      className={cn(
        "border-border bg-bg-secondary relative my-6 overflow-x-auto rounded-xs border p-4 text-sm leading-relaxed",
        className,
      )}
      {...props}
    >
      {language && (
        <span className="text-on-bg-muted absolute top-2 right-3 font-mono text-[10px] tracking-wider uppercase">
          {language}
        </span>
      )}
      <button
        type="button"
        onClick={copyCode}
        aria-label={copied ? "Code copied" : "Copy code"}
        className="text-on-bg-muted hover:text-on-bg absolute top-2 right-12 cursor-pointer"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      {children}
    </pre>
  );
}

export default Pre;
