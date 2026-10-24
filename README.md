# Bangkok99 Food Truck: Landing Page Prototype

A demo site for Bangkok99, a Thai street-food truck at 13001 Lake City Way NE, Seattle. It is built
as a client prototype and is not the official website; banners at the top and bottom of the page say
so. It is unlisted (`noindex`) and meant to be shared only with Bangkok99.

Live demo: https://sarmadrehan.github.io/bangkok99/

## Main features

Bangkok99 has no website, and online orders only go through delivery apps, so the demo shows a
website with pickup ordering and a chat assistant.

- **Order pickup** (header, hero, menu, mobile bar) opens an honest "coming soon" panel with their real
  Grubhub link and their phone number (`src/components/SiteProvider.tsx`). Nothing is sent.
- **"Ask Bangkok99" chatbot** (`src/lib/bangkokBot.ts`). A floating, scripted helper with
  suggested-question chips and free text, answered by keyword matching. There is no AI model, no API
  key and no network call on the page.
  - Hours, location, popular dishes, ordering and tofu use the brief's answers.
  - Catering: "Ask us! Leave your name and number and we'll get back to you.", then the demo panel. It
    never says yes, because catering isn't confirmed.
  - Price, spice, allergy, vegan, gluten-free and anything else (including "$"): "Great question! Call
    206-369-2211.", then the demo panel. Never a number or a claim.
- **Menu**: noodles, curries, rice, starters, and drinks and dessert, names with short notes, no
  prices, and "Ask about spice level".
- **Find us**: address at the Food Mart on Lake City Way, map, hours with today highlighted, a live
  "Open now · until 8:30pm" line in Seattle time (`src/lib/openStatus.ts`), tap to call.
- **About**: two warm lines; small and locally owned.

## Stack

- Next.js 15 (App Router) with static export (`output: "export"`)
- TypeScript (strict) and Tailwind CSS v4
- Fonts via `next/font`: Baloo 2 (bold, rounded headings and the wordmark), Figtree (body) and Mitr
  (the small Thai-script labels on the menu groups)
- Hosted on GitHub Pages from the `gh-pages` branch

## Project layout

```
src/
  app/            layout, page, global styles (palette, awning stripe), icons
  assets/images/  the truck and dishes from their own Instagram, imported statically
  components/     one component per page section, plus the chatbot, the shared panel and the wordmark
  data/           bangkok99.ts: facts, hours, menu, photos (with sources)
  lib/            bangkokBot.ts (the scripted chatbot) and openStatus.ts (open now, in Seattle time)
```

## Content sources

Facts come from the verified table in the demo brief (checked 2026-10-24):

| Fact | Source |
| --- | --- |
| Bangkok99 Food Truck, "Thai Street Food" | Instagram bio |
| 13001 Lake City Way NE, Seattle, WA 98125, at a Food Mart | Instagram bio; Google Maps ("Located in: Food Mart") |
| Monday–Saturday 11:00am–8:30pm, Sunday closed | Instagram bio |
| Phone 206-369-2211 | Instagram bio; Google Maps |
| Dine-in, takeout, delivery; Grubhub ordering | Google Maps; Facebook bio link |
| Pad see ew, pad thai, green curry, Thai fried rice, Thai basil fried rice, ka pao, cashew chicken, wontons, crab rangoons, egg rolls, Thai iced tea | Google Maps menu highlights and review topics |

- **Extra menu items** from their own Instagram posts (Sarmad's choice): Bangkok Thai Rama with
  homemade peanut sauce, Grandma's green beans, cashew nut with tofu, spring rolls, mango sticky rice,
  and the drinks list (Thai tea, Thai coffee, Thai green tea, fresh strawberry lemonade, fresh coconut
  juice). Notes are short and neutral, with no ingredient claims beyond their own captions.
- **Photos**: their own Instagram posts only. The truck (their profile photo), plus pad see ew, pad
  thai, cashew tofu, ka pao gai, Bangkok Thai Rama and Grandma's green beans. Green curry, fried rice
  and spring rolls are the pictures from their truck's menu board, labelled "Pictured". Their mango
  sticky rice photo looks like a stock image, so it's left out (Sarmad's choice). Two posts in their
  grid come from other accounts (a customer and a school fundraiser) and aren't used.
- **Logo**: none is published, so "BANGKOK" is typeset after the truck's lit sign, with the 99 in a
  saffron badge. The icon is "99" on saffron with a chili-red border.
- **Colors**: from the truck: saffron yellow `#f5b800`, the rust-red sign deepened to chili red
  `#b8321f`, and its yellow letters (`#ffd84d`). A small basil green `#3f7d3a` is the brief's touch of
  green (Sarmad's choice).

### Left out on purpose

Prices, star ratings, review quotes, testimonials, any catering claim, the owner's name and the
truck's history (the brief: it comes from a customer's post and involves an ownership change), and
allergy or spice claims.

### Grubhub

The link is the brief's `https://www.grubhub.com/restaurant/bangkok-99-13001-lake-city-way-ne-seattle/1961719`.
Grubhub shows "not available in your country" outside the US, so the store couldn't be opened from
Pakistan on 2026-10-24. Open it from the US to confirm it's live.

## Development

```bash
npm ci
npm run dev       # http://localhost:3000
npm run lint
npm run build     # static site in ./out
npm run preview   # serve ./out locally
```

## Deployment (GitHub Pages)

```bash
npm run deploy
```

This builds with `NEXT_PUBLIC_BASE_PATH=/bangkok99` (the Pages project path), adds `.nojekyll` so the
`_next/` folder is served, and pushes `./out` to the `gh-pages` branch. If the repository is renamed,
update the base path in the `deploy` script.

## Notes

- Nothing on the page sends data anywhere. The only third-party request is the Google Maps embed of
  the street address; fonts are self-hosted by `next/font`.
- Saffron is a fill with dark text (9.3:1); chili red takes white text (6.0:1). Body text uses char
  or tamarind, both 7:1 or better on the rice-colored background.
- The page is marked `noindex` so the demo never competes with the business's own listings.
