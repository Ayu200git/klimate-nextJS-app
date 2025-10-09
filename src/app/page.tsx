import { fetchCurrentByCoords, fetchOneCall } from "@/lib/openWeather";
import DashboardClientComponent from "@/components/dashboardClientComponent";
import { FavoritesProvider } from "@/context/favouritesContext";

const DEFAULT_COORDS = { lat: 28.6139, lon: 77.209 }; // Delhi

// This is a Server Component, so it can be async and fetch data directly.
export default async function DashboardPage() {
  let current;
  let oneCall;

  try {
    current = await fetchCurrentByCoords(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon);
    oneCall = await fetchOneCall(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon);
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    return (
      <div>
        <p className="text-red-500">Failed to load weather data. Please try again later.</p>
      </div>
    );
  }

  return (
    <FavoritesProvider>
      <DashboardClientComponent current={current} hourly={oneCall.hourly} />
    </FavoritesProvider>
  );
}
 


