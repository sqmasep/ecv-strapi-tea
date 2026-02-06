"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useTeaFilters } from "../hooks/useTeaFilters";
import { Slider } from "@/components/ui/slider";

export function TeaFilters({
  types,
}: {
  types: {
    id: string;
    name: string;
    teas: any[];
  }[];
}) {
  const [get, set] = useTeaFilters();

  return (
    <div>
      <div className="uppercase font-semibold text-zinc-500">Tea types</div>
      <div className="flex flex-col gap-8">
        {types.map(type => (
          <label
            htmlFor={`tea-type-${type.name}`}
            key={type.id}
            className="flex items-center gap-2 p-2 bg-zinc-100"
          >
            <Checkbox
              id={`tea-type-${type.name}`}
              checked={get.type?.includes(type.name)}
              onCheckedChange={checked => {
                const current = get.type || [];

                if (checked) {
                  set({ type: [...current, type.name] });
                } else {
                  set({ type: current.filter(name => name !== type.name) });
                }
              }}
            />
            {type.name} ({type.teas.length})
          </label>
        ))}
      </div>

      <div className="uppercase font-semibold text-zinc-500">Time</div>

      <Slider
        value={get.time || 0}
        onValueChange={value => set({ time: value })}
      />
    </div>
  );
}
