"use client";

import HourlyChart from "@/components/HourlyChart";
import SearchModal from "@/components/SearchModel";
import { useFavorites } from "@/context/favouritesContext";
import { useState } from "react";

// Separate client-side component for interactivity
export default function DashboardClientComponent({ current, hourly }: { current: any; hourly: any }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { add, favs } = useFavorites();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setSearchOpen(true)}
        >
          Search City
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded shadow bg-white dark:bg-slate-800">
          <h3 className="text-xl font-semibold">
            {current.name}, {current.sys.country}
          </h3>
          <div className="text-5xl font-bold my-2">{Math.round(current.main.temp)}°C</div>
          <div className="capitalize">{current.weather[0].description}</div>
          <button
            className="mt-3 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() =>
              add({
                name: current.name,
                lat: current.coord.lat,
                lon: current.coord.lon,
                country: current.sys.country
              })
            }
          >
            Add to Favorites
          </button>
        </div>

        <div className="p-4 border rounded shadow bg-white dark:bg-slate-800">
          <h4 className="text-lg font-semibold mb-2">Hourly Forecast</h4>
          <HourlyChart hourly={hourly} />
        </div>
      </div>

      {favs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Favorites</h3>
          <div className="flex flex-wrap gap-3">
            {favs.map((city: any, i: any) => (
              <div key={i} className="p-3 border rounded shadow bg-white dark:bg-slate-800">
                <p>
                  {city.name}, {city.country}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchOpen && (
        <SearchModal
          onSelect={(city) => {
            add(city);
            setSearchOpen(false);
          }}
        />
      )}
    </div>
  );
}