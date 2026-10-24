import Image from "next/image";

import { heroPhoto, truckInfo } from "@/data/bangkok99";

import { Bowl, Clock, Pin } from "./Icons";
import { OpenStatus } from "./OpenStatus";
import { OrderButton } from "./SiteProvider";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-chili text-white">
      <div aria-hidden="true" className="awning" />
      <Bowl className="absolute top-16 -left-8 w-40 -rotate-12 text-white/10" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-8 pb-14 sm:px-6 sm:pt-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pb-20">
        <div className="min-w-0 text-center lg:text-left">
          <p className="inline-block -rotate-2 rounded-lg bg-saffron px-3 py-1 font-display font-bold text-char">Thai street food</p>
          <h1 id="hero-title" className="mt-5 font-display text-6xl leading-[0.95] font-extrabold tracking-tight text-saffron-light sm:text-8xl">
            {truckInfo.name}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-xl leading-relaxed text-saffron-soft sm:text-2xl lg:mx-0">{truckInfo.tagline}.</p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <OrderButton className="w-full rounded-full bg-saffron px-8 py-4 font-display text-xl font-bold text-char transition-colors pop hover:bg-saffron-light sm:w-auto" />
            <a
              href="#menu"
              className="w-full rounded-full border-2 border-saffron-soft px-8 py-3.5 text-center font-display text-xl font-bold text-white transition-colors hover:bg-saffron-soft hover:text-chili-dark sm:w-auto"
            >
              See the menu
            </a>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="relative aspect-square -rotate-2 overflow-hidden rounded-[2rem] border-[6px] border-saffron pop">
            <Image src={heroPhoto.src} alt={heroPhoto.alt} fill priority sizes="(min-width: 1024px) 28rem, 88vw" className="object-cover" />
          </div>
          <figcaption className="absolute -bottom-4 left-1/2 -translate-x-1/2 rotate-2 rounded-full bg-char px-4 py-2 text-sm font-bold whitespace-nowrap text-saffron-light">
            Find the yellow truck
          </figcaption>
        </figure>
      </div>

      {/* Brief: "Mon–Sat 11am–8:30pm · 13001 Lake City Way NE", plus a live open/closed line in Seattle time. */}
      <div className="relative bg-saffron text-char">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-x-6 gap-y-1.5 px-4 py-3.5 text-center font-bold sm:flex-row sm:flex-wrap sm:px-6">
          <span className="inline-flex items-center gap-2">
            <Clock className="size-5 shrink-0" />
            {truckInfo.hoursLine}
          </span>
          <span className="inline-flex items-center gap-2">
            <Pin className="size-5 shrink-0" />
            {truckInfo.street}
          </span>
          <OpenStatus />
        </div>
      </div>
    </section>
  );
}
