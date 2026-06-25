import { useEffect, useMemo, useState } from "react";
import { BRANDS, VEHICLES, vehiclesByBrand, type Vehicle } from "../data/vehicles";
import {
  calculateSavings,
  formatSoles,
} from "../lib/calculator";
import { copy, type Language } from "../lib/i18n";
import { BrandSelect } from "./BrandSelect";
import { ChargerCard } from "./ChargerCard";

type CalculatorPanelProps = {
  language: Language;
  onVehicleChange?: (vehicle: Vehicle) => void;
};

export function CalculatorPanel({
  language,
  onVehicleChange,
}: CalculatorPanelProps) {
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(
    vehiclesByBrand(BRANDS[0].name)[0]?.id ?? VEHICLES[0].id,
  );
  const [kmDaily, setKmDaily] = useState(60);
  const models = useMemo(
    () => vehiclesByBrand(selectedBrand.name),
    [selectedBrand.name],
  );
  const vehicle =
    models.find((model) => model.id === selectedVehicleId) ?? models[0] ?? VEHICLES[0];
  const result = calculateSavings(vehicle, kmDaily);
  const t = copy[language].calculator;

  useEffect(() => {
    onVehicleChange?.(vehicle);
  }, [onVehicleChange, vehicle]);

  return (
    <div
      data-testid="calculator-panel"
      className="pointer-events-auto w-full rounded-3xl border border-white/10 bg-black/60 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-primary">
            {t.eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">
            {t.title}
          </h2>
        </div>
        <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {t.country}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {t.brand}
          </label>
          <BrandSelect
            brands={BRANDS}
            value={selectedBrand}
            onChange={(brand) => {
              const firstModel = vehiclesByBrand(brand.name)[0];
              setSelectedBrand(brand);
              if (firstModel) {
                setSelectedVehicleId(firstModel.id);
              }
            }}
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {t.model}
          </label>
          <select
            data-testid="model-select"
            value={vehicle.id}
            onChange={(event) => setSelectedVehicleId(event.target.value)}
            className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.07] px-3 text-sm text-foreground outline-none transition focus:border-primary"
          >
            {models.map((model) => (
              <option key={model.id} value={model.id} className="bg-zinc-950">
                {model.model}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {t.dailyKm}
          </label>
          <span className="rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
            {kmDaily} km
          </span>
        </div>
        <input
          data-testid="km-slider"
          type="range"
          min={0}
          max={300}
          step={5}
          value={kmDaily}
          onChange={(event) => setKmDaily(Number(event.target.value))}
          className="mt-4 w-full accent-[hsl(var(--primary))]"
        />
        <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
          <span>0</span>
          <span>150</span>
          <span>300</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <ResultTile label={t.combustionAnnual} value={formatSoles(result.combustionYear)} tone="red" />
        <ResultTile label={t.evAnnual} value={formatSoles(result.evYear)} tone="gold" />
        <ResultTile label={t.annualSavings} value={formatSoles(result.savingsYear)} tone="gold" testId="savings-year" />
        <ResultTile label={t.lowerSpend} value={`${result.savingsPercent}%`} tone="gold" />
      </div>

      <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/10 p-4">
        <p className="text-sm text-foreground/85">
          {t.withVehicle} {vehicle.brand} {vehicle.model}, {t.driving} {kmDaily} km {t.daily},{" "}
          {t.saveApprox}{" "}
          <span className="font-bold text-primary">
            {formatSoles(result.savingsMonth)} {t.perMonth}
          </span>
          .
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {t.evConsumption}: {vehicle.kwhPer100Km.toFixed(1)} kWh/100 km - {t.battery}{" "}
          {vehicle.batteryKwh} kWh - {t.range} {vehicle.rangeKm} km ({vehicle.cycle})
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
        <div className="rounded-xl bg-white/[0.05] p-3">
          <p className="text-lg font-semibold text-primary">
            {result.co2ReductionTon.toFixed(1)} ton
          </p>
          <p>{t.co2Reduced}</p>
        </div>
        <div className="rounded-xl bg-white/[0.05] p-3">
          <p className="text-lg font-semibold text-primary">
            {result.treesEquivalent}
          </p>
          <p>{t.treesEquivalent}</p>
        </div>
      </div>

      <ChargerCard vehicle={vehicle} language={language} />
    </div>
  );
}

function ResultTile({
  label,
  value,
  tone,
  testId,
}: {
  label: string;
  value: string;
  tone: "red" | "gold";
  testId?: string;
}) {
  const color =
    tone === "red" ? "text-red-400" : "text-primary";

  return (
    <div data-testid={testId} className="rounded-2xl border border-white/10 bg-white/[0.055] p-2.5">
      <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className={`mt-1 text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}
