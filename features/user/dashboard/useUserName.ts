"use client";

import { useSyncExternalStore } from "react";
import type { AuthUser } from "@/features/auth/api";

const FALLBACK_USER_NAME = "Rina Kusuma";

function getStoredUserName() {
  try {
    const rawUser = window.localStorage.getItem("ewf_user");
    if (!rawUser) return FALLBACK_USER_NAME;

    const user = JSON.parse(rawUser) as AuthUser;
    return typeof user.name === "string" && user.name.trim()
      ? user.name.trim()
      : FALLBACK_USER_NAME;
  } catch (error) {
    console.error("Tidak dapat membaca informasi pengguna tersimpan.", error);
    return FALLBACK_USER_NAME;
  }
}

function subscribeToUserName(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

export function useUserName() {
  return useSyncExternalStore(
    subscribeToUserName,
    getStoredUserName,
    () => FALLBACK_USER_NAME,
  );
}
