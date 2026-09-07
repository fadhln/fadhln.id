"use client";

import { useRef, useState } from "react";

import Link from "next/link";

import { ArrowRightIcon, CheckIcon, CopyIcon } from "@radix-ui/react-icons";

function ContactFaq() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function copyEmail() {
    await navigator.clipboard.writeText("contact@fadhln.id");
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1_500);
  }

  return (
    <aside className="flex flex-col" aria-labelledby="faq-title">
      <h2 id="faq-title" className="text-xl font-semibold">
        FAQs
      </h2>
      <div className="mt-8 flex flex-col gap-6">
        <Link href="/now" className="group flex flex-col gap-1">
          <span className="text-sm">Wanna know what I&apos;m working on now?</span>
          <span className="text-on-bg-muted group-hover:text-on-bg flex items-center gap-1 text-xs transition-colors">
            See now page <ArrowRightIcon />
          </span>
        </Link>
        <Link href="/about#resume" className="group flex flex-col gap-1">
          <span className="text-sm">Want my full resume?</span>
          <span className="text-on-bg-muted group-hover:text-on-bg flex items-center gap-1 text-xs transition-colors">
            See about page <ArrowRightIcon />
          </span>
        </Link>
        <button
          type="button"
          onClick={copyEmail}
          className="group flex cursor-pointer flex-col items-start gap-1 text-left"
        >
          <span className="text-sm">What is your email?</span>
          <span className="text-on-bg-muted group-hover:text-on-bg flex items-center gap-2 text-xs transition-colors">
            contact@fadhln.id
            {copied ? <CheckIcon /> : <CopyIcon />}
          </span>
        </button>
      </div>
    </aside>
  );
}

export default ContactFaq;
