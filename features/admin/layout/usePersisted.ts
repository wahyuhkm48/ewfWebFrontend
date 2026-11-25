"use client";

import { useCallback, useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
/** Cadangan bila localStorage diblokir (mode privat): nilai tetap berlaku selama tab terbuka. */
const memory = new Map<string, string>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function read(key: string): string | null {
  const cached = memory.get(key);
  if (cached !== undefined) return cached;

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * State string yang tersimpan di localStorage dan sinkron antar tab.
 * Memakai useSyncExternalStore: render server selalu memakai `fallback`,
 * lalu nilai tersimpan dipakai setelah hidrasi tanpa setState di dalam effect.
 */
export function usePersisted<T extends string>(
  key: string,
  fallback: T,
  allowed: readonly T[],
) {
  const getSnapshot = useCallback((): T => {
    const stored = read(key);
    return allowed.includes(stored as T) ? (stored as T) : fallback;
  }, [key, fallback, allowed]);

  const value = useSyncExternalStore(subscribe, getSnapshot, () => fallback);

  const set = useCallback(
    (next: T) => {
      memory.set(key, next);
      try {
        window.localStorage.setItem(key, next);
      } catch {
        // Penyimpanan diblokir; nilai tetap tersimpan di memory
      }
      emit();
    },
    [key],
  );

  return [value, set] as const;
}