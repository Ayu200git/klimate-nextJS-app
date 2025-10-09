"use client";
import { useEffect, useState } from "react";

export default function useGeolocation() {
  const [pos, setPos] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) return setError("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (p) => setPos({ lat: p.coords.latitude, lon: p.coords.longitude }),
      (err) => setError(err.message)
    );
  }, []);

  return { pos, error };
}


