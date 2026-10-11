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
  function goTo(index: number) {
    if (!journey.current) return;
    const top = window.scrollY + journey.current.getBoundingClientRect().top;
    const travel = journey.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + ((index + 0.3) / 4.7) * travel,
      behavior: reduced ? "instant" : "smooth",
    });
  }
  if (reduced)
    return (
      <section className="reduced-story" id="studio">
        {storyBeats.map((beat) => (
          <article key={beat.id}>
            <Image src={beat.image} alt={beat.alt} fill sizes="100vw" />
            <div>
              <p className="eyebrow">{beat.eyebrow}</p>
              <h1>
                {beat.title[0]}
                <br />
                <em>{beat.title[1]}</em>
              </h1>
              <p>{beat.text}</p>
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
                  transform: `scale(${beat.scale + Math.max(-0.02, Math.min(0.06, (position - i) * 0.05))})`,
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
                <p className="eyebrow">{beat.eyebrow}</p>
                <h1>
                  {beat.title[0]}
                  <br />
                  <em>{beat.title[1]}</em>
                </h1>
                <p className="story-paragraph">{beat.text}</p>
                {beat.href && (
                  <Link className="story-action" href={beat.href}>
                    {beat.action}
                  </Link>
                )}
              </article>
            );
          })}
        </div>
        <div className="story-rail">
          <p className="story-scroll-cue">
            {current === 4
              ? "The next chapter is yours"
              : "Scroll to follow the story"}
          </p>
          <nav aria-label="Story chapters">
            {storyBeats.map((beat, i) => (
              <button
                key={beat.id}
                onClick={() => goTo(i)}
                aria-current={current === i ? "step" : undefined}
              >
                <span>0{i + 1}</span>
                {beat.label}
              </button>
            ))}
          </nav>
          <span className="story-count">
            0{current + 1}
            <i> / 05</i>
          </span>
        </div>
        <div className="story-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
        <p className="story-image-credit">
          {current === 2
            ? "NK Villa atmosphere reference · final photography to follow"
            : "Illustrative atmosphere · antique concept study"}
        </p>
      </div>
    </section>
  );
}
