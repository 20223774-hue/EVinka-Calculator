import { useState } from "react";
import type { Brand } from "../data/vehicles";
import { publicAsset } from "../lib/calculator";

type BrandMarkProps = {
  brand: Brand;
  size?: "sm" | "md";
};

export function BrandMark({ brand, size = "md" }: BrandMarkProps) {
  const [failed, setFailed] = useState(false);
  const dimension = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const initials = brand.name
    .split(/[\s-]+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className={`${dimension} inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/10 text-[10px] font-bold text-white`}
    >
      {!failed ? (
        <img
          src={publicAsset(brand.logo)}
          alt=""
          className="h-4/5 w-4/5 object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        initials
      )}
    </span>
  );
}
