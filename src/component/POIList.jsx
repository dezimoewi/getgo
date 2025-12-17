
import { useQuery } from "@tanstack/react-query";
import { fetchAttractions } from "../hooks/geoapify";

export default function POIList({ lat, lon }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pois", lat, lon],
    queryFn: () => fetchAttractions(lat, lon),
    enabled: !!lat && !!lon,
  });

  if (isLoading) return <div>Loading POIs...</div>;
  if (error) return <div>Error loading POIs</div>;

  return (
    <div className="p-4 bg-white rounded shadow space-y-3">
      <h3 className="font-semibold">Attractions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data.map((p) => (
          <div key={p.properties.place_id} className="border rounded p-2">
            <div className="font-medium">{p.properties.name}</div>
            <div className="text-sm text-slate-600">
              {p.properties.categories?.join(", ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
