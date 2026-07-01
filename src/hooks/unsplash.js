const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;


export async function fetchPlaceImage(name, city, country) {
  if (!name) return null;

  try {
    const query = `${name} ${city || ""} ${country || ""} landmark`;

    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=1&orientation=landscape&client_id=${UNSPLASH_KEY}`
    );

    const data = await res.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }

    return null;
  } catch (err) {
    console.error("Unsplash image error:", err);
    return null;
  }
}
