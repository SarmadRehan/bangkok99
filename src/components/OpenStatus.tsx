"use client";

import { truckInfo } from "@/data/bangkok99";
import { getOpenStatus, useTruckClock } from "@/lib/openStatus";

/** Live "open now" line in Seattle time, from the truck's clock rather than the visitor's. */
export function OpenStatus({ className = "" }: { className?: string }) {
  const clock = useTruckClock();
  const status = clock ? getOpenStatus(clock) : null;

  return (
    <p className={`inline-flex items-center gap-2.5 font-bold ${className}`} aria-live="polite">
      <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-full ${status === null ? "bg-saffron" : status.open ? "bg-basil" : "bg-chili"}`} />
      {/* Static render: the fixed hours, until the Seattle clock is known. */}
      {status?.label ?? truckInfo.hoursLine}
    </p>
  );
}
