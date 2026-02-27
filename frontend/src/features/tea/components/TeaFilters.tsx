"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useTeaFilters } from "../hooks/useTeaFilters";
import type { TeaItem } from "./TeaGrid";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="uppercase font-semibold text-xs tracking-wider text-zinc-400">
        {title}
      </p>
      {children}
    </div>
  );
}

export function TeaFilters({
  types,
  teas,
}: {
  types: { id: string; name: string; teas: TeaItem[] }[];
  teas: TeaItem[];
}) {
  const [filters, set] = useTeaFilters();

  const temperatures = teas
    .map(t => t.temperature)
    .filter((v): v is number => v != null);
  const infusionTimes = teas
    .map(t => t.infusionTime)
    .filter((v): v is number => v != null);

  const minTemp = temperatures.length ? Math.min(...temperatures) : 50;
  const maxTemp = temperatures.length ? Math.max(...temperatures) : 100;
  const minTime = infusionTimes.length ? Math.min(...infusionTimes) : 1;
  const maxTime = infusionTimes.length ? Math.max(...infusionTimes) : 10;

  const activeMaxTemp = filters.maxTemp ?? maxTemp;
  const activeMaxTime = filters.maxTime ?? maxTime;

  const hasFilters =
    (filters.type?.length ?? 0) > 0 ||
    filters.maxTemp != null ||
    filters.maxTime != null;

  return (
    <div className="flex flex-col gap-6">
      {hasFilters && (
        <button
          onClick={() => set({ type: null, maxTemp: null, maxTime: null })}
          className="text-xs text-rose-500 hover:underline text-left"
        >
          Réinitialiser les filtres
        </button>
      )}

      {/* Tea types */}
      <Section title="Types de thé">
        <div className="flex flex-col gap-1.5">
          {types.map(type => (
            <label
              htmlFor={`tea-type-${type.name}`}
              key={type.id}
              className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded hover:bg-zinc-100 transition-colors"
            >
              <Checkbox
                id={`tea-type-${type.name}`}
                checked={filters.type?.includes(type.name) ?? false}
                onCheckedChange={checked => {
                  const current = filters.type ?? [];
                  set({
                    type: checked
                      ? [...current, type.name]
                      : current.filter(n => n !== type.name),
                  });
                }}
              />
              <span className="text-sm text-zinc-700 flex-1">{type.name}</span>
              <span className="text-xs text-zinc-400">{type.teas.length}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Infusion time */}
      {infusionTimes.length > 0 && (
        <Section title={`Temps d'infusion (max ${activeMaxTime} min)`}>
          <Slider
            min={minTime}
            max={maxTime}
            step={1}
            value={[activeMaxTime]}
            onValueChange={([v]) => set({ maxTime: v === maxTime ? null : v })}
          />
          <div className="flex justify-between text-xs text-zinc-400 mt-1">
            <span>{minTime} min</span>
            <span>{maxTime} min</span>
          </div>
        </Section>
      )}

      {/* Temperature */}
      {temperatures.length > 0 && (
        <Section title={`Température (max ${activeMaxTemp} °C)`}>
          <Slider
            min={minTemp}
            max={maxTemp}
            step={5}
            value={[activeMaxTemp]}
            onValueChange={([v]) => set({ maxTemp: v === maxTemp ? null : v })}
          />
          <div className="flex justify-between text-xs text-zinc-400 mt-1">
            <span>{minTemp} °C</span>
            <span>{maxTemp} °C</span>
          </div>
        </Section>
      )}
    </div>
  );
}
