"use client";

import { useEffect, useState } from "react";

interface EnvelopeGateProps {
  groom: string;
  bride: string;
}

export default function EnvelopeGate({ groom, bride }: EnvelopeGateProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("invitation-locked");
    return () => document.body.classList.remove("invitation-locked");
  }, []);

  const openEnvelope = () => {
    if (open) return;
    setOpen(true);
    window.dispatchEvent(new CustomEvent("invitation-opened"));
    window.setTimeout(() => document.body.classList.remove("invitation-locked"), 850);
  };

  return (
    <div className={`envelope-screen ${open ? "opened" : ""}`} aria-label="پاکت دعوت‌نامه">
      <div
        className={`envelope-stage ${open ? "open" : ""}`}
        role="button"
        tabIndex={0}
        aria-label="گشودن دعوت‌نامه"
        onClick={openEnvelope}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openEnvelope();
          }
        }}
      >
        <div className="envelope-back" />
        <div className="envelope-pocket" />
        <div className="envelope-flap" />
        <div className="envelope-feather" aria-hidden="true">🪶</div>
        <div className="envelope-seal" aria-hidden="true" />
        <div className="envelope-label">
          <strong>{groom} و {bride}</strong>
          برای گشودن این نامه، لمس کنید
        </div>
      </div>
    </div>
  );
}
