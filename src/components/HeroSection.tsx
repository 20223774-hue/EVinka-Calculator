import { useState } from "react";
import { VEHICLES } from "../data/vehicles";
import { copy, type Language } from "../lib/i18n";
import { CalculatorPanel } from "./CalculatorPanel";
import { CarShowcase } from "./CarShowcase";
import { SplineBackground } from "./SplineBackground";

type HeroSectionProps = {
  language: Language;
};

export function HeroSection({ language }: HeroSectionProps) {
  const [showcaseVehicle, setShowcaseVehicle] = useState(VEHICLES[0]);
  const t = copy[language].hero;

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-hero-bg">
      <SplineBackground />

      <div className="absolute inset-0 z-[1] bg-black/45 pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_24%_35%,rgba(212,165,116,0.2),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.55),rgba(0,0,0,0.12)_52%,rgba(0,0,0,0.64))] pointer-events-none" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1480px] items-start gap-8 px-5 pb-8 pt-28 sm:px-8 md:pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(410px,520px)] lg:px-12 lg:pt-32 xl:px-16">
        <div className="pointer-events-none pb-0 lg:pb-8">
          <p
            className="mb-3 inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-primary opacity-0 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            {t.eyebrow}
          </p>

          <h1
            className="text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.98] tracking-[-0.06em] text-foreground uppercase opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t.title}
          </h1>

          <p
            className="mt-4 max-w-2xl text-[clamp(1.05rem,2.2vw,1.65rem)] font-light text-foreground/82 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.34s" }}
          >
            {t.subtitle}
          </p>

          <p
            className="mt-4 max-w-2xl text-[clamp(0.9rem,1.4vw,1.12rem)] font-light leading-7 text-muted-foreground opacity-0 animate-fade-up"
            style={{ animationDelay: "0.48s" }}
          >
            {t.description}
          </p>

          <div
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: "0.62s" }}
          >
            <CarShowcase vehicle={showcaseVehicle} language={language} />
          </div>

          <p
            className="mt-4 text-xs font-light text-muted-foreground/70 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.76s" }}
          >
            {t.source}
          </p>
        </div>

        <div
          className="w-full opacity-0 animate-fade-up lg:pb-8"
          style={{ animationDelay: "0.42s" }}
        >
          <CalculatorPanel language={language} onVehicleChange={setShowcaseVehicle} />
        </div>
      </div>
    </section>
  );
}
