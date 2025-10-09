import { fetchOneCall, geocodeCity } from "@/lib/openWeather";

interface CityPageProps {
  params: { slug: string };
}

export default async function CityPage({ params }: CityPageProps) {
  const cities = await geocodeCity(params.slug);
  if (!cities.length) return <p>City not found</p>;

  const city = cities[0];
  const data = await fetchOneCall(city.lat, city.lon);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {city.name}, {city.country}
      </h2>
      <div className="grid md:grid-cols-5 gap-4">
        {data.daily.slice(0, 5).map((day: any, idx: number) => (
          <div key={idx} className="p-3 border rounded shadow bg-white dark:bg-slate-800">
            <p className="font-semibold">{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>Temp: {Math.round(day.temp.day)}°C</p>
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
