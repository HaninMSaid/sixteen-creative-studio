"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/studio";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header
      className={`site-header quiet-header ${pathname === "/" ? "over-image" : ""}`}
    >
      <Link
        className="wordmark"
        href="/"
        aria-label="Sixteen Creative Studio home"
      >
        sixteen<span>CREATIVE STUDIO</span>
      </Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="navigation"
        className={open ? "navigation is-open" : "navigation"}
        aria-label="Main navigation"
      >
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
