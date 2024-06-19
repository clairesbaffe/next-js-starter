'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';
import { useEffect } from 'react';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export default function Page() {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-0.649806, 44.828618],
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-0.646692, 44.828618],
        },
      },
    ],
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'my-map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.57918, 44.837789],
      zoom: 11.5,
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    );

    // add markers to map
    geojson.features.forEach((feature, index) => {
      // create a HTML element for each feature
      const el = document.createElement('div');
      if (index == geojson.features.length - 1) el.className = 'last-marker';
      else el.className = 'previous-marker';

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup
        // new mapboxgl.Popup({ offset: 25 }) // add popups
        //   .setHTML(
        //     `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`,
        //   ),
        ()
        .addTo(map);
    });
  }, []);

  return <div id="my-map" style={{ height: 500, width: 800 }} />;
}
