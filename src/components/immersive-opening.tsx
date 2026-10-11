"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
export function ImmersiveOpening() {
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!hero.current) return;
        const progress = Math.min(
          1,
          Math.max(0, window.scrollY / hero.current.offsetHeight),
        );
        hero.current.style.setProperty("--journey", String(progress));
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <section ref={hero} className="immersive-opening">
      <div className="opening-stage">
        <Image
          src="/images/antique-atelier.png"
          alt="Conceptual antique atelier with a carved chair, patinated vessel and gilded mirror"
          fill
          priority
          sizes="100vw"
        />
        <div className="opening-shade" />
        <div className="opening-whisper">
          <p>THE ART OF LIVING WITH</p>
          <h1>meaning.</h1>
        </div>
        <div className="opening-bottom">
          <p>Interiors. Objects. A personal world.</p>
          <a href="#studio">
            Enter the studio
            <span className="scroll-thread" />
          </a>
          <span>01 — SIXTEEN</span>
        </div>
        <p className="concept-caption">Atmosphere concept</p>
      </div>
    </section>
  );
}
