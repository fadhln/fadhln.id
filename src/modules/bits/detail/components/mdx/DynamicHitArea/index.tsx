"use client";

import { useState } from "react";

import { Button } from "-/modules/shared/components/Button";

function DynamicHitArea() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>{count}</div>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add
      </Button>
    </div>
  );
}

export default DynamicHitArea;
