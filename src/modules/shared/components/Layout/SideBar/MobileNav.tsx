"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SPRING_PANEL } from "-/modules/shared/constants/ease";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import CommitHash from "./CommitHash";
import LocalTime from "./LocalTime";
import SideNav from "./SideNav";

function MobileNav() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion() ?? false;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname) setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="bg-bg-elevated border-border fixed top-0 right-0 left-0 z-40 flex h-12 items-center justify-between border-b md:hidden">
        <Link
          href="/"
          aria-label="Go to home"
          className="from-brand-500 to-brand-400 relative h-12 w-12 bg-linear-to-tr from-50%"
        >
          <Image src="/logo.svg" alt="fadhln.id logo" fill className="object-contain" />
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          aria-expanded={open}
          className="text-on-bg border-border flex h-12 w-12 cursor-pointer items-center justify-center border-l"
        >
          <HamburgerMenuIcon />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="bg-bg-overlay absolute inset-0 cursor-pointer"
            />
            <motion.aside
              aria-label="Mobile navigation"
              aria-modal="true"
              className="bg-bg-elevated border-border relative flex h-full w-[min(20rem,calc(100%-2rem))] flex-col border-r"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={reduceMotion ? { duration: 0 } : SPRING_PANEL}
            >
              <div className="border-border flex h-12 items-center justify-between border-b">
                <Link
                  href="/"
                  aria-label="Go to home"
                  className="from-brand-500 to-brand-400 relative h-12 w-12 bg-linear-to-tr from-50%"
                >
                  <Image src="/logo.svg" alt="fadhln.id logo" fill className="object-contain" />
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation"
                  className="text-on-bg border-border flex h-12 w-12 cursor-pointer items-center justify-center border-l"
                >
                  <Cross1Icon />
                </button>
              </div>
              <LocalTime />
              <CommitHash />
              <div className="min-h-0 flex-1 overflow-y-auto">
                <SideNav />
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MobileNav;
