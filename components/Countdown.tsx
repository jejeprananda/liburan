"use client";

import { useEffect, useState } from "react";
import { tripDate } from "@/lib/destinations";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[4.5rem] flex-col items-center rounded-xl bg-white/15 px-4 py-3 backdrop-blur-sm sm:min-w-[5.5rem] sm:px-5 sm:py-4">
      <span className="text-3xl font-bold tabular-nums sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-xs uppercase tracking-wider text-white/80 sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    getTimeLeft(tripDate),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(tripDate));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <p className="text-xl font-semibold text-white sm:text-2xl">
        Liburan dimulai!
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-medium uppercase tracking-widest text-white/80 sm:text-base">
        Menuju liburan
      </p>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <TimeUnit value={timeLeft.days} label="Hari" />
        <TimeUnit value={timeLeft.hours} label="Jam" />
        <TimeUnit value={timeLeft.minutes} label="Menit" />
        <TimeUnit value={timeLeft.seconds} label="Detik" />
      </div>
      <p className="text-sm text-white/70">
        Sabtu, 15 Agustus 2026 · 12:00 WIB
      </p>
    </div>
  );
}
