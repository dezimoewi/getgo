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
    <div className="modal-overlay">
      <div className="modal-content">
        {place.image && (
          <img
            src={place.image}
            alt={place.properties.name}
          />
        )}

        <div className="modal-body">
          <h2>{place.properties.name}</h2>

          {place.category && (
            <p className="category">{place.category}</p>
          )}

          {wiki?.extract && (
            <p className="description">{wiki.extract}</p>
          )}

          {wiki?.content_urls?.desktop?.page && (
            <a
              href={wiki.content_urls.desktop.page}
              target="_blank"
              rel="noopener noreferrer"
              className="wiki-link"
            >
              Read more on Wikipedia
            </a>
          )}

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={onClose} className="modal-close-btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
