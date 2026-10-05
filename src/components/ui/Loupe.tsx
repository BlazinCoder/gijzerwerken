"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const LENS_SIZE = 220;
const ZOOM_LEVELS = [2, 3] as const;
type ZoomLevel = (typeof ZOOM_LEVELS)[number];
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const CONTROLS_INSET = 12;

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Positie langs één as uit een object-position-token, gegeven de vrije ruimte (box − beeld). */
function axisOffset(token: string | undefined, free: number): number {
  if (!token || token === "center") return free * 0.5;
  if (token === "left" || token === "top") return 0;
  if (token === "right" || token === "bottom") return free;
  if (token.endsWith("%")) return (free * parseFloat(token)) / 100;
  if (token.endsWith("px")) return parseFloat(token);
  return free * 0.5;
}

/**
 * De rechthoek waarin de foto werkelijk getekend wordt, relatief aan de img-box.
 * Bij `contain` is die kleiner dan de box (lege randen), bij `cover` groter (deel valt weg).
 */
export function getDrawnRect(
  boxW: number,
  boxH: number,
  naturalW: number,
  naturalH: number,
  objectFit: string,
  objectPosition: string,
): Rect {
  let w = boxW;
  let h = boxH;
  const contain = Math.min(boxW / naturalW, boxH / naturalH);
  if (objectFit === "contain") {
    w = naturalW * contain;
    h = naturalH * contain;
  } else if (objectFit === "cover") {
    const cover = Math.max(boxW / naturalW, boxH / naturalH);
    w = naturalW * cover;
    h = naturalH * cover;
  } else if (objectFit === "none") {
    w = naturalW;
    h = naturalH;
  } else if (objectFit === "scale-down") {
    const s = Math.min(1, contain);
    w = naturalW * s;
    h = naturalH * s;
  }

  let [px, py] = objectPosition.trim().split(/\s+/);
  // "top left" → horizontaal token staat achteraan
  if (px === "top" || px === "bottom" || py === "left" || py === "right") {
    [px, py] = [py, px];
  }
  return {
    x: axisOffset(px, boxW - w),
    y: axisOffset(py, boxH - h),
    w,
    h,
  };
}

interface Geometry {
  img: HTMLImageElement;
  srcAttr: string | null;
  url: string;
  /** Getekende beeldrechthoek, in layout-px van de container */
  drawn: Rect;
  /** Zichtbaar deel van het beeld (getekend ∩ img-box), in layout-px van de container */
  visible: { x0: number; y0: number; x1: number; y1: number };
}

interface PointerSample {
  clientX: number;
  clientY: number;
  overControls: boolean;
}

function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER_QUERY);
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

interface LoupeProps {
  /** Huidige foto; moet gelijk zijn aan de src van de img in `imgRef` */
  src: string;
  imgRef: RefObject<HTMLImageElement>;
  /** Extra klassen voor de container (die wordt `relative overflow-hidden`) */
  className?: string;
  /** Geen knop en geen loupe, bv. wanneer de foto niet laadt */
  disabled?: boolean;
  children: ReactNode;
}

/**
 * Opt-in vergrootglas: een ronde loupe met de foto als background-image (geen CSS scale,
 * die gaf glitches). Alleen op apparaten met hover + fijne pointer; op touch rendert hij
 * alleen de container. Muisbewegingen gaan via ref + requestAnimationFrame, niet via state.
 */
export default function Loupe({ src, imgRef, className = "", disabled = false, children }: LoupeProps) {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [zoom, setZoom] = useState<ZoomLevel>(2);

  const wrapRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const geoRef = useRef<Geometry | null>(null);
  const zoomRef = useRef<ZoomLevel>(zoom);
  const pointerRef = useRef<PointerSample | null>(null);
  const rafRef = useRef(0);

  const enabled = finePointer && !disabled;
  const zoomOn = enabled && active;

  const measure = useCallback(() => {
    const img = imgRef.current;
    const wrap = wrapRef.current;
    if (!img || !wrap || !img.naturalWidth || !wrap.contains(img)) {
      geoRef.current = null;
      return;
    }
    const wrapRect = wrap.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    // Lightbox schaalt bij openen; reken in layout-px zodat transforms niet meetellen
    const scale = wrapRect.width > 0 ? wrap.offsetWidth / wrapRect.width : 1;
    const boxX = (imgRect.left - wrapRect.left) * scale - wrap.clientLeft;
    const boxY = (imgRect.top - wrapRect.top) * scale - wrap.clientTop;
    const boxW = img.clientWidth;
    const boxH = img.clientHeight;
    const cs = getComputedStyle(img);
    const r = getDrawnRect(boxW, boxH, img.naturalWidth, img.naturalHeight, cs.objectFit, cs.objectPosition);
    const drawn = { x: boxX + r.x, y: boxY + r.y, w: r.w, h: r.h };
    const visible = {
      x0: boxX + Math.max(0, r.x),
      y0: boxY + Math.max(0, r.y),
      x1: boxX + Math.min(boxW, r.x + r.w),
      y1: boxY + Math.min(boxH, r.y + r.h),
    };
    geoRef.current = {
      img,
      srcAttr: img.getAttribute("src"),
      url: img.currentSrc || img.src,
      drawn,
      visible,
    };

    const controls = controlsRef.current;
    if (controls) {
      controls.style.top = `${visible.y0 + CONTROLS_INSET}px`;
      controls.style.right = `${wrap.clientWidth - visible.x1 + CONTROLS_INSET}px`;
    }
  }, [imgRef]);

  const hideLens = useCallback(() => {
    const lens = lensRef.current;
    if (lens) lens.style.opacity = "0";
    if (wrapRef.current) wrapRef.current.style.cursor = "";
  }, []);

  const flush = useCallback(() => {
    rafRef.current = 0;
    const p = pointerRef.current;
    const wrap = wrapRef.current;
    const lens = lensRef.current;
    const img = imgRef.current;
    if (!p || !wrap || !lens || !img || p.overControls) {
      hideLens();
      return;
    }
    let g = geoRef.current;
    if (!g || g.img !== img || g.srcAttr !== img.getAttribute("src")) {
      measure();
      g = geoRef.current;
    }
    // Tijdens de crossfade staat de oude foto nog in de ref: dan niets tonen
    if (!g || g.srcAttr !== src) {
      hideLens();
      return;
    }

    const wrapRect = wrap.getBoundingClientRect();
    const scale = wrapRect.width > 0 ? wrap.offsetWidth / wrapRect.width : 1;
    const x = (p.clientX - wrapRect.left) * scale - wrap.clientLeft;
    const y = (p.clientY - wrapRect.top) * scale - wrap.clientTop;
    const { visible, drawn } = g;
    if (x < visible.x0 || x > visible.x1 || y < visible.y0 || y > visible.y1) {
      hideLens();
      return;
    }

    const z = zoomRef.current;
    const half = LENS_SIZE / 2;
    if (lens.dataset.url !== g.url) {
      lens.style.backgroundImage = `url("${g.url}")`;
      lens.dataset.url = g.url;
    }
    lens.style.transform = `translate3d(${x - half}px, ${y - half}px, 0)`;
    lens.style.backgroundSize = `${drawn.w * z}px ${drawn.h * z}px`;
    lens.style.backgroundPosition = `${-((x - drawn.x) * z - half)}px ${-((y - drawn.y) * z - half)}px`;
    lens.style.opacity = "1";
    wrap.style.cursor = "crosshair";
  }, [hideLens, imgRef, measure, src]);

  const schedule = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(flush);
  }, [flush]);

  // Zoomniveau: ref bijwerken en direct opnieuw tekenen op de laatste muispositie
  useEffect(() => {
    zoomRef.current = zoom;
    if (zoomOn) schedule();
  }, [zoom, zoomOn, schedule]);

  // Opnieuw meten bij resize en bij elke nieuwe foto (load bubbelt niet, dus capture op de
  // container). Ook buiten de zoommodus, want de knop staat op de hoek van het echte beeld.
  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const remeasure = () => {
      measure();
      if (pointerRef.current) schedule();
    };
    remeasure();
    wrap.addEventListener("load", remeasure, true);
    const ro = new ResizeObserver(remeasure);
    ro.observe(wrap);
    return () => {
      wrap.removeEventListener("load", remeasure, true);
      ro.disconnect();
    };
  }, [enabled, src, measure, schedule]);

  // Esc zet de zoommodus uit, vóór andere Esc-handlers (bv. lightbox sluiten)
  useEffect(() => {
    if (!zoomOn) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      e.stopPropagation();
      // Focus op 2×/3× zou wegvallen als het segment verdwijnt
      if (controlsRef.current?.contains(document.activeElement)) toggleRef.current?.focus();
      setActive(false);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [zoomOn]);

  // Scrollen zonder muisbeweging verschuift de foto onder de cursor: opnieuw tekenen
  useEffect(() => {
    if (!zoomOn) return;
    const onScroll = () => {
      if (pointerRef.current) schedule();
    };
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => window.removeEventListener("scroll", onScroll, { capture: true });
  }, [zoomOn, schedule]);

  // Uit = alles terug naar normaal
  useEffect(() => {
    if (zoomOn) return;
    pointerRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    if (wrapRef.current) wrapRef.current.style.cursor = "";
  }, [zoomOn]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const track = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!zoomOn || e.pointerType === "touch") return;
    pointerRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      overControls: !!controlsRef.current?.contains(e.target as Node),
    };
    schedule();
  };

  const handlePointerLeave = () => {
    pointerRef.current = null;
    hideLens();
  };

  // In zoommodus opent een klik op de foto niets (alleen de knoppen werken)
  const handleClickCapture = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!zoomOn || controlsRef.current?.contains(e.target as Node)) return;
    e.preventDefault();
    e.stopPropagation();
  };

  const fade = { duration: reducedMotion ? 0 : 0.15 };

  return (
    <div
      ref={wrapRef}
      className={`relative isolate overflow-hidden ${className}`}
      onPointerEnter={track}
      onPointerMove={track}
      onPointerLeave={handlePointerLeave}
      onClickCapture={handleClickCapture}
    >
      {children}

      {zoomOn && (
        <div
          ref={lensRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 rounded-full border border-copper/40 bg-iron-900 bg-no-repeat opacity-0 shadow-xl shadow-black/60 transition-opacity duration-150 will-change-transform motion-reduce:transition-none"
          style={{ width: LENS_SIZE, height: LENS_SIZE }}
        />
      )}

      {enabled && (
        <div
          ref={controlsRef}
          role="group"
          aria-label="Vergrootglas"
          className="absolute right-3 top-3 z-20 flex flex-row-reverse items-center gap-2"
        >
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setActive((a) => !a)}
            aria-pressed={active}
            aria-label={active ? "Vergrootglas uit" : "Vergrootglas aan"}
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-iron-900/60 backdrop-blur-sm transition-colors hover:text-copper focus:outline-none focus-visible:ring-2 focus-visible:ring-copper ${
              active ? "text-copper ring-1 ring-copper/60" : "text-cream"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
              <path d="M11 8v6M8 11h6" />
            </svg>
          </button>

          <AnimatePresence>
            {active && (
              <motion.div
                key="zoom-levels"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={fade}
                className="flex items-center rounded-full bg-iron-900/60 p-0.5 text-xs font-medium backdrop-blur-sm"
              >
                {ZOOM_LEVELS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setZoom(level)}
                    aria-pressed={zoom === level}
                    className={`rounded-full px-2.5 py-1 tabular-nums transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-copper ${
                      zoom === level ? "bg-copper text-iron-900" : "text-cream/80 hover:text-copper"
                    }`}
                  >
                    {level}×
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
