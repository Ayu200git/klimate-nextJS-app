"use client";
import { useState } from "react";

interface SearchModalProps {
  onSelect: (city: { name: string; lat: number; lon: number; country?: string }) => void;
}

export default function SearchModal({ onSelect }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  async function search() {
    const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 p-4 rounded w-96">
        <input
          className="w-full p-2 mb-2 rounded border"
          placeholder="Enter city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
          onClick={search}
        >
          Search
        </button>
        <div className="max-h-60 overflow-y-auto">
          {results.map((city, i) => (
            <div
              key={i}
              className="p-2 border-b cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700"
              onClick={() =>
                onSelect({ name: city.name, lat: city.lat, lon: city.lon, country: city.country })
              }
            >
              {city.name}, {city.country}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

