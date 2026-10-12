import type { Metadata } from "next";
import { Photo, TextLink } from "@/components/editorial";
export const metadata: Metadata = { title: "NK Villa / Villa 16" };
export default function Project() {
  return (
    <main id="main" className="quiet-project">
      <section className="project-opening">
        <Photo
          className="project-opening-image"
          src="/images/interior.jpg"
          alt="Interior atmosphere reference for Villa 16"
          priority
        />
        <div className="project-opening-title">
          <p className="eyebrow">Selected work</p>
          <h1>Villa 16.</h1>
        </div>
      </section>
      <section className="project-caption">
        <h2>The beginning of Sixteen.</h2>
        <p>
          A defining chapter in the journey from New Address to Sixteen Creative
          Studio.
        </p>
      </section>
      <Photo
        className="project-detail-image"
        src="/images/material-detail.png"
        alt="Concept study of stone, timber and bronze"
      />
      <section className="project-caption">
        <h2>Considered, down to the detail.</h2>
      </section>
      <Photo
        className="project-detail-image"
        src="/images/living-room.jpg"
        alt="Sample living-space photography"
      />
      <div className="project-ending">
        <TextLink href="/consultations">Begin your project</TextLink>
      </div>
    </main>
  );
}
