"use client";

import { useEffect, useRef, useState } from "react";

const tracks = ["/audio/wedding-music.mp3"];

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  useEffect(() => {
    const playAfterEnvelope = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.src = tracks[0];
      audio.volume = 0.78;
      void audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };

    window.addEventListener("invitation-opened", playAfterEnvelope);
    return () =>
      window.removeEventListener("invitation-opened", playAfterEnvelope);
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      if (!audio.src) audio.src = tracks[trackIndex];
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="none"
        onEnded={() => {
          const next = (trackIndex + 1) % tracks.length;
          setTrackIndex(next);
          const audio = audioRef.current;
          if (!audio) return;
          audio.src = tracks[next];
          void audio.play().catch(() => setPlaying(false));
        }}
      />
      <button className="outline-btn" type="button" onClick={toggle}>
        {playing ? "Ⅱ توقف موسیقی" : "♫ پخش موسیقی"}
      </button>
    </>
  );
}
