"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger, useReducedMotion } from "motion/react";

// A looping motion-graphic scene, built like a Lottie but in code so it stays
// sharp, tiny and themeable. One story per loop:
//   cold snow -> the jacket is drawn -> baffles inflate -> warmth rises,
//   heat rings spread, snow thins -> callouts name the details -> deflate.
// The markup is the finished frame, so reduced motion and no-JS show a complete
// illustration. Motion only runs when allowed.

const EXPO = [0.16, 1, 0.3, 1] as const;
const BODY_X = 330;

function rr(x: number, y: number, w: number, h: number, r: number) {
  return `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;
}

// Deterministic flakes: the same scene on server and client.
function flakes() {
  let s = 7;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: 46 }, (_, i) => ({
    id: i,
    x: Math.round(rnd() * 760),
    r: 1.4 + rnd() * 2.8,
    dur: 7 + rnd() * 7,
    delay: -rnd() * 12,
    dx: Math.round((rnd() - 0.5) * 70),
    o: 0.35 + rnd() * 0.5,
  }));
}
const FLAKES = flakes();

const bodyBaffles = Array.from({ length: 6 }, (_, i) => {
  const w = 204 + i * 7;
  return { d: rr(BODY_X - w / 2, 268 + i * 54, w, 62, 28), shine: rr(BODY_X - w / 2 + 16, 276 + i * 54, 34, 10, 5) };
});

const sleeveBaffles = Array.from({ length: 4 }, (_, j) => ({
  left: rr(150, 282 + j * 54, 64, 62, 26),
  right: rr(BODY_X * 2 - 150 - 64, 282 + j * 54, 64, 62, 26),
}));

const callouts = [
  { id: "hood", from: [388, 218], to: [540, 150], label: "Drawcord hood" },
  { id: "baffle", from: [412, 392], to: [540, 392], label: "Stitched baffles" },
  { id: "cuff", from: [466, 548], to: [540, 590], label: "Elastic cuffs" },
];

export default function HeroScene() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (reduce || !root.current) return;
    const el = root.current;
    let stop = false;
    const q = (sel: string) => Array.from(el.querySelectorAll<SVGElement>(sel));
    const wait = (s: number) => new Promise<void>((r) => window.setTimeout(r, s * 1000));

    async function reset() {
      await Promise.all([
        animate(q(".js-bp"), { strokeDashoffset: 1, fillOpacity: 0 }, { duration: 0 }),
        animate(q(".js-b"), { scaleY: 0.8, opacity: 1 }, { duration: 0 }),
        animate(q(".js-shine"), { opacity: 0 }, { duration: 0 }),
        animate(q(".js-zip"), { strokeDashoffset: 1 }, { duration: 0 }),
        animate(q(".js-rest"), { opacity: 0 }, { duration: 0 }),
        animate(q(".js-ring"), { opacity: 0, scale: 0.55 }, { duration: 0 }),
        animate(q(".js-meter"), { scaleY: 0.05 }, { duration: 0 }),
        animate(q(".js-lead"), { strokeDashoffset: 1 }, { duration: 0 }),
        animate(q(".js-dot"), { scale: 0, opacity: 0 }, { duration: 0 }),
        animate(q(".js-label"), { opacity: 0, x: -14 }, { duration: 0 }),
        animate(q(".js-snow"), { opacity: 1 }, { duration: 0 }),
        animate(q(".js-shadow"), { scaleX: 0.4, opacity: 0 }, { duration: 0 }),
      ]);
    }

    async function loop() {
      await reset();
      setLive(true);
      while (!stop) {
        // 1. Cold: snow only, the meter sits low.
        await animate(q(".js-meter"), { scaleY: 0.05 }, { duration: 0.01 });
        await wait(0.9);
        if (stop) return;

        // 2. The jacket is drawn, seam by seam.
        animate(q(".js-rest"), { opacity: 1 }, { duration: 0.6 });
        animate(q(".js-shadow"), { scaleX: 1, opacity: 1 }, { duration: 1.4, ease: EXPO });
        await animate(q(".js-bp"), { strokeDashoffset: [1, 0] }, { duration: 1.1, ease: "easeInOut", delay: stagger(0.05) });
        animate(q(".js-zip"), { strokeDashoffset: [1, 0] }, { duration: 0.9, ease: "easeInOut" });
        if (stop) return;

        // 3. Baffles inflate one after another.
        await animate(
          q(".js-bp"),
          { fillOpacity: [0, 1] },
          { duration: 0.6, delay: stagger(0.06), ease: "easeOut" },
        );
        animate(q(".js-shine"), { opacity: [0, 0.55] }, { duration: 0.8, delay: stagger(0.05) });
        await animate(
          q(".js-b"),
          { scaleY: [0.8, 1.07, 1] },
          { duration: 1.0, delay: stagger(0.07), ease: EXPO },
        );
        if (stop) return;

        // 4. Warmth: the meter rises, rings spread, the snow thins.
        animate(q(".js-meter"), { scaleY: [0.05, 0.94] }, { duration: 1.8, ease: EXPO });
        animate(q(".js-snow"), { opacity: [1, 0.3] }, { duration: 1.6 });
        animate(
          q(".js-ring"),
          { scale: [0.55, 1.25], opacity: [0.55, 0] },
          { duration: 2.2, delay: stagger(0.35), ease: "easeOut" },
        );
        await wait(0.8);
        if (stop) return;

        // 5. Callouts name the details.
        await Promise.all([
          animate(q(".js-lead"), { strokeDashoffset: [1, 0] }, { duration: 0.8, delay: stagger(0.18), ease: "easeInOut" }),
          animate(q(".js-dot"), { scale: [0, 1], opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.18), ease: EXPO }),
          animate(q(".js-label"), { opacity: [0, 1], x: [-14, 0] }, { duration: 0.7, delay: stagger(0.18, { startDelay: 0.5 }), ease: EXPO }),
        ]);
        if (stop) return;

        // 6. Hold, with the baffles breathing.
        await animate(q(".js-b"), { scaleY: [1, 1.035, 1] }, { duration: 2.2, delay: stagger(0.12), ease: "easeInOut" });
        await animate(q(".js-b"), { scaleY: [1, 1.035, 1] }, { duration: 2.2, delay: stagger(0.12), ease: "easeInOut" });
        if (stop) return;

        // 7. Reset: callouts clear, the jacket deflates, the snow returns.
        animate(q(".js-label"), { opacity: 0 }, { duration: 0.4 });
        animate(q(".js-lead"), { opacity: [1, 0] }, { duration: 0.4 });
        animate(q(".js-dot"), { opacity: 0 }, { duration: 0.4 });
        animate(q(".js-snow"), { opacity: 1 }, { duration: 1.2 });
        await Promise.all([
          animate(q(".js-meter"), { scaleY: 0.05 }, { duration: 0.9, ease: "easeInOut" }),
          animate(q(".js-b"), { scaleY: 0.8 }, { duration: 0.7, delay: stagger(0.04, { from: "last" }), ease: "easeIn" }),
          animate(q(".js-bp"), { fillOpacity: 0 }, { duration: 0.7, delay: stagger(0.04, { from: "last" }) }),
          animate(q(".js-shine"), { opacity: 0 }, { duration: 0.5 }),
        ]);
        await animate(q(".js-rest, .js-shadow"), { opacity: 0 }, { duration: 0.5 });
        await reset();
        await animate(q(".js-lead"), { opacity: 1 }, { duration: 0 });
      }
    }

    loop();
    return () => {
      stop = true;
    };
  }, [reduce]);

  return (
    <div ref={root} className={`scene${live ? " is-live" : ""}${reduce ? "" : " is-armed"}`}>
      <svg
        viewBox="0 0 760 700"
        role="img"
        aria-label="Animated illustration: snow falls, a puffer jacket is drawn and its baffles inflate, the warmth meter rises, and the hood, baffles and cuffs are labelled."
      >
        <rect width="760" height="700" className="scene__bg" />

        {/* Warmth rings */}
        <g>
          {[130, 185, 240].map((r) => (
            <circle key={r} cx={BODY_X} cy={440} r={r} className="js-ring scene__ring" />
          ))}
        </g>

        {/* Ground shadow */}
        <ellipse cx={BODY_X} cy={650} rx={170} ry={14} className="js-shadow scene__shadow" />

        {/* Warmth meter */}
        <g className="js-rest">
          <rect x="52" y="210" width="16" height="320" className="scene__track" />
          <rect x="52" y="210" width="16" height="320" className="js-meter scene__meter" />
          <circle cx="60" cy="548" r="22" className="scene__bulb" />
          <text x="86" y="224" className="scene__small">Warm</text>
          <text x="86" y="530" className="scene__small">Cold</text>
        </g>

        {/* Sleeves, body, hood: baffles drawn and inflated by the timeline */}
        <g className="scene__sleeve">
          <g transform="rotate(-14 214 290)">
            {sleeveBaffles.map((b, i) => (
              <g key={`l${i}`} className="js-b">
                <path d={b.left} className="js-bp scene__baffle scene__baffle--sleeve" pathLength={1} />
              </g>
            ))}
          </g>
          <g transform="rotate(14 446 290)">
            {sleeveBaffles.map((b, i) => (
              <g key={`r${i}`} className="js-b">
                <path d={b.right} className="js-bp scene__baffle scene__baffle--sleeve" pathLength={1} />
              </g>
            ))}
          </g>
        </g>

        <g>
          {bodyBaffles.map((b, i) => (
            <g key={i} className="js-b">
              <path d={b.d} className="js-bp scene__baffle" pathLength={1} />
              <path d={b.shine} className="js-shine scene__shine" />
            </g>
          ))}
        </g>

        <g className="js-b">
          <path
            d={`M${BODY_X - 100} 276C${BODY_X - 108} 170 ${BODY_X + 108} 170 ${BODY_X + 100} 276Z`}
            className="js-bp scene__baffle scene__baffle--hood"
            pathLength={1}
          />
        </g>
        <g className="js-b">
          <path d={rr(BODY_X - 56, 250, 112, 32, 16)} className="js-bp scene__baffle scene__baffle--hood" pathLength={1} />
        </g>
        <path
          d={`M${BODY_X} 282V598`}
          className="js-zip scene__zip"
          pathLength={1}
        />

        {/* Callouts */}
        {callouts.map((c) => (
          <g key={c.id}>
            <path
              d={`M${c.from[0]} ${c.from[1]}L${c.to[0] - 18} ${c.to[1]}H${c.to[0]}`}
              className="js-lead scene__lead"
              pathLength={1}
            />
            <circle cx={c.from[0]} cy={c.from[1]} r="6" className="js-dot scene__dot" />
            <text x={c.to[0] + 10} y={c.to[1] + 5} className="js-label scene__label">
              {c.label}
            </text>
          </g>
        ))}

        {/* Snow: three speeds give depth. Pure CSS, so it never costs JS. */}
        <g className="js-snow">
          {FLAKES.map((f) => (
            <circle
              key={f.id}
              cx={f.x}
              cy={0}
              r={f.r}
              className="scene__flake"
              style={
                {
                  "--dur": `${f.dur}s`,
                  "--delay": `${f.delay}s`,
                  "--dx": `${f.dx}px`,
                  opacity: f.o,
                } as React.CSSProperties
              }
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
