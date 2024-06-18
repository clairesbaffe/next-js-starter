'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export default function Page() {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'my-map',
      style: 'mapbox://styles/mapbox/streets-v11',
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    );
  }, []);

  return <div id="my-map" style={{ height: 500, width: 800 }} />;
}
