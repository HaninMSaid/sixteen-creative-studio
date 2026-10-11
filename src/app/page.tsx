import {
  Photo,
  TextLink,
  ConsultationInvitation,
} from "@/components/editorial";
import { ImmersiveOpening } from "@/components/immersive-opening";
import { RevealObserver } from "@/components/reveal";
export default function Home() {
  return (
    <main id="main">
      <RevealObserver />
      <ImmersiveOpening />
      <section id="studio" className="studio-manifesto">
        <p className="eyebrow">The world of Sixteen</p>
        <h2>
          Some spaces are seen.
          <br />
          Others are <em>felt.</em>
        </h2>
        <div className="manifesto-bottom">
          <span className="manifesto-number">16</span>
          <div>
            <p>
              We are drawn to the things that hold a story. A material shaped by
              time. An unexpected proportion. The quiet dialogue between an
              object and a room.
            </p>
            <p>
              Sixteen Creative Studio brings a personal perspective to
              interiors, creative direction and the art of living.
            </p>
            <TextLink href="/projects/nk-villa">
              Discover our perspective
            </TextLink>
          </div>
        </div>
      </section>
      <section className="cinematic-project">
        <Photo
          src="/images/interior.jpg"
          alt="Temporary architectural reference for the NK Villa story"
        />
        <div className="cinematic-project-copy">
          <p className="eyebrow">A defining chapter / NK Villa</p>
          <h2>
            Before Sixteen,
            <br />
            there was <em>Villa 16.</em>
          </h2>
          <TextLink href="/projects/nk-villa">Step inside the story</TextLink>
        </div>
        <span className="cinematic-note">
          Project atmosphere reference · final photography to follow
        </span>
      </section>
      <section className="collector-invitation">
        <div>
          <p className="eyebrow">Objects of desire</p>
          <h2>
            A collector’s eye.
            <br />
            <em>An uncommon world.</em>
          </h2>
          <p>
            Look around. Move closer. Discover the pieces that give a room its
            character.
          </p>
          <TextLink href="/objects-of-desire">Enter the room in 360°</TextLink>
        </div>
        <a href="/objects-of-desire" aria-label="Enter the antique room">
          <Photo
            src="/images/antique-atelier.png"
            alt="Antique objects in an atmospheric private atelier"
          />
        </a>
      </section>
      <ConsultationInvitation />
    </main>
  );
}
