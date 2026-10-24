"use client";

import { useEffect, useState } from "react";

import { truckInfo } from "@/data/bangkok99";

import { OrderButton } from "./SiteProvider";
import { Wordmark } from "./Wordmark";

const navLinks = [
  { href: "#menu", label: "Menu" },
  { href: "#find-us", label: "Find us" },
  { href: "#about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-char/10 bg-rice/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="shrink-0" aria-label="Bangkok99 Food Truck, back to top">
          <Wordmark className="text-[1.6rem]" />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 font-semibold">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-tamarind transition-colors hover:text-chili">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a href={truckInfo.phoneHref} className="font-bold whitespace-nowrap text-char hover:text-chili">
            {truckInfo.phone}
          </a>
          <OrderButton className="rounded-full bg-chili px-5 py-2.5 font-display font-bold whitespace-nowrap text-white transition-colors hover:bg-chili-dark" />
        </div>

        <button
          type="button"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-saffron text-char md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-char/10 bg-rice md:hidden">
          <ul className="flex flex-col px-4 py-2 text-base font-bold text-char">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="block py-3" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
