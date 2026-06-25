import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import type { Language } from "./lib/i18n";

export default function App() {
  const [language, setLanguage] = useState<Language>("es");

  return (
    <div className="bg-hero-bg min-h-screen">
      <Navbar
        language={language}
        onToggleLanguage={() =>
          setLanguage((current) => (current === "es" ? "en" : "es"))
        }
      />
      <HeroSection language={language} />
    </div>
  );
}
