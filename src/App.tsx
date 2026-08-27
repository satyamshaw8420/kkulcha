import Hero from "./components/hero";
import MenuSection from "./components/menu";
import { Footer, Grain, Header, Ticker } from "./components/chrome";
import { HouseSection, TandoorSection } from "./components/story";
import { GallerySection, LoungeSection, ReviewsSection, RushSection } from "./components/social";
import { NearbySection, VisitSection } from "./components/visit";
import { ReservationProvider } from "./context/ReservationContext";
import { ReservationModal } from "./components/ReservationModal";

export default function App() {
  return (
    <ReservationProvider>
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
          <LoungeSection />
          <RushSection />
          <NearbySection />
          <VisitSection />
        </main>
        <Ticker />
        <Footer />
        <Grain />
        <ReservationModal />
      </div>
    </ReservationProvider>
  );
}
