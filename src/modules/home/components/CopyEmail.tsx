"use client";

import { useCallback, useRef, useState } from "react";

import { ActionSwapButton, type ActionSwapItem } from "-/modules/shared/components/Button";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

const EMAIL = "contact@fadhln.id";
const RESET_DELAY = 1000;

type ItemId = "copy" | "success";

const ITEMS: ActionSwapItem<ItemId>[] = [
  {
    id: "copy",
    label: "E-Mail",
    icon: <CopyIcon />,
  },
  {
    id: "success",
    label: "Copied",
    icon: <CheckIcon />,
  },
];

function CopyEmail() {
  const [value, setValue] = useState<ItemId>("copy");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(EMAIL);
    setValue("success");
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setValue("copy"), RESET_DELAY);
  }, []);

  return <ActionSwapButton variant="secondary" items={ITEMS} value={value} onClick={handleClick} />;
}

export default CopyEmail;
