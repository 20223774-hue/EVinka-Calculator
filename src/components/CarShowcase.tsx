import { useEffect, useState } from "react";
import type { Vehicle } from "../data/vehicles";
import { publicAsset } from "../lib/calculator";
import { copy, type Language } from "../lib/i18n";

type CarShowcaseProps = {
  vehicle: Vehicle;
  language: Language;
};

export function CarShowcase({ vehicle, language }: CarShowcaseProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const t = copy[language].car;

  useEffect(() => {
    setImageFailed(false);
  }, [vehicle.id]);

  return (
    <div data-testid="car-showcase" className="mt-8 h-40 overflow-hidden rounded-2xl border border-white/10 bg-black/25 md:h-48 lg:h-56">
      <div key={vehicle.id} className="car-drive-in flex h-full items-center">
        {!imageFailed ? (
          <img
            src={publicAsset(vehicle.image)}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="mx-auto h-[82%] w-[92%] object-contain drop-shadow-[0_26px_36px_rgba(212,165,116,0.2)]"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="mx-auto flex h-[82%] w-[88%] items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-r from-black/30 via-white/10 to-black/30 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">EV</div>
              <p className="mt-2 text-sm text-foreground/80">
                {vehicle.brand} {vehicle.model}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.missing}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
