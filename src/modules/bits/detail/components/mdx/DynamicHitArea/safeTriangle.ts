// SafeTriangle — diagonal pointer prediction for submenu navigation.
// Port of the pattern from Pavlusha311245/prediction-cone
// (src/utils/safeTriangle.ts), minus the debug canvas: React renders the
// visualization from getVertices()/getSubmenuRect() instead.

// Problem it solves: in a vertical menu with submenus opening to the right,
// the cursor moves diagonally from the parent row toward the submenu and
// crosses other rows on the way. While the pointer is inside the safe zone
// (triangle ∪ submenu rect), row switches and closes are suppressed.

export type Point = { x: number; y: number };

export type TriangleVertices = {
  /** Apex: last cursor position on the parent row. */
  a: Point;
  /** Near-edge top corner of the submenu panel. */
  b: Point;
  /** Near-edge bottom corner of the submenu panel. */
  c: Point;
};

export type SafeTriangleOptions = {
  /** Grace period in ms before the zone expires after `startExpiry()`. */
  delay?: number;
  /** Padding in px added to the B/C corners, compensating borders and jitter. */
  padding?: number;
  /** Called when the expiry countdown finishes. */
  onExpire?: () => void;
};

function isPointInTriangle(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
): boolean {
  const sign = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) =>
    (x1 - x3) * (y2 - y3) - (x2 - x3) * (y1 - y3);
  const d1 = sign(px, py, ax, ay, bx, by);
  const d2 = sign(px, py, bx, by, cx, cy);
  const d3 = sign(px, py, cx, cy, ax, ay);
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNeg && hasPos);
}

export class SafeTriangle {
  private vertices: TriangleVertices | null = null;
  private submenuRect: DOMRect | null = null;
  private active = false;
  private expiryTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly delayMs: number;
  private readonly padding: number;
  private readonly onExpireCb: (() => void) | undefined;

  constructor(options: SafeTriangleOptions = {}) {
    this.delayMs = options.delay ?? 150;
    this.padding = options.padding ?? 2;
    this.onExpireCb = options.onExpire;
  }

  /** Activate the zone: apex = cursor on the parent row, rect = submenu rect. */
  activate(apex: Point, rect: DOMRect): void {
    this.clearExpiry();
    this.active = true;
    this.submenuRect = rect;
    this.computeVertices(apex, rect);
  }

  /** Re-aim the apex while the pointer is still over the parent row. */
  updateApex(apex: Point): void {
    if (!this.active || !this.submenuRect) return;
    this.computeVertices(apex, this.submenuRect);
  }

  /**
   * Safe zone = submenu rect ∪ triangle. A hit cancels any pending expiry,
   * so calling this from enter/move handlers keeps the zone alive en route.
   */
  isInSafeZone(px: number, py: number): boolean {
    if (!this.active) return false;

    if (this.submenuRect) {
      const r = this.submenuRect;
      if (px >= r.left && px <= r.right && py >= r.top && py <= r.bottom) {
        this.clearExpiry();
        return true;
      }
    }

    if (this.vertices) {
      const { a, b, c } = this.vertices;
      if (isPointInTriangle(px, py, a.x, a.y, b.x, b.y, c.x, c.y)) {
        this.clearExpiry();
        return true;
      }
    }

    return false;
  }

  /**
   * Start the expiry countdown. No-op if a timer is already running or the
   * zone is inactive.
   */
  startExpiry(): void {
    if (this.expiryTimer !== null || !this.active) return;
    this.expiryTimer = setTimeout(() => {
      this.expiryTimer = null;
      this.deactivate();
      this.onExpireCb?.();
    }, this.delayMs);
  }

  /** Abort a running expiry without deactivating the zone. */
  cancelExpiry(): void {
    this.clearExpiry();
  }

  /** Deactivate immediately. Does NOT call `onExpire`. */
  deactivate(): void {
    this.clearExpiry();
    this.active = false;
    this.vertices = null;
    this.submenuRect = null;
  }

  get isActive(): boolean {
    return this.active;
  }

  getVertices(): Readonly<TriangleVertices> | null {
    return this.active ? this.vertices : null;
  }

  getSubmenuRect(): DOMRect | null {
    return this.active ? this.submenuRect : null;
  }

  /** Both live geometry values, or null when inactive. For debug overlays. */
  getGeometry(): { vertices: Readonly<TriangleVertices>; rect: DOMRect } | null {
    if (!this.active || !this.vertices || !this.submenuRect) return null;
    return { vertices: this.vertices, rect: this.submenuRect };
  }

  /**
   * B and C sit on the submenu's near vertical edge: left when the submenu is
   * to the right of the apex, right when it opened to the left.
   */
  private computeVertices(apex: Point, rect: DOMRect): void {
    const submenuIsRight = apex.x < rect.left + rect.width / 2;
    const nearX = submenuIsRight ? rect.left : rect.right;
    this.vertices = {
      a: apex,
      b: { x: nearX, y: rect.top - this.padding },
      c: { x: nearX, y: rect.bottom + this.padding },
    };
  }

  private clearExpiry(): void {
    if (this.expiryTimer !== null) {
      clearTimeout(this.expiryTimer);
      this.expiryTimer = null;
    }
  }
}
