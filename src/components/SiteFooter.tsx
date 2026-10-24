import { truckInfo } from "@/data/bangkok99";

import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer className="bg-char text-saffron-soft">
      <div aria-hidden="true" className="awning" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 sm:px-6 md:grid-cols-3">
        <div>
          <Wordmark className="text-3xl" tone="dark" />
          <p className="mt-4 max-w-xs leading-relaxed">{truckInfo.tagline}.</p>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold tracking-wide text-saffron uppercase">Find us</h2>
          <p className="mt-3 leading-relaxed">
            <span className="font-bold text-white">{truckInfo.street}</span>
            <br />
            {truckInfo.city}
            <br />
            {truckInfo.spot}
          </p>
        </div>
        <div>
          <h2 className="font-display text-sm font-bold tracking-wide text-saffron uppercase">Hours</h2>
          <p className="mt-3 leading-relaxed">
            Monday–Saturday, 11am–8:30pm
            <br />
            Closed Sunday
          </p>
          <p className="mt-3">
            <a href={truckInfo.phoneHref} className="font-bold text-white hover:text-saffron">
              {truckInfo.phone}
            </a>
            {" · "}
            <a href={truckInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-saffron">
              Instagram
            </a>
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-40 sm:px-6 md:pb-24">
        <p className="rounded-full bg-chili px-4 py-2.5 text-center text-sm font-semibold text-white">{truckInfo.demoNotice}</p>
      </div>
    </footer>
  );
}
