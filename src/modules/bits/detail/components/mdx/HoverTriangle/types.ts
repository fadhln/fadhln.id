import type { ReactNode } from "react";

export type SubItem = { text: string; symbol?: ReactNode };
export type MenuItem = SubItem & { children?: MenuItem[]; isDanger?: boolean };

export type Point = { x: number; y: number };
export type TriangleVertices = {
  a: Point; // Apex, the last cursor position on the row
  b: Point; // Top corner
  c: Point; // Bottom corner
};
