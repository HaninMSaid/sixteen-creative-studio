"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { storyBeats } from "@/data/story";

export function HomeStory() {
  const journey = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!journey.current) return;
        const rect = journey.current.getBoundingClientRect();
        const travel = journey.current.offsetHeight - window.innerHeight;
        setProgress(Math.max(0, Math.min(1, -rect.top / Math.max(1, travel))));
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      preference.removeEventListener("change", sync);
    };
  }, []);
  const position = Math.max(0, Math.min(4, progress * 4.7 - 0.3));
  const current = Math.round(position);
  if (reduced)
    return (
      <section className="reduced-story" id="studio">
        {storyBeats.map((beat) => (
          <article key={beat.id}>
            <Image src={beat.image} alt={beat.alt} fill sizes="100vw" />
            <div>
              <h1 className={beat.title ? undefined : "sr-only"}>
                {beat.title ?? "Sixteen Creative Studio"}
              </h1>
              {beat.href && (
                <Link className="story-action" href={beat.href}>
                  {beat.action}
                </Link>
              )}
            </div>
          </article>
        ))}
      </section>
    );
  return (
    <section
      className="story-journey"
      ref={journey}
      aria-label="The Sixteen story"
    >
      <span id="studio" className="studio-story-anchor" />
      <div className="story-canvas">
        <div className="story-images" aria-hidden="true">
          {storyBeats.map((beat, i) => {
            const opacity = Math.max(0, 1 - Math.abs(position - i));
            return (
              <div
                key={beat.id}
                className="story-image"
                style={{
                  opacity,
                  transform: `scale(${Math.max(1, beat.scale + Math.max(-0.02, Math.min(0.06, (position - i) * 0.05)))})`,
                }}
              >
                <Image
                  src={beat.image}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  style={{ objectPosition: beat.position }}
                />
              </div>
            );
          })}
        </div>
        <div className="story-shade" />
        <div className="story-copy-stage">
          {storyBeats.map((beat, i) => {
            const distance = position - i;
            const opacity = Math.max(0, 1 - Math.abs(distance) * 1.8);
            return (
              <article
                key={beat.id}
                className="story-beat"
                aria-hidden={current !== i}
                inert={current !== i}
                style={{
                  opacity,
                  transform: `translateY(${Math.max(-45, Math.min(45, -distance * 55))}px)`,
                }}
              >
                <h1 className={beat.title ? undefined : "sr-only"}>
                  {beat.title ?? "Sixteen Creative Studio"}
                </h1>
                {beat.href && (
                  <Link className="story-action" href={beat.href}>
                    {beat.action}
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
