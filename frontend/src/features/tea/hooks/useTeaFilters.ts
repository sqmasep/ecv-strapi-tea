import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";

export function useTeaFilters() {
  return useQueryStates({
    type: parseAsArrayOf(parseAsString),
    maxTime: parseAsInteger,
    maxTemp: parseAsInteger,
  });
}
