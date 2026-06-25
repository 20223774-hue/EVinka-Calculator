import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <div className="bg-hero-bg min-h-screen">
      <Navbar />
      <HeroSection />
    </div>
  );
}
