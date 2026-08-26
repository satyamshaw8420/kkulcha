import Hero from "./components/hero";
import MenuSection from "./components/menu";
import { Footer, Grain, Header, Ticker } from "./components/chrome";
import { HouseSection, TandoorSection } from "./components/story";
import { GallerySection, ReviewsSection, RushSection } from "./components/social";
import { NearbySection, VisitSection } from "./components/visit";

export default function App() {
  return (
    <div className="relative min-h-screen bg-char text-cream antialiased">
      <Header />
      <main>
        <Hero />
        <Ticker />
        <HouseSection />
        <TandoorSection />
        <MenuSection />
        <ReviewsSection />
        <GallerySection />
        <RushSection />
        <NearbySection />
        <VisitSection />
      </main>
      <Ticker />
      <Footer />
      <Grain />
    </div>
  );
}
