/**
 * Tiny, dependency-free confetti burst.
 *
 * Fires two cannons from the bottom-left and bottom-right corners that pop
 * up and inward — used as the celebratory "Released!" moment. Renders onto a
 * fixed full-screen canvas appended to <body>, so it survives a client-side
 * route change (the confetti keeps falling as the image studio loads) and
 * removes itself once every particle has settled.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vr: number;
  life: number;
}

const COLORS = ["#c0542a", "#1E9E5A", "#E8B647", "#3B82F6", "#E85D9A", "#ffffff"];

export function fireReleaseConfetti(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:99999";
  const dpr = window.devicePixelRatio || 1;
  const resize = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
  };
  resize();
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }
  ctx.scale(dpr, dpr);

  const W = () => window.innerWidth;
  const H = () => window.innerHeight;
  const particles: Particle[] = [];

  // Spawn a burst from a corner. dir = +1 fires inward-right, -1 inward-left.
  const burst = (originX: number, dir: number, count: number) => {
    for (let i = 0; i < count; i++) {
      // Aim up and toward the centre, with spread.
      const angle = (-Math.PI / 2) + dir * (Math.random() * 0.6 + 0.15);
      const speed = 9 + Math.random() * 8;
      particles.push({
        x: originX,
        y: H() + 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 5 + Math.random() * 6,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        rotation: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        life: 0,
      });
    }
  };

  // A few staggered bursts so it "pops" rather than fires once.
  let bursts = 0;
  const maxBursts = 3;
  const launch = () => {
    burst(0, +1, 40);
    burst(W(), -1, 40);
    bursts += 1;
    if (bursts < maxBursts) setTimeout(launch, 180);
  };
  launch();

  window.addEventListener("resize", resize);

  const gravity = 0.28;
  const drag = 0.992;
  const start = Date.now();

  const tick = () => {
    ctx.clearRect(0, 0, W(), H());
    for (const p of particles) {
      p.vy += gravity;
      p.vx *= drag;
      p.vy *= drag;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vr;
      p.life += 1;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      // Fade out toward the end of the animation.
      ctx.globalAlpha = Math.max(0, 1 - (Date.now() - start) / 2600);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }

    const done = Date.now() - start > 2600;
    if (done) {
      window.removeEventListener("resize", resize);
      canvas.remove();
      return;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
