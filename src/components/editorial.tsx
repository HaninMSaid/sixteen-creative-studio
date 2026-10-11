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
      <span aria-hidden="true"></span>
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
    <footer className="site-footer">
      <div>
        <Link className="footer-brand" href="/">
          sixteen
        </Link>
        <p>Private and selective. Always.</p>
      </div>
      <div>
        <p>Spaces. Objects. Perspectives.</p>
        <p className="sample-note">
          Design preview · Sample photography & content
        </p>
      </div>
      <Link href="/consultations">Start a conversation </Link>
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
