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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg overflow-hidden">
        {/* Image */}
        {place.image && (
          <img
            src={place.image}
            alt={place.properties.name}
            className="h-60 w-full object-cover rounded-t-xl"
          />
        )}

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {place.properties.name}
          </h2>

          {place.category && (
            <p className="text-gray-500 mt-1">{place.category}</p>
          )}

          {wiki?.extract && (
            <p className="mt-4 text-gray-700 leading-relaxed">{wiki.extract}</p>
          )}

          {wiki?.content_urls?.desktop?.page && (
            <a
              href={wiki.content_urls.desktop.page}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-gray-800 font-medium underline"
            >
              Read more on Wikipedia
            </a>
          )}

          {/* Close Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
