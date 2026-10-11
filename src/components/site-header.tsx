"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/studio";
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className={`site-header ${pathname === "/" ? "over-image" : ""}`}>
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
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
            <span></span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
