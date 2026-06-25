import type { ChargerTier, Vehicle } from "../data/vehicles";
import { copy, type Language } from "./i18n";

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
  powerLabel?: string;
  description: string;
  image: string;
  specs?: Array<{
    label: string;
    value: string;
  }>;
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

const LUXURY_BRANDS = new Set([
  "Audi",
  "BMW",
  "Mercedes-Benz",
  "MINI",
  "Porsche",
]);

const LUXURY_MODEL_IDS = new Set([
  "byd-seal-awd",
  "byd-sealion-7-awd",
  "byd-tang-ev-gs",
  "kia-ev9",
  "mg-cyberster",
  "volvo-ec40-plus",
  "volvo-ec40-ultra",
  "volvo-ex40-single-motor",
  "volvo-ex40-twin-motor",
  "volvo-ex90-twin-motor",
  "volvo-ex90-twin-motor-performance",
]);

export function isLuxuryVehicle(vehicle: Vehicle) {
  return LUXURY_BRANDS.has(vehicle.brand) || LUXURY_MODEL_IDS.has(vehicle.id);
}

export function getChargerRecommendation(
  vehicle: Vehicle,
  language: Language,
): ChargerRecommendation {
  const t = copy[language].charger;

  if (isLuxuryVehicle(vehicle)) {
    return {
      name: "EVinka Alien X",
      badge: t.luxuryBadge,
      powerKw: 22,
      powerLabel: "7 / 11 / 22 kW",
      description: t.luxuryDescription,
      image: "/charger-images/evinka-alien-x.png",
      specs: [
        { label: t.capacity, value: "7 / 11 / 22 kW" },
        { label: t.efficiency, value: "96%" },
        { label: t.communication, value: "OCPP 1.6J" },
        {
          label: t.protection,
          value: language === "es" ? "IP54 + Tipo B 6mA" : "IP54 + Type B 6mA",
        },
      ],
    };
  }

  return getTierChargerRecommendation(vehicle.chargerTier, language);
}

function getTierChargerRecommendation(
  tier: ChargerTier,
  language: Language,
): ChargerRecommendation {
  const t = copy[language].charger;

  if (tier === "fleet") {
    return {
      name: "EVinka Fleet 22kW",
      badge: t.fleetBadge,
      powerKw: 22,
      description: t.fleetDescription,
      image: "/charger-images/evinka-minibox.png",
    };
  }

  if (tier === "pro") {
    return {
      name: "EVinka Pro 11kW",
      badge: t.proBadge,
      powerKw: 11,
      description: t.proDescription,
      image: "/charger-images/evinka-minibox.png",
    };
  }

  return {
    name: "EVinka Minibox 7kW",
    badge: t.homeBadge,
    powerKw: 7,
    description: t.homeDescription,
    image: "/charger-images/evinka-minibox.png",
  };
}

export function estimateChargeTime(
  vehicle: Vehicle,
  powerKw: number,
  language: Language = "es",
) {
  const hours = (vehicle.batteryKwh / powerKw) * 1.15;
  const min = Math.max(1, Math.floor(hours));
  const max = Math.max(min + 1, Math.ceil(hours + 1));
  return `${min}-${max} ${copy[language].charger.hours}`;
}

export function formatSoles(value: number) {
  return `S/ ${Math.round(value).toLocaleString("es-PE")}`;
}

export function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
