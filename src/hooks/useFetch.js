import { useEffect, useRef, useState } from "react";

const CACHE = new Map();

export default function useFetch(key, fetcher, opts = {}) {
  const { staleTime = 1000 * 60 * 5 } = opts;
  const mounted = useRef(true);
  const [state, setState] = useState({ status: "idle", data: null, error: null });

  useEffect(() => {
    mounted.current = true;
    let cancelled = false;
    async function load() {
      if (!key) return;
      setState({ status: "loading", data: null, error: null });

      const cached = CACHE.get(key);
      if (cached && Date.now() - cached.t < staleTime) {
        setState({ status: "success", data: cached.v, error: null });
        return;
      }

      const maxAttempts = 2;
      let attempt = 0;
      while (attempt <= maxAttempts && !cancelled) {
        try {
          const res = await fetcher();
          CACHE.set(key, { v: res, t: Date.now() });
          if (!cancelled && mounted.current) setState({ status: "success", data: res, error: null });
          return;
        } catch (err) {
          attempt++;
          if (attempt > maxAttempts) {
            if (!cancelled && mounted.current) setState({ status: "error", data: null, error: err });
            return;
          }
          await new Promise(r => setTimeout(r, 300 * attempt));
        }
      }
    }
    load();
    return () => { cancelled = true; mounted.current = false; };
  }, [key, fetcher, staleTime]);

  return state;
}
