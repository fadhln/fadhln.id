import { TrashIcon } from "@radix-ui/react-icons";

import type { MenuItem } from "./types";

export const DUMMY_DATA: MenuItem[][] = [
  [
    {
      text: "New File",
      symbol: "⌘N",
    },
    {
      text: "Open",
      symbol: "⌘O",
    },
  ],
  [
    {
      text: "Export",
      children: [
        {
          text: "Microsoft Word (.docx)",
        },
        {
          text: "PDF Document (.pdf)",
        },
        {
          text: "Plain Text (.txt)",
        },
      ],
    },
    {
      text: "Share",
      children: [
        {
          text: "Copy link",
        },
        {
          text: "Publish to Web",
        },
      ],
    },
  ],
  [
    {
      text: "Print",
      children: [
        {
          text: "Print current tab",
          symbol: "⌘P",
        },
        {
          text: "Print all tabs",
        },
      ],
    },
    {
      text: "Delete",
      symbol: <TrashIcon />,
      isDanger: true,
    },
  ],
];
