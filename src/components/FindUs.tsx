"use client";

import { formatHours, hoursDisplayOrder, truckInfo, weekHours } from "@/data/bangkok99";
import { useTruckClock } from "@/lib/openStatus";

import { OpenStatus } from "./OpenStatus";
import { SectionHeading } from "./SectionHeading";

export function FindUs() {
  const clock = useTruckClock();

  return (
    <section id="find-us" aria-labelledby="find-title" className="bg-saffron-soft py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="find-title" eyebrow="Find us" title="Come Hungry to Lake City" />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-6">
            <div className="rounded-[2rem] bg-white p-6 ring-1 ring-char/10 sm:p-7">
              <h3 className="font-display text-2xl font-extrabold text-chili">Where</h3>
              <p className="mt-2 text-lg font-bold">
                {truckInfo.street}
                <br />
                {truckInfo.city}
              </p>
              <p className="mt-1 text-tamarind">{truckInfo.spot}. {truckInfo.serviceOptions}.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={truckInfo.phoneHref} className="rounded-full bg-chili px-5 py-2.5 font-bold text-white transition-colors hover:bg-chili-dark">
                  Call {truckInfo.phone}
                </a>
                <a
                  href={truckInfo.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border-2 border-chili px-5 py-2 font-bold text-chili transition-colors hover:bg-chili hover:text-white"
                >
                  Directions
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 ring-1 ring-char/10 sm:p-7">
              <h3 className="font-display text-2xl font-extrabold text-chili">Hours</h3>
              <OpenStatus className="mt-1 text-basil-ink" />
              <table className="mt-3 w-full">
                <caption className="sr-only">Opening hours, Seattle time</caption>
                <tbody>
                  {hoursDisplayOrder.map((index) => {
                    const entry = weekHours[index];
                    const today = clock?.day === index;
                    return (
                      <tr key={entry.day} className={today ? "bg-saffron-soft font-bold text-char" : "text-tamarind"}>
                        <th scope="row" className="rounded-l-lg py-1 pr-3 pl-2 text-left font-semibold">
                          {entry.day}
                          {today && <span className="sr-only"> (today)</span>}
                        </th>
                        <td className="rounded-r-lg py-1 pr-2 text-right whitespace-nowrap">{formatHours(entry)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-white ring-1 ring-char/10">
            <iframe
              title={`Map of ${truckInfo.street}, ${truckInfo.city}, at the Food Mart`}
              src={truckInfo.mapEmbedUrl}
              className="h-full min-h-96 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
