import type { Metadata } from "next";
import { Photo, ConsultationInvitation } from "@/components/editorial";
import { chapters } from "@/data/studio";
export const metadata: Metadata = { title: "NK Villa / Villa 16" };
export default function Project() {
  return (
    <main id="main">
      <section className="page-intro">
        <p className="eyebrow">Selected work / Residential</p>
        <h1>
          NK Villa.
          <br />
          <em>The beginning of Sixteen.</em>
        </h1>
        <div className="intro-bottom">
          <p>A defining project. A new creative identity.</p>
          <span>VILLA 16 / DESIGN & EXECUTION</span>
        </div>
      </section>
      <Photo
        className="project-hero"
        src="/images/interior.jpg"
        alt="Atmosphere reference for NK Villa; not actual project photography"
        priority
      />
      <p className="photo-disclaimer">
        Visual direction only — sample photography. Final NK Villa images,
        drawings and project details will replace these references.
      </p>
      <section className="project-story">
        <aside>
          <p className="eyebrow">The evolution</p>
          <h2>
            From an idea.
            <br />
            To <em>real life.</em>
          </h2>
          <nav aria-label="Project chapters">
            {chapters.map((c) => (
              <a href={`#chapter-${c.number}`} key={c.number}>
                {c.number} / {c.title}
              </a>
            ))}
          </nav>
          <p className="small">New Address → NK Villa → Sixteen</p>
        </aside>
        <div>
          {chapters.map((c, i) => (
            <article
              id={`chapter-${c.number}`}
              className="chapter"
              key={c.number}
            >
              <span className="eyebrow">Chapter {c.number}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              {i === 0 ? (
                <div
                  className="drawing-study"
                  role="img"
                  aria-label="Illustrative spatial diagram, not an NK Villa floor plan"
                >
                  <div className="plan-line one" />
                  <div className="plan-line two" />
                  <div className="plan-line three" />
                  <span>CONCEPT / SPATIAL STUDY</span>
                  <small>Illustrative diagram</small>
                </div>
              ) : i === 1 ? (
                <div className="material-study">
                  <div>01 / Stone</div>
                  <div>02 / Timber</div>
                  <div>03 / Linen</div>
                </div>
              ) : (
                <Photo alt="Sample completed living space representing the final chapter" />
              )}
            </article>
          ))}
        </div>
      </section>
      <ConsultationInvitation />
    </main>
  );
}
