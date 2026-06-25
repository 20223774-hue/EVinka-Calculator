import { useState } from "react";
import type { Brand } from "../data/vehicles";
import { BrandMark } from "./BrandMark";

type BrandSelectProps = {
  brands: Brand[];
  value: Brand;
  onChange: (brand: Brand) => void;
};

export function BrandSelect({ brands, value, onChange }: BrandSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onBlur={(event) => {
        const nextTarget = event.relatedTarget as Node | null;
        if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        data-testid="brand-select"
        className="flex h-12 w-full items-center justify-between rounded-lg border border-white/10 bg-white/[0.07] px-3 text-left text-sm text-foreground outline-none transition hover:border-primary/50 focus:border-primary"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="flex min-w-0 items-center gap-3">
          <BrandMark brand={value} size="sm" />
          <span className="truncate">{value.name}</span>
        </span>
        <span
          aria-hidden="true"
          className="h-2 w-2 shrink-0 rotate-45 border-b border-r border-muted-foreground"
        />
      </button>

      {open ? (
        <div
          data-testid="brand-options"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 max-h-64 overflow-auto rounded-xl border border-white/10 bg-zinc-950/95 p-2 shadow-2xl backdrop-blur-xl"
        >
          {brands.map((brand) => (
            <button
              key={brand.id}
              type="button"
              data-testid={`brand-option-${brand.id}`}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-foreground transition hover:bg-white/10"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                onChange(brand);
                setOpen(false);
              }}
            >
              <BrandMark brand={brand} size="sm" />
              <span>{brand.name}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
