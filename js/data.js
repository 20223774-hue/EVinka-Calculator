const CONSTANTS = {
  precio_kwh: 0.65,
  precio_galon: 17.50,
  consumo_combustion_km_galon: 30,
  factor_co2_combustion_kg_por_km: 0.21,
  factor_co2_ev_kg_por_km: 0.05,
  co2_absorbido_arbol_kg_anio: 62,
  km_por_mes_default: 60,
};

const VEHICULOS = {
  BYD: {
    Dolphin: {
      consumo_kwh_100km: 15.5,
      autonomia_km: 400,
      imagen: "assets/byd-dolphin.png",
      cargador: "EVinka Minibox 7kW",
      tiempo_carga: "4-6 horas",
      potencia_kw: 7,
      descripcion: "Compacto urbano ideal para el día a día",
    },
    "Yuan Plus": {
      consumo_kwh_100km: 16.8,
      autonomia_km: 430,
      imagen: "assets/byd-yuan-plus.png",
      cargador: "EVinka Minibox 7kW",
      tiempo_carga: "5-7 horas",
      potencia_kw: 7,
      descripcion: "SUV compacto con gran autonomía",
    },
    Seal: {
      consumo_kwh_100km: 17.2,
      autonomia_km: 570,
      imagen: "assets/byd-seal.png",
      cargador: "EVinka Pro 11kW",
      tiempo_carga: "6-8 horas",
      potencia_kw: 11,
      descripcion: "Sedán deportivo de alta gama",
    },
    Atto3: {
      consumo_kwh_100km: 18.0,
      autonomia_km: 480,
      imagen: "assets/byd-atto3.png",
      cargador: "EVinka Pro 11kW",
      tiempo_carga: "6-8 horas",
      potencia_kw: 11,
      descripcion: "SUV familiar versátil y seguro",
    },
  },
  Chery: {
    "Omoda E5": {
      consumo_kwh_100km: 17.5,
      autonomia_km: 430,
      imagen: "assets/chery-omoda-e5.png",
      cargador: "EVinka Minibox 7kW",
      tiempo_carga: "5-7 horas",
      potencia_kw: 7,
      descripcion: "SUV eléctrico moderno y equipado",
    },
  },
  MG: {
    "MG4 Electric": {
      consumo_kwh_100km: 16.0,
      autonomia_km: 430,
      imagen: "assets/mg4.png",
      cargador: "EVinka Minibox 7kW",
      tiempo_carga: "4-6 horas",
      potencia_kw: 7,
      descripcion: "Hatchback eléctrico dinámico",
    },
  },
};

function calcularAhorro(modelo, km_diarios) {
  const km_mes = km_diarios * 30;
  const km_anio = km_mes * 12;

  const consumo = VEHICULOS[modelo.marca][modelo.vehiculo].consumo_kwh_100km;

  const kwh_mes = (consumo / 100) * km_mes;
  const costo_ev_mes = kwh_mes * CONSTANTS.precio_kwh;
  const costo_ev_anio = costo_ev_mes * 12;

  const galones_mes = km_mes / CONSTANTS.consumo_combustion_km_galon;
  const costo_combustion_mes = galones_mes * CONSTANTS.precio_galon;
  const costo_combustion_anio = costo_combustion_mes * 12;

  const ahorro_mes = costo_combustion_mes - costo_ev_mes;
  const ahorro_anio = costo_combustion_anio - costo_ev_anio;
  const porcentaje_ahorro = Math.round((ahorro_anio / costo_combustion_anio) * 100);

  const co2_combustion_kg = CONSTANTS.factor_co2_combustion_kg_por_km * km_anio;
  const co2_ev_kg = CONSTANTS.factor_co2_ev_kg_por_km * km_anio;
  const co2_reduccion_kg = co2_combustion_kg - co2_ev_kg;
  const co2_reduccion_ton = (co2_reduccion_kg / 1000).toFixed(1);
  const arboles_equivalentes = Math.round(co2_reduccion_kg / CONSTANTS.co2_absorbido_arbol_kg_anio);

  return {
    costo_ev_mes: Math.round(costo_ev_mes),
    costo_ev_anio: Math.round(costo_ev_anio),
    costo_combustion_mes: Math.round(costo_combustion_mes),
    costo_combustion_anio: Math.round(costo_combustion_anio),
    ahorro_mes: Math.round(ahorro_mes),
    ahorro_anio: Math.round(ahorro_anio),
    porcentaje_ahorro,
    co2_reduccion_ton,
    arboles_equivalentes,
  };
}
