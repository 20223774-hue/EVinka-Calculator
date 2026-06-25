import React, { memo, Suspense, useEffect, useState } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

function shouldLoadHeavyScene() {
  const largeEnough = window.matchMedia("(min-width: 900px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  const hardware = navigator as Navigator & { deviceMemory?: number };
  const cores = hardware.hardwareConcurrency ?? 4;
  const memory = hardware.deviceMemory ?? 4;
  const capableHardware = cores >= 8 && memory >= 4;
  const lowPowerViewport =
    window.innerWidth < 1200 &&
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;

  return (
    largeEnough &&
    capableHardware &&
    !reducedMotion &&
    !connection?.saveData &&
    !lowPowerViewport
  );
}

function SplineBackgroundComponent() {
  const [loadSpline, setLoadSpline] = useState(false);

  useEffect(() => {
    let timeout: number | undefined;
    let resizeTimeout: number | undefined;
    let cancelled = false;

    const clearScheduledLoad = () => {
      if (timeout) {
        window.clearTimeout(timeout);
        timeout = undefined;
      }
    };

    const scheduleSpline = () => {
      clearScheduledLoad();

      if (!shouldLoadHeavyScene()) {
        setLoadSpline(false);
        return;
      }

      const showSpline = () => {
        if (!cancelled && shouldLoadHeavyScene()) {
          setLoadSpline(true);
        }
      };

      timeout = window.setTimeout(showSpline, 4800);
    };

    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      resizeTimeout = window.setTimeout(scheduleSpline, 160);
    };

    scheduleSpline();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      clearScheduledLoad();
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="evinka-performance-bg absolute inset-0" />

      {loadSpline ? (
        <Suspense fallback={null}>
          <div className="absolute inset-0 opacity-70 [contain:layout_paint_size]">
            <Spline
              scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
              className="h-full w-full"
            />
          </div>
        </Suspense>
      ) : null}
    </div>
  );
}

export const SplineBackground = memo(SplineBackgroundComponent);
