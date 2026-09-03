import type { Point, TriangleVertices } from "./types";

export function getSign(point: Point, startLine: Point, endLine: Point) {
  const { x: x1, y: y1 } = point;
  const { x: x2, y: y2 } = startLine;
  const { x: x3, y: y3 } = endLine;

  return (x1 - x3) * (y2 - y3) - (x2 - x3) * (y1 - y3);
}

export function isPointInTriangle(point: Point, triangle: TriangleVertices): boolean {
  const { a, b, c } = triangle;
  const { x, y } = point;

  // Quick Bounding Box Check
  const minX = Math.min(a.x, b.x, c.x);
  const maxX = Math.max(a.x, b.x, c.x);
  if (x < minX || x > maxX) return false;

  const minY = Math.min(a.y, b.y, c.y);
  const maxY = Math.max(a.y, b.y, c.y);
  if (y < minY || y > maxY) return false;

  // Cross Product
  const d1 = getSign(point, a, b);
  const d2 = getSign(point, b, c);
  const d3 = getSign(point, c, a);

  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0;

  return !(hasNeg && hasPos);
}
