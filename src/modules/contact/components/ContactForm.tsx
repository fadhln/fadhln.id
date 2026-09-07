"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Script from "next/script";

import { Button } from "-/modules/shared/components/Button";
import { Field } from "@base-ui/react/field";
import { Form } from "@base-ui/react/form";

import ContactFaq from "./ContactFaq";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Turnstile = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId?: string) => void;
  remove?: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

type ContactValues = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const renderTurnstile = useCallback(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current || !window.turnstile || widgetId.current) {
      return;
    }

    widgetId.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      action: "contact",
      callback: setTurnstileToken,
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
    });
  }, []);

  useEffect(() => {
    renderTurnstile();

    return () => {
      const id = widgetId.current;
      if (id && window.turnstile?.remove) {
        window.turnstile.remove(id);
        widgetId.current = undefined;
      }
    };
  }, [renderTurnstile]);

  async function submit(values: ContactValues) {
    if (!turnstileToken) {
      setErrorMessage("Please complete the verification challenge.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken }),
      });

      if (!response.ok) throw new Error("The message could not be sent.");

      formRef.current?.reset();
      setTurnstileToken("");
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "The message could not be sent.");
    }
  }

  return (
    <div className="border-border bg-bg-secondary flex gap-6 border p-4 md:p-6">
      <Form
        ref={formRef}
        onFormSubmit={(values) => void submit(values as ContactValues)}
        className="flex flex-1 flex-col gap-5"
      >
        <div>
          <p className="text-xl font-semibold">Project Inquiries</p>
          <p className="text-on-bg-secondary mt-0.5 text-sm">
            Reach out to collaborate on a project with me.
          </p>
        </div>
        <Field.Root
          name="name"
          className="flex flex-col gap-2"
          validate={(value) => (!value ? "Name is required." : null)}
        >
          <Field.Label className="text-xxs text-on-bg-secondary font-mono tracking-wider uppercase">
            Name
          </Field.Label>
          <Field.Control
            placeholder="John Smith"
            className="border-border-strong bg-bg placeholder:text-on-bg-muted focus:border-primary h-10 border px-3 text-sm outline-none"
          />
          <Field.Error className="text-error-text text-xs" />
        </Field.Root>

        <Field.Root
          name="email"
          className="flex flex-col gap-2"
          validate={(value) => {
            if (!value) return "Email is required.";
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))
              ? null
              : "Enter a valid email address.";
          }}
        >
          <Field.Label className="text-xxs text-on-bg-secondary font-mono tracking-wider uppercase">
            Email
          </Field.Label>
          <Field.Control
            type="email"
            placeholder="you@fadhln.id"
            className="border-border-strong bg-bg placeholder:text-on-bg-muted focus:border-primary h-10 border px-3 text-sm outline-none"
          />
          <Field.Error className="text-error-text text-xs" />
        </Field.Root>

        <Field.Root
          name="message"
          className="flex flex-col gap-2"
          validate={(value) => (!value ? "Message is required." : null)}
        >
          <Field.Label className="text-xxs text-on-bg-secondary font-mono tracking-wider uppercase">
            Message
          </Field.Label>
          <Field.Control
            render={<textarea rows={6} />}
            placeholder="Type or speak your message..."
            className="border-border-strong bg-bg placeholder:text-on-bg-muted focus:border-primary resize-y border px-3 py-2 text-sm outline-none"
          />
          <Field.Error className="text-error-text text-xs" />
        </Field.Root>

        <input
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
        />

        <div ref={turnstileRef} />
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={renderTurnstile}
        />

        <div className="flex flex-col gap-3">
          <Button type="submit" disabled={status === "sending" || !TURNSTILE_SITE_KEY}>
            {status === "sending" ? "Sending..." : "Send message"}
          </Button>
          {status === "success" && <p className="text-success-text text-sm">Message sent.</p>}
          {status === "error" && <p className="text-error-text text-sm">{errorMessage}</p>}
        </div>
      </Form>
      <div className="border-border w-px border-l" />
      <ContactFaq />
    </div>
  );
}

export default ContactForm;
