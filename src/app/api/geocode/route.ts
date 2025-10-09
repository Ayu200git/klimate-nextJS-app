import { geocodeCity } from "@/lib/openWeather";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  try {
    const results = await geocodeCity(q);
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Failed to geocode" }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
}


