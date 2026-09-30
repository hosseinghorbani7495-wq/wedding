"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Countdown from "./Countdown";

interface ScratchCountdownProps { target: string; }

export default function ScratchCountdown({ target }: ScratchCountdownProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const movedRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const erasedRef = useRef(0);

  const drawCover = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#b17d2f");
    gradient.addColorStop(0.48, "#e2bf6f");
    gradient.addColorStop(1, "#9b6b28");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "rgba(255,255,255,.10)";
    for (let i = 0; i < 90; i += 1) {
      ctx.fillRect((i * 37) % rect.width, (i * 61) % rect.height, 1, 1);
    }
    ctx.globalCompositeOperation = "destination-out";
  }, []);

  useEffect(() => {
    if (done) return;
    drawCover();
    const handleResize = () => drawCover();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [done, drawCover]);

  const reveal = useCallback(() => setDone(true), []);

  const pointFromEvent = (event: React.PointerEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const scratch = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drawing || done) return;
    event.preventDefault();
    const canvas = canvasRef.current;
    const point = pointFromEvent(event);
    if (!canvas || !point) return;
    const last = lastPointRef.current;
    if (last && Math.hypot(point.x - last.x, point.y - last.y) > 6) movedRef.current = true;
    lastPointRef.current = point;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 22, 0, Math.PI * 2);
    ctx.fill();
    erasedRef.current += 1;
    if (erasedRef.current % 5 === 0) {
      try {
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let transparent = 0;
        for (let i = 3; i < data.length; i += 16) if (data[i] < 20) transparent += 1;
        const total = Math.ceil(data.length / 16);
        if (total && transparent / total > 0.3) reveal();
      } catch {
        // Canvas security/runtime errors should not break the invitation.
      }
    }
  };

  return (
    <div className="countdown-reveal" aria-label="شمارش معکوس تا آغاز دیدار">
      <div className="reveal-title">شمارش معکوس تا آغاز دیدار</div>
      <div ref={wrapRef} className="countdown-scratch">
        <Countdown target={target} />
        {!done && (
          <div
            className="scratch-overlay"
            onPointerDown={(event) => {
              if (event.pointerType === "mouse" && event.button !== 0) return;
              setDrawing(true);
              movedRef.current = false;
              lastPointRef.current = pointFromEvent(event);
              try { event.currentTarget.setPointerCapture(event.pointerId); } catch {}
              scratch(event);
            }}
            onPointerMove={scratch}
            onPointerUp={(event) => {
              setDrawing(false);
              if (!movedRef.current) reveal();
              try { event.currentTarget.releasePointerCapture(event.pointerId); } catch {}
            }}
            onPointerCancel={() => setDrawing(false)}
            onClick={reveal}
            aria-label="با لمس یا کشیدن انگشت این بخش را پاک کنید"
          >
            <canvas ref={canvasRef} />
            <div className="scratch-hint">برای دیدن شمارش معکوس<br />طلای این بخش را با لمس و کشیدن پاک کنید</div>
            <div className="scratch-caption">لمس، کشیدن انگشت یا ماوس</div>
          </div>
        )}
      </div>
    </div>
  );
}
