import type { StaticImageData } from "next/image";

import cashewTofu from "@/assets/images/cashew-tofu.jpg";
import friedRice from "@/assets/images/fried-rice.jpg";
import greenBeans from "@/assets/images/green-beans.jpg";
import greenCurry from "@/assets/images/green-curry.jpg";
import kaPao from "@/assets/images/ka-pao.jpg";
import padSeeEw from "@/assets/images/pad-see-ew.jpg";
import padThai from "@/assets/images/pad-thai.jpg";
import springRoll from "@/assets/images/spring-roll.jpg";
import thaiRama from "@/assets/images/thai-rama.jpg";
import truck from "@/assets/images/truck.jpg";

// Every fact below comes from the verified table in the demo brief (checked 2026-10-24) or from the
// truck's own Instagram posts, noted beside each one. No prices, ratings, reviews or testimonials, no
// catering claim (not confirmed), and nothing about the truck's history or previous owners (brief).

export type Photo = { src: StaticImageData; alt: string; caption?: string };

export const truckInfo = {
  name: "Bangkok99",
  fullName: "Bangkok99 Food Truck",
  // IG bio: "Thai Street Food".
  tagline: "Thai street food in Lake City, Seattle",
  description: "Bangkok99 Food Truck: Thai street food in Lake City, Seattle. Pad see ew, pad thai, green curry, ka pao and more, Monday to Saturday.",
  street: "13001 Lake City Way NE",
  city: "Seattle, WA 98125",
  // Google Maps: "Located in: Food Mart".
  spot: "At the Food Mart on Lake City Way",
  phone: "206-369-2211",
  phoneHref: "tel:+12063692211",
  instagramHandle: "bangkok99_foodtruck",
  instagramUrl: "https://www.instagram.com/bangkok99_foodtruck/",
  // Their real Grubhub store (brief; Google Maps and their Facebook bio link). Grubhub blocks visitors
  // outside the US, so it couldn't be opened from Pakistan on 2026-10-24.
  grubhubUrl: "https://www.grubhub.com/restaurant/bangkok-99-13001-lake-city-way-ne-seattle/1961719",
  mapEmbedUrl: "https://www.google.com/maps?q=13001+Lake+City+Way+NE,+Seattle,+WA+98125&output=embed",
  directionsUrl: "https://www.google.com/maps/search/?api=1&query=13001+Lake+City+Way+NE+Seattle+WA+98125",
  timeZone: "America/Los_Angeles",
  // IG bio.
  hoursLine: "Mon–Sat 11am–8:30pm",
  // Google Maps.
  serviceOptions: "Dine-in, takeout and delivery",
  demoNotice: "Demo by Sarmad Rehan · not the official Bangkok99 website",
};

/** Opening hours in minutes after midnight, Seattle time. */
export type DayHours = { day: string; short: string; open: number; close: number } | { day: string; short: string; closed: true };

const open = (day: string, short: string): DayHours => ({ day, short, open: 11 * 60, close: 20 * 60 + 30 });

// IG bio: Monday–Saturday 11:00am–8:30pm, Sunday closed. Index 0 is Sunday, like Date#getDay.
export const weekHours: DayHours[] = [
  { day: "Sunday", short: "Sun", closed: true },
  open("Monday", "Mon"),
  open("Tuesday", "Tue"),
  open("Wednesday", "Wed"),
  open("Thursday", "Thu"),
  open("Friday", "Fri"),
  open("Saturday", "Sat"),
];

// Monday first, since Sunday is the one day off.
export const hoursDisplayOrder = [1, 2, 3, 4, 5, 6, 0];

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const suffix = hours < 12 ? "am" : "pm";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return mins === 0 ? `${hour12}${suffix}` : `${hour12}:${String(mins).padStart(2, "0")}${suffix}`;
}

export function formatHours(entry: DayHours): string {
  return "closed" in entry ? "Closed" : `${formatTime(entry.open)} – ${formatTime(entry.close)}`;
}

export type MenuItem = { name: string; note?: string; popular?: boolean };
export type MenuGroup = { id: string; title: string; thai: string; photo?: Photo; items: MenuItem[] };

// The brief's groups and dishes (Google Maps menu highlights and review topics), plus the dishes in
// the truck's own Instagram posts (Sarmad's choice), names only with short, neutral notes and no
// prices. Notes avoid ingredient claims beyond what their own captions say, since allergy questions go
// to the phone. Photos are their own posts: real photos, plus the menu-board pictures they show on the
// truck (curry, fried rice, spring rolls), labelled "Pictured". The stock-looking mango sticky rice
// photo is left out (Sarmad's choice).
export const menu: MenuGroup[] = [
  {
    id: "noodles",
    title: "Noodles",
    thai: "ก๋วยเตี๋ยว",
    photo: {
      src: padSeeEw,
      alt: "Pad see ew: wide, wok-charred rice noodles with Chinese broccoli and crispy tofu in a black takeout bowl",
      // IG, Apr 1, 2023: "Pad Se-Ew".
      caption: "Pictured: Pad see ew",
    },
    items: [
      { name: "Pad See Ew", note: "Wide rice noodles, wok-charred with Chinese broccoli.", popular: true },
      { name: "Pad Thai", note: "Thin rice noodles, stir-fried Bangkok street style, with lime.", popular: true },
    ],
  },
  {
    id: "curries",
    title: "Curries",
    thai: "แกง",
    photo: {
      src: greenCurry,
      alt: "A bowl of Thai green curry with Thai basil, bamboo shoots and red pepper",
      // IG, Mar 26, 2023: "Green curry" (the picture on their menu board).
      caption: "Pictured: Green curry",
    },
    items: [
      { name: "Green Curry", note: "Thai green curry with Thai basil.", popular: true },
      // IG, Nov 11, 2024: "Bangkok Thai rama with peanut sauce"; Apr 15, 2023: "homemade peanut sauce".
      { name: "Bangkok Thai Rama", note: "Served with our homemade peanut sauce." },
    ],
  },
  {
    id: "rice",
    title: "Rice",
    thai: "ข้าว",
    photo: {
      src: kaPao,
      alt: "Ka pao gai: minced chicken stir-fried with holy basil and chili, over rice with a fried egg",
      // IG, Mar 27, 2023: "Street food called Ka Pao Gai Kai Dao".
      caption: "Pictured: Ka pao gai with fried egg",
    },
    items: [
      { name: "Ka Pao Gai", note: "Basil chicken, Thai street food style, with a fried egg (kai dao).", popular: true },
      { name: "Thai Fried Rice", note: "Bangkok-style fried rice.", popular: true },
      { name: "Thai Basil Fried Rice", note: "Fried rice with Thai basil." },
      { name: "Cashew Chicken or Tofu", note: "Stir-fried with cashew nuts and vegetables." },
    ],
  },
  {
    id: "starters",
    title: "Starters",
    thai: "ของว่าง",
    photo: {
      src: springRoll,
      alt: "Golden fried spring rolls with a bowl of sweet chili dipping sauce",
      // IG, Mar 26, 2023: "Spring Roll" (the picture on their menu board).
      caption: "Pictured: Spring rolls",
    },
    items: [
      { name: "Crab Rangoons", popular: true },
      { name: "Deep-Fried Wontons" },
      { name: "Crunchy Egg Rolls" },
      { name: "Spring Rolls" },
      // IG, Apr 15, 2023: "Grandma's green Bean".
      { name: "Grandma's Green Beans" },
    ],
  },
  {
    id: "drinks",
    title: "Drinks & dessert",
    thai: "เครื่องดื่ม",
    items: [
      // IG, Nov 12, 2024: "Thai tea, Thai coffee, Thai green tea, Fresh strawberry lemonade, Fresh coconut juice".
      { name: "Thai Iced Tea", popular: true },
      { name: "Thai Coffee" },
      { name: "Thai Green Tea" },
      { name: "Fresh Strawberry Lemonade" },
      { name: "Fresh Coconut Juice" },
      // IG, Mar 27, 2023: "Mango Sticky Rice".
      { name: "Mango Sticky Rice" },
    ],
  },
];

// Their own photos that aren't on a menu card.
export const morePhotos: Photo[] = [
  {
    src: padThai,
    alt: "Pad thai with chicken, bean sprouts, crushed peanuts and a lime wedge",
    // IG, Apr 1, 2023: "Pad Thai chicken".
    caption: "Pad thai with chicken",
  },
  {
    src: cashewTofu,
    alt: "Cashew nut stir-fry with crispy tofu, peppers and onion over jasmine rice",
    // IG, Apr 1, 2023: "Cashew nut w/tofu".
    caption: "Cashew nut with tofu",
  },
  {
    src: thaiRama,
    alt: "Bangkok Thai Rama: chicken on spinach, covered in peanut sauce",
    // IG, Nov 11, 2024.
    caption: "Bangkok Thai Rama",
  },
  {
    src: greenBeans,
    alt: "Grandma's green beans, stir-fried with garlic sauce in a takeout box",
    // IG, Apr 15, 2023.
    caption: "Grandma's green beans",
  },
  {
    src: friedRice,
    alt: "Thai fried rice with cucumber slices, cherry tomatoes and chili sauce on the side",
    // IG, Mar 27, 2023: "Bangkok Fried Rice" (the picture on their menu board).
    caption: "Bangkok fried rice",
  },
];

export const heroPhoto: Photo = {
  src: truck,
  alt: "The bright yellow Bangkok99 food truck at night, its BANGKOK sign lit with string lights and an OPEN sign in the window",
};

// Brief: "one or two warm lines"; "Small business, locally owned". The owner isn't named.
export const about = [
  "Bangkok99 is a little yellow truck serving Thai street food, made fresh to order in Lake City.",
  "We're a small, locally owned business. Come say hi at the Food Mart on Lake City Way.",
];
