"use client";

import { useEffect, useMemo, useState } from "react";

interface CountdownProps {
  target: string;
}
type CountdownValues = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getRemaining(targetMs: number): CountdownValues {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

export default function Countdown({ target }: CountdownProps) {
  const targetMs = useMemo(() => new Date(target).getTime(), [target]);
  const [value, setValue] = useState<CountdownValues>(() =>
    getRemaining(targetMs),
  );

  useEffect(() => {
    const update = () => setValue(getRemaining(targetMs));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  return (
    <div className="countdown" aria-label="شمارش معکوس تا مراسم">
      {(
        [
          ["days", "روز"],
          ["hours", "ساعت"],
          ["minutes", "دقیقه"],
          ["seconds", "ثانیه"],
        ] as const
      ).map(([key, label]) => (
        <div key={key}>
          <strong className="font-[Bonyade] font-semibold">
            {String(value[key]).padStart(2, "0")}
          </strong>
          <span className="text-[16px]">{label}</span>
        </div>
      ))}
    </div>
  );
}
