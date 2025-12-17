
import React, { useEffect, useState } from "react";
import { fetchAttractions } from "../hooks/geoapify";
import { fetchPlaceImage } from "../hooks/unsplash";
import AttractionModal from "./AttractionModal";


export default function ActivitiesList({
  lat,
  lon,
  city,
  country,
  limit = 10,
}) {
  const [activities, setActivities] = useState([]);
  const [visible, setVisible] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    let cancelled = false;

    async function loadActivities() {
      setLoading(true);
      setError(null);

      try {
        const categories = [
          "tourist_attraction",
          "museum",
          "park",
          "entertainment",
        ];

        let results = [];

        for (const cat of categories) {
          const data = await fetchAttractions(lat, lon, limit, cat);
          if (data?.length) results.push(...data);
        }

        const unique = Array.from(
          new Map(results.map(p => [p.properties.place_id, p])).values()
        );

        const enriched = await Promise.all(
          unique.map(async (poi) => {
            const name = poi.properties.name || "Attraction";

            const image = await fetchPlaceImage(
              name,
              city,
              country
            );

            return {
              ...poi,
              image,
              category: resolveCategory(poi),
            };
          })
        );

        enriched.sort(
          (a, b) =>
            categoryPriority(a.category) -
            categoryPriority(b.category)
        );

        if (!cancelled) setActivities(enriched);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Failed to load attractions");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadActivities();
    return () => (cancelled = true);
  }, [lat, lon, city, country, limit]);

  if (loading) return <p>Loading attractions…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!activities.length) return <p>No attractions found.</p>;

  return (
    <>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">
          Attractions & Activities
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {activities.slice(0, visible).map((poi) => (
            <div
              key={poi.properties.place_id}
              onClick={() => setSelected(poi)}
              className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={
                  poi.image ||
                  "https://via.placeholder.com/400x250?text=No+Image"
                }
                alt={poi.properties.name}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <h4 className="font-semibold text-lg">
                  {poi.properties.name || "Unnamed place"}
                </h4>

                <span className="inline-block mt-2 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full capitalize">
                  {poi.category}
                </span>

                {poi.properties.distance && (
                  <p className="text-sm text-gray-500 mt-2">
                    {(poi.properties.distance / 1000).toFixed(1)} km away
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {visible < activities.length && (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisible(v => v + 6)}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Show more
            </button>
          </div>
        )}
      </div>

      {/* DETAILS MODAL */}
      {selected && (
        <AttractionModal
          place={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}

/* Helpers */
function resolveCategory(poi) {
  const raw = poi.properties?.datasource?.raw;
  if (!raw) return "Attraction";
  if (raw.museum) return "Museum";
  if (raw.tourism) return raw.tourism.replace("_", " ");
  if (raw.amenity) return raw.amenity.replace("_", " ");
  return "Attraction";
}

function categoryPriority(category) {
  if (category === "Museum") return 1;
  if (category.includes("park")) return 2;
  return 3;
}
