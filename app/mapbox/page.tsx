'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';
import { useEffect } from 'react';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;
export default function Page() {
  let geojson: any;
  async function fetchTrackers() {
    const response = await fetch(
      'https://next-js-starter-lyart.vercel.app/api/get-trackers-by-rucher-id?rucher_id=1',
    );
    const data = await response.json();
    return data;
  }

  async function fetchLocations(tracker_id: number) {
    const response = await fetch(
      `https://next-js-starter-lyart.vercel.app/api/get-locations-by-tracker-id?tracker_id=${tracker_id}`,
    );
    const data = await response.json();

    return data;
  }

  async function initialiseMap() {
    const trackers = await fetchTrackers();
    geojson = trackers.trackers;

    const locationPromises = geojson.map(async (tracker: any) => {
      const response = await fetchLocations(tracker.id);
      tracker.locations = response.locations;
    });

    await Promise.all(locationPromises);

    loadMap();
  }

  async function loadMap() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.57918, 44.837789],
      zoom: 11.5,
    });

    geojson.forEach((tracker: any) => {
      if (tracker.locations.length > 0) {
        if (tracker.mode === 'TRACKING') {
          tracker.locations.forEach((location: any, index: Number) => {
            const el = document.createElement('div');
            if (index == geojson.length - 1) el.className = 'last-marker';
            else el.className = 'previous-marker marker';
            const coordinates = [location.longitude, location.latitude];
            new mapboxgl.Marker(el)
              .setLngLat(coordinates)
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(`${tracker.nom}`),
              )
              .addTo(map);
          });
        } else {
          const last_location = tracker.locations.pop();
          const el = document.createElement('div');

          switch (tracker.mode) {
            case 'INACTIF':
              el.className = 'off-marker marker';
              break;
            case 'FONCTIONNEL':
              el.className = 'on-marker marker';
              break;
            case 'PAUSE':
              el.className = 'pause-marker marker';
              break;
          }

          const coordinates = [last_location.longitude, last_location.latitude];
          new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(`${tracker.nom}`),
            )
            .addTo(map);
        }
      }
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    );

    map.addControl(
      new mapboxgl.FullscreenControl({
        container: document.querySelector('#map'),
      }),
    );

    map.addControl(new mapboxgl.NavigationControl(), 'top-left');
  }

  useEffect(() => {
    initialiseMap();
  }, []);

  return (
    <div>
      <button onClick={initialiseMap} className="btn btn-outline btn-primary">
        REFRESH
      </button>
      <div id="map" />
    </div>
  );
}
