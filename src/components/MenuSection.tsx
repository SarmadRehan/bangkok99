import Image from "next/image";

import { menu, morePhotos } from "@/data/bangkok99";

import { SectionHeading } from "./SectionHeading";
import { OrderButton } from "./SiteProvider";

export function MenuSection() {
  return (
    <section id="menu" aria-labelledby="menu-title" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="menu-title" eyebrow="The menu" title="Hot From the Wok" intro="Thai street food favorites, made fresh to order." />

        <p className="mx-auto mt-6 w-fit rounded-xl border-2 border-dashed border-chili px-4 py-1.5 font-display font-bold text-chili">Ask about spice level</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {menu.map((group) => (
            <article key={group.id} aria-labelledby={`menu-${group.id}`} className="flex flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-char/10 pop">
              {group.photo && (
                <figure className="relative aspect-[4/3] overflow-hidden bg-char">
                  <Image src={group.photo.src} alt={group.photo.alt} fill sizes="(min-width: 1024px) 22rem, (min-width: 768px) 45vw, 92vw" className="object-cover" />
                  {group.photo.caption && (
                    <figcaption className="absolute bottom-3 left-3 rounded-full bg-rice/95 px-3 py-1 text-xs font-bold text-char">{group.photo.caption}</figcaption>
                  )}
                </figure>
              )}
              <div className="flex-1 p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 id={`menu-${group.id}`} className="font-display text-3xl font-extrabold text-chili">
                    {group.title}
                  </h3>
                  <span lang="th" className="font-thai text-sm text-tamarind">
                    {group.thai}
                  </span>
                </div>
                <ul className="mt-3 divide-y divide-dashed divide-char/15">
                  {group.items.map((item) => (
                    <li key={item.name} className="py-2.5">
                      <p className="flex flex-wrap items-center gap-2 font-bold text-char">
                        {item.name}
                        {item.popular && <span className="rounded-full bg-saffron-soft px-2 py-0.5 text-xs font-bold text-chili-dark">Popular</span>}
                      </p>
                      {item.note && <p className="mt-0.5 text-[0.95rem] leading-relaxed text-tamarind">{item.note}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          <div className="flex flex-col justify-center rounded-[2rem] bg-saffron p-8 text-center text-char md:col-span-2 lg:col-span-1">
            <p className="font-display text-3xl font-extrabold">Hungry?</p>
            <p className="mt-2 leading-relaxed">Many dishes can be made with tofu. Ask when you order.</p>
            <OrderButton className="mt-6 rounded-full bg-chili px-6 py-3.5 font-display text-lg font-bold text-white transition-colors hover:bg-chili-dark" />
          </div>
        </div>

        <h3 className="mt-16 text-center font-display text-3xl font-extrabold text-char">Fresh off the truck</h3>
        <ul className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {morePhotos.map((photo) => (
            <li key={photo.alt} className="w-60 shrink-0 snap-start lg:w-auto">
              <figure>
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-char">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 14rem, 15rem" className="object-cover" />
                </div>
                <figcaption className="mt-2 text-center text-sm font-bold text-tamarind">{photo.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
