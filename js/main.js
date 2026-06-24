document.addEventListener("DOMContentLoaded", () => {
  // State
  const state = {
    marca: "BYD",
    vehiculo: "Dolphin",
    km_diarios: 60,
    resultados: null,
  };

  // Elements
  const marcaSelect = document.getElementById("select-marca");
  const modeloSelect = document.getElementById("select-modelo");
  const sliderKm = document.getElementById("slider-km");
  const sliderValue = document.getElementById("slider-value");
  const sliderFill = document.getElementById("slider-fill");

  // Results elements
  const elAhorroAnio = document.getElementById("ahorro-anio");
  const elAhorroMes = document.getElementById("ahorro-mes");
  const elPorcentaje = document.getElementById("porcentaje-ahorro");
  const elEvMes = document.getElementById("ev-mes");
  const elEvAnio = document.getElementById("ev-anio");
  const elCombMes = document.getElementById("comb-mes");
  const elCombAnio = document.getElementById("comb-anio");
  const elCo2 = document.getElementById("co2-ton");
  const elArboles = document.getElementById("arboles");
  const elModeloLabel = document.getElementById("modelo-label");
  const elCargadorNombre = document.getElementById("cargador-nombre");
  const elCargadorDesc = document.getElementById("cargador-desc");
  const elCargadorPotencia = document.getElementById("cargador-potencia");
  const elCargadorTiempo = document.getElementById("cargador-tiempo");
  const elCargadorCompatible = document.getElementById("cargador-compatible");
  const btnVerProducto = document.getElementById("btn-ver-producto");

  // Animator
  const animator = new CarAnimator(".car-stage");

  // Populate marcas
  Object.keys(VEHICULOS).forEach(marca => {
    const opt = document.createElement("option");
    opt.value = marca;
    opt.textContent = marca;
    marcaSelect.appendChild(opt);
  });

  function populateModelos(marca) {
    modeloSelect.innerHTML = "";
    Object.keys(VEHICULOS[marca]).forEach(modelo => {
      const opt = document.createElement("option");
      opt.value = modelo;
      opt.textContent = modelo;
      modeloSelect.appendChild(opt);
    });
    state.vehiculo = Object.keys(VEHICULOS[marca])[0];
    modeloSelect.value = state.vehiculo;
  }

  function updateSliderFill(val) {
    const pct = ((val - 0) / (300 - 0)) * 100;
    sliderFill.style.width = pct + "%";
    // Position the bubble
    const bubble = document.getElementById("slider-bubble");
    if (bubble) {
      bubble.style.left = `calc(${pct}% - ${pct * 0.28}px)`;
    }
  }

  function formatSoles(n) {
    return "S/ " + n.toLocaleString("es-PE");
  }

  let prevAhorroAnio = 0;
  let prevEvAnio = 0;
  let prevCombAnio = 0;

  function updateResultados() {
    const res = calcularAhorro(
      { marca: state.marca, vehiculo: state.vehiculo },
      state.km_diarios
    );
    state.resultados = res;

    animateCounter(elAhorroAnio, prevAhorroAnio, res.ahorro_anio, 700);
    prevAhorroAnio = res.ahorro_anio;

    elAhorroMes.textContent = formatSoles(res.ahorro_mes) + " /mes";
    elPorcentaje.textContent = `≈ ${res.porcentaje_ahorro}% menos gasto en energía`;

    animateCounter(elEvAnio, prevEvAnio, res.costo_ev_anio, 700);
    prevEvAnio = res.costo_ev_anio;
    elEvMes.textContent = formatSoles(res.costo_ev_mes) + " /mes";

    animateCounter(elCombAnio, prevCombAnio, res.costo_combustion_anio, 700);
    prevCombAnio = res.costo_combustion_anio;
    elCombMes.textContent = formatSoles(res.costo_combustion_mes) + " /mes";

    elCo2.textContent = res.co2_reduccion_ton + " ton";
    elArboles.textContent = res.arboles_equivalentes + " árboles";

    // Cargador
    const info = VEHICULOS[state.marca][state.vehiculo];
    elModeloLabel.textContent = state.vehiculo;
    elCargadorNombre.textContent = info.cargador;
    elCargadorDesc.textContent = info.descripcion;
    elCargadorPotencia.textContent = info.potencia_kw + " kW";
    elCargadorTiempo.textContent = info.tiempo_carga;
    elCargadorCompatible.textContent = state.marca + " " + state.vehiculo;

    // Update hero subtitle
    const heroModelName = document.getElementById("hero-modelo-name");
    if (heroModelName) heroModelName.textContent = state.marca + " " + state.vehiculo;
  }

  async function handleModelChange() {
    const info = VEHICULOS[state.marca][state.vehiculo];
    await animator.changeCar(state.marca, state.vehiculo, info.imagen);
    updateResultados();
  }

  // Event: marca change
  marcaSelect.addEventListener("change", () => {
    state.marca = marcaSelect.value;
    populateModelos(state.marca);
    handleModelChange();
  });

  // Event: modelo change
  modeloSelect.addEventListener("change", () => {
    state.vehiculo = modeloSelect.value;
    handleModelChange();
  });

  // Event: slider
  sliderKm.addEventListener("input", () => {
    state.km_diarios = parseInt(sliderKm.value);
    sliderValue.textContent = state.km_diarios;
    updateSliderFill(state.km_diarios);
    updateResultados();
  });

  // Init
  populateModelos(state.marca);
  updateSliderFill(state.km_diarios);
  handleModelChange();
  initScrollAnimations();
});
