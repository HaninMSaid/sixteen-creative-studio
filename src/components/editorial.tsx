import Link from "next/link";
import Image from "next/image";
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
    </Link>
  );
}
export function Photo({
  src = "/images/living-room.jpg",
  alt,
  className = "",
  priority = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 700px) 100vw, 90vw"
        priority={priority}
      />
    </div>
  );
}
export function Footer() {
  return (
    <footer className="site-footer quiet-footer">
      <Link className="footer-brand" href="/">
        sixteen
      </Link>
      <div className="footer-links">
        <Link href="/consultations">Contact</Link>
        <details className="image-notes">
          <summary>Image credits</summary>
          <p>
            Entrance, interior and antique scenes are concept imagery. Project
            photographs are temporary references, not the completed NK Villa.
          </p>
        </details>
      </div>
    </footer>
  );
}
export function ConsultationInvitation() {
  return (
    <section className="invitation">
      <p className="eyebrow">A considered beginning</p>
      <h2>
        Let’s make room
        <br />
        for <em>your story.</em>
      </h2>
      <TextLink href="/consultations">Explore a consultation</TextLink>
    </section>
  );
}
