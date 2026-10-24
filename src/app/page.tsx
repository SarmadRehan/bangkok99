import { About } from "@/components/About";
import { AskBangkok99 } from "@/components/AskBangkok99";
import { DemoBanner } from "@/components/DemoBanner";
import { FindUs } from "@/components/FindUs";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { MobileActionBar } from "@/components/MobileActionBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteProvider } from "@/components/SiteProvider";

export default function Home() {
  return (
    <SiteProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-chili focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        Skip to content
      </a>
      <DemoBanner />
      <SiteHeader />
      <main id="main">
        <Hero />
        <MenuSection />
        <FindUs />
        <About />
      </main>
      <SiteFooter />
      <MobileActionBar />
      <AskBangkok99 />
    </SiteProvider>
  );
}
