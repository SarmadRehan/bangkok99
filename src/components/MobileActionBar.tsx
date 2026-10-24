import { truckInfo } from "@/data/bangkok99";

import { OrderButton } from "./SiteProvider";

/** Thumb-reachable Call, Order pickup and Directions buttons, shown on small screens only. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_1.5fr_1fr] gap-2 border-t border-char/10 bg-rice/95 p-3 text-[0.95rem] backdrop-blur md:hidden">
      <a href={truckInfo.phoneHref} className="rounded-full border-2 border-chili py-2.5 text-center font-bold text-chili">
        Call
      </a>
      <OrderButton className="rounded-full bg-chili py-3 text-center font-display font-bold whitespace-nowrap text-white" />
      <a href={truckInfo.directionsUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-chili py-2.5 text-center font-bold text-chili">
        Directions
      </a>
    </div>
  );
}
