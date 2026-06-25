import React, { Suspense, useState } from "react";
import { VEHICLES } from "../data/vehicles";
import { CalculatorPanel } from "./CalculatorPanel";
import { CarShowcase } from "./CarShowcase";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export function HeroSection() {
  const [showcaseVehicle, setShowcaseVehicle] = useState(VEHICLES[0]);

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-hero-bg">
      <div className="absolute inset-0">
        <Suspense fallback={<div className="absolute inset-0 bg-hero-bg" />}>
          <Spline
            scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
            className="h-full w-full"
          />
        </Suspense>
      </div>

      <div className="absolute inset-0 z-[1] bg-black/45 pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_24%_35%,rgba(0,252,4,0.18),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.55),rgba(0,0,0,0.12)_52%,rgba(0,0,0,0.64))] pointer-events-none" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1480px] items-start gap-8 px-5 pb-8 pt-28 sm:px-8 md:pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(410px,520px)] lg:px-12 lg:pt-32 xl:px-16">
        <div className="pointer-events-none pb-0 lg:pb-8">
          <p
            className="mb-3 inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-primary opacity-0 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Smart mobility calculator
          </p>

          <h1
            className="text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.98] tracking-[-0.06em] text-foreground uppercase opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            EVINKA <span className="text-primary">AI</span>
          </h1>

          <p
            className="mt-4 max-w-2xl text-[clamp(1.05rem,2.2vw,1.65rem)] font-light text-foreground/82 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.34s" }}
          >
            Calcula cuanto ahorras al moverte en electrico.
          </p>

          <p
            className="mt-4 max-w-2xl text-[clamp(0.9rem,1.4vw,1.12rem)] font-light leading-7 text-muted-foreground opacity-0 animate-fade-up"
            style={{ animationDelay: "0.48s" }}
          >
            Elige tu marca, modelo y kilometros diarios. Comparamos energia
            electrica frente a gasolina, estimamos tu ahorro anual y te
            recomendamos el cargador EVinka adecuado.
          </p>

          <div
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: "0.62s" }}
          >
            <CarShowcase vehicle={showcaseVehicle} />
          </div>

          <p
            className="mt-4 text-xs font-light text-muted-foreground/70 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.76s" }}
          >
            Base referencial: modelos BEV comercializados en Peru, con datos de
            bateria, autonomia y consumo del archivo proporcionado.
          </p>
        </div>

        <div
          className="w-full opacity-0 animate-fade-up lg:pb-8"
          style={{ animationDelay: "0.42s" }}
        >
          <CalculatorPanel onVehicleChange={setShowcaseVehicle} />
        </div>
      </div>
    </section>
  );
}
