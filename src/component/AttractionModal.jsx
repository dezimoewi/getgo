import React, { useEffect, useState } from "react";

export default function AttractionModal({ place, onClose }) {
  const [wiki, setWiki] = useState(null);

  useEffect(() => {
    async function fetchWiki() {
      try {
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            place.properties.name
          )}`
        );
        const data = await res.json();
        setWiki(data);
      } catch {
        setWiki(null);
      }
    }

    fetchWiki();
  }, [place]);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white max-w-2xl w-full rounded-xl overflow-hidden">
        <img
          src={place.image}
          alt={place.properties.name}
          className="h-56 w-full object-cover"
        />

        <div className="p-6">
          <h2 className="text-2xl font-bold">
            {place.properties.name}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {place.category}
          </p>

          {wiki?.extract && (
            <p className="mt-4 text-gray-700 leading-relaxed">
              {wiki.extract}
            </p>
          )}

          {wiki?.content_urls?.desktop?.page && (
            <a
              href={wiki.content_urls.desktop.page}
              target="_blank"
              className="text-blue-600 underline mt-4 inline-block"
            >
              Read more on Wikipedia
            </a>
          )}

          <button
            onClick={onClose}
            className="mt-6 px-4 py-2 bg-gray-900 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
