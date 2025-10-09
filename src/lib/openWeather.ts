const API_KEY = process.env.OPENWEATHER_API_KEY; 
const BASE = "https://api.openweathermap.org/data/2.5";

export async function fetchCurrentByCoords(lat: number, lon: number) {
  try {
    const res = await fetch(`${BASE}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch current weather: ${res.status} - ${text}`);
    }
    return res.json();
  } catch (err) {
    console.error("fetchCurrentByCoords error:", err);
    throw err;
  }
}

export async function fetchOneCall(lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch forecast data: ${res.status} - ${text}`);
    }
    const data = await res.json();

    const list: any[] = Array.isArray(data?.list) ? data.list : [];

    // Build hourly: first 24 entries mapped to { dt, temp }
    const hourly = list.slice(0, 24).map((item) => ({
      dt: Math.floor(new Date(item.dt_txt).getTime() / 1000),
      temp: item.main?.temp
    }));

    // Group by calendar date (YYYY-MM-DD)
    const groups: Record<string, any[]> = {};
    for (const item of list) {
      const dateStr = item.dt_txt?.slice(0, 10);
      if (!dateStr) continue;
      if (!groups[dateStr]) groups[dateStr] = [];
      groups[dateStr].push(item);
    }

    // Pick up to 5 days, prefer 12:00:00 entry, else middle of the day's entries
    const daily: any[] = Object.keys(groups)
      .sort()
      .slice(0, 5)
      .map((dateStr) => {
        const dayItems = groups[dateStr];
        const noon = dayItems.find((i) => i.dt_txt.includes("12:00:00")) || dayItems[Math.floor(dayItems.length / 2)];
        const dt = Math.floor(new Date(dateStr + "T12:00:00Z").getTime() / 1000);
        const temp = { day: noon?.main?.temp };
        const weather = Array.isArray(noon?.weather) ? noon.weather.map((w: any) => ({ description: w.description })) : [{ description: "" }];
        return { dt, temp, weather };
      });

    return { hourly, daily };
  } catch (err) {
    console.error("fetchOneCall error:", err);
    throw err;
  }
}

// Geocoding (server-side only). Returns array of cities.
export async function geocodeCity(query: string) {
  if (!query || !query.trim()) return [];
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to geocode: ${res.status} - ${text}`);
    }
    return res.json();
  } catch (err) {
    console.error("geocodeCity error:", err);
    throw err;
  }
}


