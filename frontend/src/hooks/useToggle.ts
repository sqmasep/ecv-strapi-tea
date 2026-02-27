import { useState } from "react";

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  function toggle(force?: boolean) {
    setValue(currentValue =>
      typeof force === "boolean" ? force : !currentValue,
    );
  }

  return [value, toggle] as const;
}
