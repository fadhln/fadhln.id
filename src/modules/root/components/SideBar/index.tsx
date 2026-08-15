"use client";

import { SPRING_PANEL } from "-/modules/shared/constants/ease";
import { motion } from "motion/react";

import CommitHash from "./CommitHash";
import LocalTime from "./LocalTime";
import SideNav from "./SideNav";
import ToggleTrigger from "./ToggleTrigger";
import SideBarProvider, { useSideBarContext } from "./contexts/SideBarProvider";

function SideBarContent() {
  const { collapsed, reduce } = useSideBarContext();

  return (
    <aside className="bg-surface-elevated border-border shadow-border-r relative hidden h-svh shrink-0 md:flex">
      {/* Left */}
      <div className="flex min-w-12 flex-col">
        <div className="bg-brand h-12 w-full" />
        <div className="flex flex-1 flex-col border-r">
          <p className="my-auto px-4 font-semibold [writing-mode:sideways-lr]">
            fadhln<span className="text-brand">.id</span>
          </p>
          <div className="flex-1" />
          <div className="shadow-border-t h-12 w-12">
            <ToggleTrigger />
          </div>
        </div>
      </div>

      {/* Right */}
      <motion.div
        initial={false}
        data-state={collapsed ? "collapsed" : "expanded"}
        animate={{
          width: collapsed ? "var(--sidebar-width-icon)" : "var(--sidebar-width)",
        }}
        transition={reduce ? { duration: 0 } : SPRING_PANEL}
        className="flex-1 overflow-hidden will-change-[width]"
      >
        <div className="flex h-full min-w-(--sidebar-width) flex-col">
          <LocalTime />
          <CommitHash />
          <SideNav />
        </div>
      </motion.div>
    </aside>
  );
}

function SideBar() {
  return (
    <SideBarProvider>
      <SideBarContent />
    </SideBarProvider>
  );
}

export default SideBar;
