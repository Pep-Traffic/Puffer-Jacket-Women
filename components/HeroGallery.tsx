"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Photo } from "@/lib/images";

type Item = { photo: Photo; label: string };

const HOLD_MS = 6400;
const DURATION = 1.9;
const EXPO = [0.16, 1, 0.3, 1] as const;

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// One fragment shader does all the work. The photograph is printed on quilted
// puffer fabric: a lattice of diamond pillows lit by a light that follows the
// pointer, with a glossy highlight. Between photographs the fabric deflates,
// the picture changes through one of three masks (liquid noise, baffle rows,
// a radial wave) with RGB split, then the fabric inflates again.
const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uA;
uniform sampler2D uB;
uniform float uP;
uniform float uTime;
uniform float uKind;
uniform float uAspect;
uniform float uAspA;
uniform float uAspB;
uniform float uEnergy;
uniform vec2 uMouse;
uniform vec2 uOrigin;

const float PI = 3.14159265;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}
vec2 cover(vec2 uv, float asp, float zoom) {
  vec2 s = uAspect > asp ? vec2(1.0, asp / uAspect) : vec2(uAspect / asp, 1.0);
  return ((uv - 0.5) / zoom) * s + 0.5;
}

void main() {
  vec2 uv = vUv;
  float p = uP;
  float e = sin(p * PI);

  // Quilted fabric: a diamond lattice of pillows. Fabric inflates on load,
  // deflates while the photograph changes, then inflates again.
  float intro = smoothstep(0.0, 2.4, uTime);
  float puff = p < 0.5 ? 1.0 - smoothstep(0.0, 0.4, p) : smoothstep(0.6, 1.0, p);
  puff *= intro;

  vec2 q = vec2(uv.x * uAspect, uv.y);
  q = mat2(0.7071, -0.7071, 0.7071, 0.7071) * q * 6.5;
  vec2 cell = fract(q) - 0.5;
  float hx = cos(cell.x * PI);
  float hy = cos(cell.y * PI);
  float h = pow(hx * hy, 0.7);
  vec2 g = vec2(-PI * sin(cell.x * PI) * hy, -PI * sin(cell.y * PI) * hx) * 0.7;
  g = mat2(0.7071, 0.7071, -0.7071, 0.7071) * g;
  vec3 nrm = normalize(vec3(-g * 0.55 * puff, 1.0));

  vec2 md = uv - uMouse;
  md.x *= uAspect;
  float d = length(md);
  vec2 rip = normalize(md + 1e-5) * sin(d * 30.0 - uTime * 3.2) * exp(-d * 5.0) * 0.010 * uEnergy;

  float n = fbm(uv * 3.0 + uTime * 0.04);
  vec2 dir = vec2(n - 0.5, fbm(uv * 3.0 + 7.3) - 0.5) * 2.0;

  float r;
  float bulge = 0.0;
  if (uKind < 0.5) {
    float f = n * 0.6 + uv.x * 0.4;
    r = 1.0 - smoothstep(p * 1.5 - 0.5, p * 1.5, f);
  } else if (uKind < 1.5) {
    float t = (1.0 - uv.y) * 5.0;
    float row = floor(t);
    float local = fract(t);
    float rowT = clamp(p * 1.7 - row * 0.14, 0.0, 1.0);
    r = smoothstep(local - 0.03, local + 0.01, rowT);
    bulge = sin(local * PI) * e * 0.03;
  } else {
    vec2 o = uv - uOrigin;
    o.x *= uAspect;
    float f = length(o) + n * 0.14;
    r = 1.0 - smoothstep(p * 1.9 - 0.35, p * 1.9, f);
  }

  // Each pillow bends the photograph like a lens.
  vec2 lens = nrm.xy * 0.02;
  vec2 disp = dir * 0.05 * e + vec2(0.0, bulge) + rip + lens;
  float drift = 0.012 * sin(uTime * 0.5);
  vec2 uvA = cover(uv + disp * p + lens * (1.0 - p), uAspA, 1.06 + 0.12 * p + drift);
  vec2 uvB = cover(uv - disp * (1.0 - p) + lens * p, uAspB, 1.18 - 0.12 * p + drift);

  float ab = 0.012 * e;
  vec3 ca = vec3(texture2D(uA, uvA + vec2(ab, 0.0)).r, texture2D(uA, uvA).g, texture2D(uA, uvA - vec2(ab, 0.0)).b);
  vec3 cb = vec3(texture2D(uB, uvB + vec2(ab, 0.0)).r, texture2D(uB, uvB).g, texture2D(uB, uvB - vec2(ab, 0.0)).b);
  vec3 col = mix(ca, cb, r);

  // Lighting on the fabric. The light follows the pointer; with no pointer it
  // sweeps slowly across so the surface never sits dead.
  vec2 lp = mix(vec2(0.5 + 0.4 * sin(uTime * 0.35), 0.5 + 0.25 * cos(uTime * 0.27)), uMouse, clamp(uEnergy * 2.0 + 0.0, 0.0, 1.0));
  lp = mix(lp, uMouse, 0.65);
  vec3 L = normalize(vec3((lp - uv) * vec2(uAspect, 1.0) * 1.4, 0.55));
  float diff = max(dot(nrm, L), 0.0);
  vec3 refl = reflect(-L, nrm);
  float spec = pow(max(refl.z, 0.0), 28.0);
  float lit = mix(1.0, 0.62 + 0.62 * diff, puff);
  col *= lit;
  col += vec3(1.0, 0.97, 0.9) * spec * 0.34 * puff;
  col *= mix(1.0, 0.55 + 0.45 * smoothstep(0.0, 0.35, h), puff * 0.85);

  float edge = r * (1.0 - r) * 4.0;
  col += edge * 0.22 * e;

  gl_FragColor = vec4(col, 1.0);
}`;

type GL = WebGLRenderingContext;

function compile(gl: GL, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function HeroGallery({ photos }: { photos: Item[] }) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  const outer = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const api = useRef<{ start: (i: number) => void } | null>(null);
  const live = useRef({ cur: 0, busy: false });

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end start"] });
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 56]);

  // The WebGL scene. Lives outside React state: the render loop never sets
  // state per frame, only on start and finish of a transition.
  useEffect(() => {
    const cv = canvas.current;
    const host = box.current;
    if (!cv || !host) return;
    const gl = cv.getContext("webgl", { antialias: false, alpha: false }) as GL | null;
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u: Record<string, WebGLUniformLocation | null> = {};
    ["uA", "uB", "uP", "uTime", "uKind", "uAspect", "uAspA", "uAspB", "uEnergy", "uMouse", "uOrigin"].forEach(
      (k) => (u[k] = gl.getUniformLocation(prog, k)),
    );
    gl.uniform1i(u.uA, 0);
    gl.uniform1i(u.uB, 1);

    const tex: (WebGLTexture | null)[] = photos.map(() => null);
    const asp: number[] = photos.map(() => 1);
    let loaded = 0;
    let firstDrawn = false;

    photos.forEach((item, i) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        const t = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        tex[i] = t;
        asp[i] = img.naturalWidth / img.naturalHeight;
        loaded += 1;
        draw();
      };
      img.src = item.photo.src;
    });

    const s = {
      cur: 0,
      next: -1,
      p: 0,
      kind: 0,
      count: 0,
      t0: 0,
      time: 0,
      last: 0,
      mouse: [0.5, 0.5],
      target: [0.5, 0.5],
      origin: [0.5, 0.5],
      energy: 0,
    };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(host!.clientWidth * dpr));
      const h = Math.max(1, Math.round(host!.clientHeight * dpr));
      if (cv!.width !== w || cv!.height !== h) {
        cv!.width = w;
        cv!.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }

    function draw() {
      const a = tex[s.cur];
      const b = s.next >= 0 ? tex[s.next] : tex[s.cur];
      if (!a || !b) return;
      resize();
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, a);
      gl!.activeTexture(gl!.TEXTURE1);
      gl!.bindTexture(gl!.TEXTURE_2D, b);
      gl!.uniform1f(u.uP, s.p);
      gl!.uniform1f(u.uTime, s.time);
      gl!.uniform1f(u.uKind, s.kind);
      gl!.uniform1f(u.uAspect, cv!.width / cv!.height);
      gl!.uniform1f(u.uAspA, asp[s.cur]);
      gl!.uniform1f(u.uAspB, asp[s.next >= 0 ? s.next : s.cur]);
      gl!.uniform1f(u.uEnergy, s.energy);
      gl!.uniform2f(u.uMouse, s.mouse[0], s.mouse[1]);
      gl!.uniform2f(u.uOrigin, s.origin[0], s.origin[1]);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      if (!firstDrawn) {
        firstDrawn = true;
        setReady(true);
      }
    }

    const ease = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

    api.current = {
      start(i: number) {
        if (i === s.cur || s.next >= 0 || !tex[i]) return;
        if (reduce) {
          s.cur = i;
          live.current.cur = i;
          setCurrent(i);
          draw();
          return;
        }
        s.next = i;
        s.kind = s.count % 3;
        s.count += 1;
        s.origin = [s.mouse[0], s.mouse[1]];
        s.t0 = performance.now();
        live.current.busy = true;
        setIncoming(i);
      },
    };

    let raf = 0;
    let visible = true;

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      const dt = Math.min(0.05, (now - (s.last || now)) / 1000);
      s.last = now;
      s.time += dt;

      s.mouse[0] += (s.target[0] - s.mouse[0]) * 0.12;
      s.mouse[1] += (s.target[1] - s.mouse[1]) * 0.12;
      s.energy *= 0.94;

      if (s.next >= 0) {
        const t = (now - s.t0) / 1000 / DURATION;
        s.p = ease(Math.min(1, t));
        if (t >= 1) {
          s.cur = s.next;
          s.next = -1;
          s.p = 0;
          live.current.cur = s.cur;
          live.current.busy = false;
          setCurrent(s.cur);
          setIncoming(null);
        }
      }
      draw();
    }

    function onMove(e: PointerEvent) {
      const r = host!.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = 1 - (e.clientY - r.top) / r.height;
      const dx = nx - s.target[0];
      const dy = ny - s.target[1];
      s.energy = Math.min(1, s.energy + Math.hypot(dx, dy) * 6);
      s.target = [nx, ny];
    }

    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(host);
    const ro = new ResizeObserver(() => draw());
    ro.observe(host);
    host.addEventListener("pointermove", onMove);

    if (reduce) {
      // Static: no loop. Redraw on resize and when a photograph is chosen.
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      tex.forEach((t) => t && gl.deleteTexture(t));
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
      api.current = null;
      void loaded;
    };
  }, [photos, reduce]);

  const go = useCallback((i: number) => api.current?.start(i), []);

  // Autoplay: pauses on hover and focus, off under reduced motion.
  useEffect(() => {
    if (reduce || paused || incoming !== null || !ready) return;
    const id = window.setTimeout(() => go((current + 1) % photos.length), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [reduce, paused, incoming, current, go, photos.length, ready]);

  const shown = photos[current];
  const label = photos[incoming ?? current].label;

  return (
    <motion.div
      ref={outer}
      className="gallery"
      style={reduce ? undefined : { scale: scrollScale, y: scrollY }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="gallery__main" ref={box}>
        {/* Fallback and first paint: a plain photograph until WebGL draws. */}
        <img
          className={`gallery__fallback${ready ? " is-hidden" : ""}`}
          src={shown.photo.src}
          alt={shown.photo.alt}
          width={shown.photo.width}
          height={shown.photo.height}
          fetchPriority="high"
        />
        <canvas
          ref={canvas}
          className={`gallery__canvas${ready ? " is-ready" : ""}`}
          role="img"
          aria-label={shown.photo.alt}
        />

        <div className="gallery__label" key={label} aria-label={label}>
          {label.split("").map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={reduce ? false : { y: "115%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.55, delay: reduce ? 0 : 0.4 + i * 0.03, ease: EXPO }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </div>
      </div>

      <ul className="gallery__thumbs" aria-label="Choose a photograph">
        {photos.map((item, i) => {
          const active = i === (incoming ?? current);
          return (
            <li key={item.photo.src}>
              <motion.button
                type="button"
                className={active ? "is-active" : undefined}
                aria-label={item.label}
                aria-pressed={active}
                onClick={() => go(i)}
                animate={reduce ? undefined : { y: active ? -6 : 0 }}
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ duration: 0.45, ease: EXPO }}
              >
                <img src={item.photo.src} alt="" width={120} height={150} loading="lazy" />
                {active && !reduce && incoming === null && !paused ? (
                  <motion.span
                    key={`${current}-bar`}
                    className="gallery__progress"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: HOLD_MS / 1000, ease: "linear" }}
                  />
                ) : null}
              </motion.button>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
