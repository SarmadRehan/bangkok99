import { truckInfo } from "@/data/bangkok99";

export function DemoBanner() {
  return <p className="bg-char px-4 py-2 text-center text-sm font-semibold text-saffron-soft">{truckInfo.demoNotice}</p>;
}
