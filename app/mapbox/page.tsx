'use client';

import { useEffect, useRef } from 'react';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export default function Page() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Si la carte est déjà initialisée, ne pas ré-initialiser

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
    });
  }, []);

  return (
    <div ref={mapContainer} id="my-map" style={{ height: 500, width: 800 }} />
  );
}
