"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useToggle } from "@/hooks/useToggle";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const MAX_INITIAL_RESULTS = 5;

export function Search() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [search, setSearch] = useState("");
  const [showResults, toggleShowResults] = useToggle(false);
  const debouncedSearch = useDebounce(search, 500);
  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const query = useMemo(() => debouncedSearch.trim(), [debouncedSearch]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node | null;
      if (!target) return;

      if (containerRef.current && !containerRef.current.contains(target)) {
        toggleShowResults(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [toggleShowResults]);

  useEffect(() => {
    // Reset pagination when the query changes
    setPage(1);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setError(null);

      if (!query) {
        setResults([]);
        setHasMore(false);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&page=${page}&pageSize=${MAX_INITIAL_RESULTS}`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error(`Search request failed (${res.status})`);
        }

        const data = (await res.json()) as any[];

        setResults(current => (page === 1 ? data : [...current, ...data]));
        setHasMore(data.length === MAX_INITIAL_RESULTS);
      } catch (e) {
        if ((e as any)?.name === "AbortError") return;
        setError("Search failed. Try again.");
        setResults([]);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [page, query]);

  const shouldShowExpand = hasMore && !isLoading;
  const displayedResults = results;

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    toggleShowResults(true);
  }

  function handleExpandClick() {
    setPage(p => p + 1);
  }

  function handleInputFocus() {
    toggleShowResults(true);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      toggleShowResults(false);
      inputRef.current?.blur();
    }
  }

  const showEmptyState =
    !!query && !isLoading && !error && displayedResults.length === 0;

  return (
    <div className="relative" ref={containerRef}>
      <Input
        ref={inputRef}
        value={search}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
      />

      {showResults && (
        <div className="absolute top-full left-0 w-full bg-white border">
          {error && <div className="px-3 py-2 text-sm">{error}</div>}

          {isLoading && <div className="px-3 py-2 text-sm">Searching…</div>}

          {showEmptyState && (
            <div className="px-3 py-2 text-sm">No results.</div>
          )}

          {!isLoading &&
            !error &&
            displayedResults.map(result => (
              <Link
                href={`/teas/${result.slug}`}
                key={result.id}
                className="block px-3 py-2 text-sm hover:bg-zinc-50"
                onClick={() => toggleShowResults(false)}
              >
                {result.name}
              </Link>
            ))}

          {shouldShowExpand && (
            <div className="p-2">
              <Button onClick={handleExpandClick} className="w-full">
                Show More
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
