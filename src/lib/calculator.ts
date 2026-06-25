import type { ChargerTier, Vehicle } from "../data/vehicles";

export const CALCULATION_ASSUMPTIONS = {
  electricityPricePerKwh: 0.65,
  gasolinePricePerGallon: 17.5,
  combustionKmPerGallon: 30,
  combustionCo2KgPerKm: 0.21,
  evCo2KgPerKm: 0.05,
  treeCo2KgPerYear: 62,
};

export type SavingsResult = {
  kmMonth: number;
  kmYear: number;
  evMonth: number;
  evYear: number;
  combustionMonth: number;
  combustionYear: number;
  savingsMonth: number;
  savingsYear: number;
  savingsPercent: number;
  co2ReductionTon: number;
  treesEquivalent: number;
};

export type ChargerRecommendation = {
  name: string;
  badge: string;
  powerKw: number;
  description: string;
  image: string;
};

export function calculateSavings(vehicle: Vehicle, kmDaily: number): SavingsResult {
  const kmMonth = kmDaily * 30;
  const kmYear = kmMonth * 12;
  const kwhMonth = (vehicle.kwhPer100Km / 100) * kmMonth;
  const evMonth = kwhMonth * CALCULATION_ASSUMPTIONS.electricityPricePerKwh;
  const combustionMonth =
    (kmMonth / CALCULATION_ASSUMPTIONS.combustionKmPerGallon) *
    CALCULATION_ASSUMPTIONS.gasolinePricePerGallon;
  const evYear = evMonth * 12;
  const combustionYear = combustionMonth * 12;
  const savingsMonth = combustionMonth - evMonth;
  const savingsYear = combustionYear - evYear;
  const savingsPercent =
    combustionYear > 0 ? Math.round((savingsYear / combustionYear) * 100) : 0;
  const co2ReductionKg =
    (CALCULATION_ASSUMPTIONS.combustionCo2KgPerKm -
      CALCULATION_ASSUMPTIONS.evCo2KgPerKm) *
    kmYear;

  return {
    kmMonth,
    kmYear,
    evMonth,
    evYear,
    combustionMonth,
    combustionYear,
    savingsMonth,
    savingsYear,
    savingsPercent,
    co2ReductionTon: co2ReductionKg / 1000,
    treesEquivalent: Math.round(
      co2ReductionKg / CALCULATION_ASSUMPTIONS.treeCo2KgPerYear,
    ),
  };
}

export function getChargerRecommendation(
  tier: ChargerTier,
): ChargerRecommendation {
  if (tier === "fleet") {
    return {
      name: "EVinka Fleet 22kW",
      badge: "Ideal para flotas y alta rotacion",
      powerKw: 22,
      description: "Mayor potencia para baterias grandes y operaciones intensivas.",
      image: "/charger-images/evinka-minibox.png",
    };
  }

  if (tier === "pro") {
    return {
      name: "EVinka Pro 11kW",
      badge: "Ideal para SUV y baterias medianas",
      powerKw: 11,
      description: "Carga equilibrada para hogares premium y empresas.",
      image: "/charger-images/evinka-minibox.png",
    };
  }

  return {
    name: "EVinka Minibox 7kW",
    badge: "Ideal para uso residencial",
    powerKw: 7,
    description: "Compacto, seguro y eficiente para el dia a dia.",
    image: "/charger-images/evinka-minibox.png",
  };
}

export function estimateChargeTime(vehicle: Vehicle, powerKw: number) {
  const hours = (vehicle.batteryKwh / powerKw) * 1.15;
  const min = Math.max(1, Math.floor(hours));
  const max = Math.max(min + 1, Math.ceil(hours + 1));
  return `${min}-${max} horas`;
}

export function formatSoles(value: number) {
  return `S/ ${Math.round(value).toLocaleString("es-PE")}`;
}

export function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
