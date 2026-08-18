"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "motion/react";

import { useSideBarContext } from "./contexts/SideBarProvider";

type SideBarContentItem = {
  name: string;
  number: string;
  link: string;
};

type SideBarContentSection = {
  title: string;
  content: SideBarContentItem[];
};

const SIDEBAR_CONTENT: SideBarContentSection[] = [
  {
    title: "Menu",
    content: [
      { name: "Index", number: "01", link: "/" },
      { name: "Now", number: "02", link: "/now" },
    ],
  },
  {
    title: "Writings",
    content: [
      { name: "Snippets", number: "03", link: "/snippets" },
      { name: "Posts", number: "04", link: "/posts" },
      { name: "Notes", number: "05", link: "/notes" },
      { name: "Resources", number: "06", link: "/resources" },
    ],
  },
  {
    title: "Me",
    content: [
      { name: "About", number: "07", link: "/about" },
      { name: "Contact", number: "08", link: "/contact" },
    ],
  },
];

const allItems = SIDEBAR_CONTENT.flatMap((s) => s.content);

function SideNav() {
  const { collapsed } = useSideBarContext();

  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemElements = useRef<Map<string, HTMLElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState<{
    top: number;
    height: number;
  }>({ top: 0, height: 0 });

  const activeLink = useMemo(
    () =>
      pathname === "/"
        ? "/"
        : (allItems.find((i) => i.link !== "/" && pathname.startsWith(i.link))?.link ?? "/"),
    [pathname],
  );

  const registerItem = (link: string, el: HTMLElement | null) => {
    if (el) itemElements.current.set(link, el);
    else itemElements.current.delete(link);
  };

  useEffect(() => {
    function update() {
      const container = containerRef.current;
      const activeEl = itemElements.current.get(activeLink);
      if (!container || !activeEl) return;

      const containerRect = container.getBoundingClientRect();
      const itemRect = activeEl.getBoundingClientRect();

      setIndicatorStyle({
        top: itemRect.top - containerRect.top,
        height: itemRect.height,
      });
    }

    requestAnimationFrame(update);

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeLink]);

  return (
    <div ref={containerRef} className="relative py-4">
      <div
        className="bg-bg-inset absolute right-0 left-0 z-0 transition-all duration-200 ease-out"
        style={{
          top: indicatorStyle.top,
          height: indicatorStyle.height,
          opacity: indicatorStyle.height ? 1 : 0,
        }}
      />
      <motion.div
        className="absolute w-full"
        variants={{
          collapsed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
          expanded: { transition: { staggerChildren: 0.05 } },
        }}
        initial={false}
        animate={collapsed ? "collapsed" : "expanded"}
      >
        {SIDEBAR_CONTENT.map((section) => (
          <motion.div
            key={section.title}
            className="mb-4"
            variants={{
              collapsed: { opacity: 0, x: -10, filter: "blur(4px)" },
              expanded: { opacity: 1, x: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            <p className="text-on-bg-muted mx-4 text-xs tracking-widest uppercase">
              {section.title}
            </p>
            <ul className="mt-2 flex flex-col">
              {section.content.map((item) => (
                <li key={item.name} className="flex">
                  <Link
                    href={item.link}
                    ref={(el) => registerItem(item.link, el)}
                    className={`flex w-full items-baseline justify-between px-4 py-1 transition-colors ${
                      activeLink === item.link
                        ? "text-on-bg"
                        : "text-on-bg-secondary hover:text-on-bg"
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="text-on-bg-muted font-mono text-sm font-light">
                      {item.number}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default SideNav;
