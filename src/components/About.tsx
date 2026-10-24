import { about, truckInfo } from "@/data/bangkok99";

import { Bowl } from "./Icons";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-chili-dark py-20 text-white sm:py-24">
      <Bowl className="absolute -right-10 -bottom-10 w-64 text-white/10" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="inline-block -rotate-2 rounded-lg bg-saffron px-3 py-1 font-display text-sm font-bold tracking-wide text-char uppercase">About</p>
        <h2 id="about-title" className="mt-3 font-display text-4xl leading-tight font-extrabold text-saffron-light sm:text-5xl">
          Thai Street Food, Made Fresh
        </h2>
        <div className="mt-5 space-y-3 text-lg leading-relaxed text-saffron-soft sm:text-xl">
          {about.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <a
          href={truckInfo.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full border-2 border-saffron-soft px-6 py-3 font-bold transition-colors hover:bg-saffron-soft hover:text-chili-dark"
        >
          Follow @{truckInfo.instagramHandle}
        </a>
      </div>
    </section>
  );
}
