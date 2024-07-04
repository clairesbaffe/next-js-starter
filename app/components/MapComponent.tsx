'use client';

import { useEffect, useState } from 'react';
import { TrackersListProps } from './types';
import 'mapbox-gl/dist/mapbox-gl.css';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;

function MapComponent({ initialTrackers }: TrackersListProps) {
  const [geojson, setGeojson] = useState(initialTrackers);

  async function loadMap() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.57918, 44.837789],
      zoom: 11,
    });

    geojson.forEach((tracker: any) => {
      if (tracker.historiques.length > 0) {
        if (tracker.mode === 'TRACKING') {
          // FILTRER UNIQUEMENT LES LOCALISATIONS ENREGISTREES PENDANT LE MODE TRACKING
          const dateModification = new Date(tracker.date_modification);
          const locations = tracker.historiques.filter((location: any) => {
            return new Date(location.date_ajout) > dateModification;
          });
          if (locations.length === 0) {
            locations.push(tracker.historiques.pop());
          }

          locations.forEach((location: any, index: Number) => {
            const el = document.createElement('div');
            if (index == locations.length - 1) el.className = 'last-marker';
            else el.className = 'previous-marker marker';
            const coordinates = [location.longitude, location.latitude];
            new mapboxgl.Marker(el)
              .setLngLat(coordinates)
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(`
                      <h1>${tracker.nom}, ${tracker.ruche.nom}</h1>
                      <p>${tracker.mode}</p>
                      <p>${new Date(location.date_ajout).toLocaleTimeString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    `),
              )
              .addTo(map);
          });
        } else {
          const last_location = tracker.historiques.pop();
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
          if (tracker.mode === 'PAUSE') {
            new mapboxgl.Marker(el)
              .setLngLat(coordinates)
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(`
                      <h1>${tracker.nom}</h1>
                      <p>${tracker.mode}</p>
                      <p>Fin de la pause : ${new Date(
                        tracker.pause_end_time,
                      ).toLocaleTimeString('fr-FR', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      })}</p>
                      `),
              )
              .addTo(map);
          } else {
            new mapboxgl.Marker(el)
              .setLngLat(coordinates)
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(`
                      <h1>${tracker.nom}</h1>
                      <p>${tracker.mode}</p>
                      `),
              )
              .addTo(map);
          }
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
    loadMap();
  }, []);

  return <div id="map" />;
}

export default MapComponent;
