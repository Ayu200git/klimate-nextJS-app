 "use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type City = { name: string; lat: number; lon: number; country?: string };
type FavContext = { favs: City[]; add: (c: City) => void; remove: (lat: number, lon: number) => void };

const FavoritesContext = createContext<FavContext | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favs, setFavs] = useState<City[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("klimate_favs");
    if (raw) setFavs(JSON.parse(raw));
  }, []);

  useEffect(() => localStorage.setItem("klimate_favs", JSON.stringify(favs)), [favs]);

  function add(c: City) {
    setFavs((p) => (p.some((x) => x.lat === c.lat && x.lon === c.lon) ? p : [...p, c]));
  }
  function remove(lat: number, lon: number) {
    setFavs((p) => p.filter((x) => !(x.lat === lat && x.lon === lon)));
  }

  return <FavoritesContext.Provider value={{ favs, add, remove }}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}



