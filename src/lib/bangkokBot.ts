import { truckInfo } from "@/data/bangkok99";

// "Ask Bangkok99" is scripted: keyword matching over a fixed set of answers, all from the brief. There
// is no AI model, no API key and no network call. Prices, spice, allergies and anything it can't match
// get "call us", and catering gets "ask us", so it never makes up a price, a claim or a service.

export type BotAction = "order" | "menu" | "contact";

export type BotReply = {
  text: string;
  action?: BotAction;
  /** Run the action by itself after the reply (open the demo panel), not just offer it. */
  auto?: boolean;
};

export type Suggestion = { label: string; question: string };

export const suggestions: Suggestion[] = [
  { label: "Hours", question: "What are your hours?" },
  { label: "Location", question: "Where are you?" },
  { label: "Popular", question: "What's popular?" },
  { label: "Order online", question: "Can I order online?" },
  { label: "Tofu", question: "Do you have tofu options?" },
  { label: "Catering", question: "Do you do catering?" },
  { label: "Spice level", question: "How spicy is it?" },
];

export const greeting: BotReply = {
  text: "Sawasdee ka! I can help with our hours, location, popular dishes, ordering and tofu options. Tap a question or type your own.",
};

const replies = {
  hours: { text: "Monday to Saturday, 11am to 8:30pm. Closed Sunday." },
  location: { text: `${truckInfo.street}, at the Food Mart.` },
  popular: {
    text: "Pad see ew, pad thai, green curry, Thai fried rice and crab rangoons.",
    action: "menu",
  },
  order: {
    text: `Order pickup is coming soon. For now, order on Grubhub or call ${truckInfo.phone}.`,
    action: "order",
  },
  tofu: { text: "Many dishes can be made with tofu. Ask when you order." },
  // Brief: never confirm catering; it isn't confirmed.
  catering: {
    text: "Ask us! Leave your name and number and we'll get back to you.",
    action: "contact",
    auto: true,
  },
  hello: { text: "Sawasdee! Ask me about our hours, location, popular dishes, ordering or tofu options." },
  thanks: { text: "Khob khun ka! See you at the truck." },
  fallback: {
    text: `Great question! Call ${truckInfo.phone}.`,
    action: "contact",
    auto: true,
  },
} satisfies Record<string, BotReply>;

type Topic = keyof typeof replies;

// Checked in order. Prices, spice, allergies, special diets beyond tofu (vegan, gluten-free) and
// anything about the truck's history go straight to the fallback, even inside another question, so
// "how much is the pad thai" or "is the tofu curry spicy" is never answered here. Catering comes next,
// so "can you cater a party" is never answered with yes. Ordering wins over location ("order for
// pickup at the truck").
const rules: { topic: Topic; pattern: RegExp }[] = [
  // A bare greeting only, so "hi, what are your hours?" still reaches the hours answer.
  { topic: "hello", pattern: /^(hi|hey|hello|sawasdee|sawadee|sawatdee|good (morning|afternoon|evening))( (ka|krub|khrap|there))?$/ },
  {
    topic: "fallback",
    pattern:
      /\b(prices?|pricing|cost|costs|how much|rates?|fees?|charge|charges|expensive|cheap|afford\w*|dollars?|deals?|discounts?|coupons?|spic(e|y|iness)|hot|mild|medium|heat|chil(i|li|e|ies)s?|allerg\w*|gluten|celiac|nuts?|peanuts?|tree nuts|shellfish|fish sauce|dairy|lactose|soy|msg|vegan|plant[- ]based|halal|kosher|keto|calories|owners?|history|phayathai|golf|jobs?|hiring)\b/,
  },
  { topic: "catering", pattern: /\b(cater\w*|events?|party|parties|weddings?|large orders?|big orders?|trays?|office|corporate|group orders?)\b/ },
  {
    topic: "order",
    pattern: /\b(order\w*|online|pick ?up|takeout|take out|to go|grubhub|deliver\w*|doordash|uber ?eats|call ahead|ahead|app)\b/,
  },
  {
    topic: "hours",
    pattern:
      /\b(hours?|open|opens|opening|close|closes|closing|what time|when|today|tonight|tomorrow|weekends?|sundays?|mondays?|tuesdays?|wednesdays?|thursdays?|fridays?|saturdays?|lunch|dinner)\b/,
  },
  { topic: "location", pattern: /\b(where|address|located|location|lake city|food mart|directions?|parking|park|near|map|find you)\b/ },
  { topic: "tofu", pattern: /\b(tofu|vegetarian|veggie|veg|meatless|no meat|without meat)\b/ },
  {
    topic: "popular",
    pattern:
      /\b(popular|best|favou?rites?|recommend\w*|good|menu|dishes|eat|food|try|pad see ew|pad se ew|pad thai|curry|curries|fried rice|ka ?pao|basil|wontons?|rangoons?|egg rolls?|spring rolls?|thai tea|drinks?|noodles?)\b/,
  },
  { topic: "thanks", pattern: /\b(thanks|thank you|thx|ty|khob ?khun|kop ?kun)\b/ },
];

export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function answer(input: string): BotReply {
  // "$" is stripped by normalize(), so a dollar sign is checked on the raw text (brief: route "$" to the fallback).
  if (input.includes("$")) return replies.fallback;
  const text = normalize(input);
  if (!text) return replies.hello;
  const match = rules.find(({ pattern }) => pattern.test(text));
  return match ? replies[match.topic] : replies.fallback;
}
