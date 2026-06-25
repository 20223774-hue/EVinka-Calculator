import type { Vehicle } from "../data/vehicles";
import {
  estimateChargeTime,
  getChargerRecommendation,
  publicAsset,
} from "../lib/calculator";
import { copy, type Language } from "../lib/i18n";

type ChargerCardProps = {
  vehicle: Vehicle;
  language: Language;
};

export function ChargerCard({ vehicle, language }: ChargerCardProps) {
  const t = copy[language].charger;
  const charger = getChargerRecommendation(vehicle, language);
  const specs = charger.specs ?? [
    { label: t.power, value: charger.powerLabel ?? `${charger.powerKw} kW` },
    {
      label: t.estimatedCharge,
      value: estimateChargeTime(vehicle, charger.powerKw, language),
    },
  ];

  return (
    <div
      data-testid="charger-card"
      className="mt-4 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 sm:grid-cols-[96px_1fr]"
    >
      <div className="flex min-h-28 items-center justify-center rounded-xl bg-white/[0.08]">
        <img
          src={publicAsset(charger.image)}
          alt={charger.name}
          className="h-28 w-24 object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.45)]"
        />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {t.heading}
        </p>
        <div className="mt-1 inline-flex rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] text-primary">
          {charger.badge}
        </div>
        <h3 className="mt-2 text-lg font-semibold text-foreground">
          {charger.name}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {charger.description}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          {specs.map((spec, index) => (
            <div key={spec.label} className="rounded-xl bg-black/25 p-2.5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {spec.label}
              </p>
              <p className={`mt-1 font-semibold ${index === 0 ? "text-primary" : "text-foreground"}`}>
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
