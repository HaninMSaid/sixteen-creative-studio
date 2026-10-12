import type { Metadata } from "next";
import { Photo, TextLink } from "@/components/editorial";
export const metadata: Metadata = { title: "The studio" };
export default function Studio() {
  return (
    <main id="main" className="studio-page">
      <section className="studio-introduction">
        <p className="eyebrow">The studio</p>
        <h1>
          Spaces with
          <br />
          <em>a point of view.</em>
        </h1>
        <p>
          Interiors, creative direction and collected objects. A personal way of
          seeing, brought into the spaces we live in.
        </p>
      </section>
      <Photo
        className="studio-portrait"
        src="/images/threshold-16.png"
        alt="Concept interior expressing the studio’s material direction"
        priority
      />
      <section className="studio-note">
        <h2>
          From New Address
          <br />
          to Sixteen.
        </h2>
        <div>
          <p>
            NK Villa marked a new chapter in the studio’s creative identity.
          </p>
          <TextLink href="/projects/nk-villa">Discover Villa 16</TextLink>
        </div>
      </section>
    </main>
  );
}
