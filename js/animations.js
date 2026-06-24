class CarAnimator {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.currentCar = null;
    this.isAnimating = false;
  }

  async changeCar(marca, modelo, imagenSrc) {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const oldCar = this.container.querySelector(".car-image-wrapper");

    // Create new car element
    const newWrapper = document.createElement("div");
    newWrapper.className = "car-image-wrapper car-enter-left";

    const img = document.createElement("img");
    img.className = "car-img";
    img.alt = `${marca} ${modelo}`;
    img.src = imagenSrc;

    // Wheels overlay for spinning effect
    const wheelsOverlay = document.createElement("div");
    wheelsOverlay.className = "wheels-overlay";
    wheelsOverlay.innerHTML = `
      <div class="wheel wheel-front"></div>
      <div class="wheel wheel-rear"></div>
    `;

    // Motion lines
    const motionLines = document.createElement("div");
    motionLines.className = "motion-lines";
    for (let i = 0; i < 5; i++) {
      const line = document.createElement("div");
      line.className = "motion-line";
      motionLines.appendChild(line);
    }

    newWrapper.appendChild(img);
    newWrapper.appendChild(wheelsOverlay);
    newWrapper.appendChild(motionLines);

    if (oldCar) {
      // Show motion lines on old car
      const oldLines = oldCar.querySelector(".motion-lines");
      if (oldLines) oldLines.classList.add("active");

      // Animate wheels spinning on old car
      const oldWheels = oldCar.querySelectorAll(".wheel");
      oldWheels.forEach(w => w.classList.add("spinning-fast"));

      // Glow pulse
      const glow = this.container.closest(".hero-visual")?.querySelector(".glow-ring");
      if (glow) glow.classList.add("pulse");

      // Exit old car to the right
      oldCar.classList.add("car-exit-right");

      await sleep(150);

      // Insert new car hidden to the left
      this.container.appendChild(newWrapper);

      await sleep(400);

      // Remove old car
      oldCar.remove();

      // Animate new car in from the left
      newWrapper.classList.remove("car-enter-left");
      newWrapper.classList.add("car-arrive");

      // Show motion lines briefly on new car
      const newLines = newWrapper.querySelector(".motion-lines");
      if (newLines) {
        newLines.classList.add("active");
        setTimeout(() => newLines.classList.remove("active"), 600);
      }

      // Decelerate wheels
      const newWheels = newWrapper.querySelectorAll(".wheel");
      newWheels.forEach(w => {
        w.classList.add("spinning-fast");
        setTimeout(() => {
          w.classList.remove("spinning-fast");
          w.classList.add("spinning-slow");
          setTimeout(() => w.classList.remove("spinning-slow"), 800);
        }, 500);
      });

      if (glow) {
        setTimeout(() => glow.classList.remove("pulse"), 700);
      }

    } else {
      // First load — just appear
      this.container.appendChild(newWrapper);
      newWrapper.classList.remove("car-enter-left");
      newWrapper.classList.add("car-arrive");
    }

    this.currentCar = newWrapper;
    setTimeout(() => { this.isAnimating = false; }, 900);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Counter animation for numbers
function animateCounter(element, from, to, duration = 800, prefix = "S/ ") {
  const start = performance.now();
  const diff = to - from;

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(from + diff * eased);
    element.textContent = prefix + current.toLocaleString("es-PE");
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Intersection observer for entrance animations
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));
}
