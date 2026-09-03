"use client";

import { useEffect, useState } from "react";

import Checkbox from "-/modules/shared/components/Checkbox/Checkbox";

import Menu from "./Menu";
import { DUMMY_DATA } from "./constants";

function HoverTriangle() {
  const [safeHover, setSafeHover] = useState(false);
  const [showHitArea, setShowHitArea] = useState(false);

  useEffect(() => {
    if (safeHover === false) {
      setShowHitArea(false);
    }
  }, [safeHover]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Menu data={DUMMY_DATA} safeHover={safeHover} />
      <div className="mt-8 flex items-center gap-2">
        <Checkbox
          label="Enable Hover Area"
          checked={safeHover}
          onCheckedChange={(c) => setSafeHover(c === true)}
          size="sm"
        />
        <div className="border-border h-full w-px border-l" />
        <Checkbox
          label="Show Hit Area"
          checked={showHitArea}
          disabled={!safeHover}
          onCheckedChange={(c) => setShowHitArea(c === true)}
          size="sm"
        />
      </div>
    </div>
  );
}

export default HoverTriangle;
