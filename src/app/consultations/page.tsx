import type { Metadata } from "next";
import { ConsultationPreview } from "@/components/consultation-preview";
export const metadata: Metadata = { title: "A considered beginning" };
export default function Consultations() {
  return (
    <main id="main" className="consultation-page">
      <section>
        <p className="eyebrow">Let’s begin / Consultations</p>
        <h1>
          Every space
          <br />
          starts with
          <br />
          <em>a conversation.</em>
        </h1>
        <p>
          A new home. A different perspective.
          <br />
          An idea waiting to take shape.
        </p>
        <div className="consultation-mark" aria-hidden="true">
          16
        </div>
      </section>
      <ConsultationPreview />
    </main>
  );
}
