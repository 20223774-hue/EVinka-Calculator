export type Language = "es" | "en";

export const copy = {
  es: {
    nav: {
      toggle: "Ingles",
    },
    hero: {
      eyebrow: "Calculadora de movilidad inteligente",
      title: "EVINKA",
      subtitle: "Calcula cuanto ahorras al moverte en electrico.",
      description:
        "Elige tu marca, modelo y kilometros diarios. Comparamos energia electrica frente a gasolina, estimamos tu ahorro anual y te recomendamos el cargador EVinka adecuado.",
      source:
        "Base referencial: modelos BEV comercializados en Peru, con datos de bateria, autonomia y consumo del archivo proporcionado.",
    },
    calculator: {
      eyebrow: "Calculadora EV",
      title: "Ahorro estimado",
      country: "Peru",
      brand: "Marca",
      model: "Modelo",
      dailyKm: "Kilometros diarios",
      combustionAnnual: "Combustion anual",
      evAnnual: "EV anual",
      annualSavings: "Ahorro al ano",
      lowerSpend: "Menos gasto",
      withVehicle: "Con",
      driving: "recorriendo",
      daily: "al dia",
      saveApprox: "ahorrarias aprox.",
      perMonth: "al mes",
      evConsumption: "Consumo EV",
      battery: "Bateria",
      range: "Autonomia",
      co2Reduced: "CO2 reducido al ano",
      treesEquivalent: "arboles equivalentes",
    },
    charger: {
      heading: "Cargador recomendado",
      luxuryBadge: "Ideal para modelos exclusivos y de lujo",
      luxuryDescription:
        "Cargador premium con pantalla, luces de estado, RFID y comunicacion Ethernet o 4G opcional compatible con OCPP 1.6J.",
      fleetBadge: "Ideal para flotas y alta rotacion",
      fleetDescription:
        "Mayor potencia para baterias grandes y operaciones intensivas.",
      proBadge: "Ideal para SUV y baterias medianas",
      proDescription: "Carga equilibrada para hogares premium y empresas.",
      homeBadge: "Ideal para uso residencial",
      homeDescription: "Compacto, seguro y eficiente para el dia a dia.",
      capacity: "Capacidad",
      efficiency: "Eficiencia",
      communication: "Comunicacion",
      protection: "Proteccion",
      power: "Potencia",
      estimatedCharge: "Carga estimada",
      hours: "horas",
    },
    car: {
      missing: "Agrega su imagen en public/car-images",
    },
  },
  en: {
    nav: {
      toggle: "Espanol",
    },
    hero: {
      eyebrow: "Smart mobility calculator",
      title: "EVINKA",
      subtitle: "Calculate how much you save by driving electric.",
      description:
        "Choose your brand, model, and daily kilometers. We compare electricity versus gasoline, estimate your annual savings, and recommend the right EVinka charger.",
      source:
        "Reference base: BEV models sold in Peru, using battery, range, and consumption data from the provided file.",
    },
    calculator: {
      eyebrow: "EV calculator",
      title: "Estimated savings",
      country: "Peru",
      brand: "Brand",
      model: "Model",
      dailyKm: "Daily kilometers",
      combustionAnnual: "Combustion annual",
      evAnnual: "EV annual",
      annualSavings: "Annual savings",
      lowerSpend: "Lower spend",
      withVehicle: "With",
      driving: "driving",
      daily: "per day",
      saveApprox: "you would save approx.",
      perMonth: "per month",
      evConsumption: "EV consumption",
      battery: "Battery",
      range: "Range",
      co2Reduced: "CO2 reduced per year",
      treesEquivalent: "equivalent trees",
    },
    charger: {
      heading: "Recommended charger",
      luxuryBadge: "Ideal for exclusive and luxury models",
      luxuryDescription:
        "Premium charger with display, status lights, RFID, and Ethernet or optional 4G communication compatible with OCPP 1.6J.",
      fleetBadge: "Ideal for fleets and high rotation",
      fleetDescription:
        "Higher power for large batteries and intensive operations.",
      proBadge: "Ideal for SUVs and mid-size batteries",
      proDescription: "Balanced charging for premium homes and businesses.",
      homeBadge: "Ideal for residential use",
      homeDescription: "Compact, safe, and efficient for everyday use.",
      capacity: "Capacity",
      efficiency: "Efficiency",
      communication: "Communication",
      protection: "Protection",
      power: "Power",
      estimatedCharge: "Estimated charge",
      hours: "hours",
    },
    car: {
      missing: "Add its image in public/car-images",
    },
  },
} as const;
