'use client';

import { useEffect, useState } from 'react';
import { TrackersListProps } from './types';
import 'mapbox-gl/dist/mapbox-gl.css';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

type ExtendedTrackersListProps = TrackersListProps & {
  rucher_filter: string[];
  mode_filter: string;
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;

let map: any;

function getMarkerClass(tracker: any, isLast: Boolean) {
  switch (tracker.mode) {
    case 'TRACKING':
      return isLast
        ? tracker.pause_tracking
          ? `last-marker-pause marker ${tracker.mode}-${tracker.ruche.rucher.nom}`
          : `last-marker marker ${tracker.mode}-${tracker.ruche.rucher.nom}`
        : `previous-marker marker ${tracker.mode}-${tracker.ruche.rucher.nom}`;
    case 'INACTIF':
      return `off-marker marker ${tracker.mode}-${tracker.ruche.rucher.nom}`;
    case 'FONCTIONNEL':
      return `on-marker marker ${tracker.mode}-${tracker.ruche.rucher.nom}`;
    case 'PAUSE':
      return `pause-marker marker ${tracker.mode}-${tracker.ruche.rucher.nom}`;
    default:
      return '';
  }
}

function createPopupHTML(tracker: any, location: any) {
  return `
    <h1>${tracker.nom}, ${tracker.ruche.nom}</h1>
    <p>${tracker.mode} ${tracker.pause_tracking ? 'en pause' : ''}</p>
    ${tracker.pause_end_time ? `<p>Fin de la pause : ${new Date(tracker.pause_end_time).toLocaleTimeString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' })}</p>` : ''}
    ${location ? `<p>${new Date(location.date_ajout).toLocaleTimeString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>` : ''}
  `;
}

function createAndAddMarker(
  coordinates: any,
  className: string,
  popupHTML: string,
) {
  const el = document.createElement('div');
  el.className = className;
  new mapboxgl.Marker(el)
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML))
    .addTo(map);
}

function addControls() {
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

function addMarkers(geojson: any) {
  geojson.forEach((tracker: any) => {
    if (tracker.historiques.length > 0) {
      if (tracker.mode === 'TRACKING') {
        // FILTRER UNIQUEMENT LES LOCALISATIONS ENREGISTREES PENDANT LE MODE TRACKING
        const locations = tracker.historiques.filter((location: any) => {
          return (
            new Date(location.date_ajout) > new Date(tracker.date_modif_mode)
          );
        });
        if (locations.length === 0) locations.push(tracker.historiques.pop());

        locations.forEach((location: any, index: Number) => {
          const isLast = index === locations.length - 1;

          createAndAddMarker(
            [location.longitude, location.latitude],
            getMarkerClass(tracker, isLast),
            createPopupHTML(tracker, location),
          );
        });
      } else {
        const last_location = tracker.historiques.pop();

        createAndAddMarker(
          [last_location.longitude, last_location.latitude],
          getMarkerClass(tracker, true),
          createPopupHTML(tracker, last_location),
        );
      }
    }
  });
}

function MapComponent({
  initialTrackers,
  rucher_filter,
  mode_filter,
}: ExtendedTrackersListProps) {
  const [geojson, setGeojson] = useState(initialTrackers);

  document.querySelectorAll('.marker').forEach((element) => {
    const className = element.className;
    let shouldDisplay = false;

    // SI PAS DE FILTRES CHOISIS
    if (rucher_filter.length === 0 && mode_filter === '') shouldDisplay = true;

    // FILTRER PAR MODE
    const regexMode = new RegExp(`${mode_filter}-\\b`); // si pas de mode choisi, true par défaut
    if (regexMode.test(className)) {
      // FILTRER PAR RUCHER
      if (rucher_filter.length > 0) {
        rucher_filter.forEach((rucher_name) => {
          const regexRucher = new RegExp(`-${rucher_name}\\b`);
          if (regexRucher.test(className)) {
            shouldDisplay = true;
          }
        });
      } else {
        shouldDisplay = true;
      }
    }

    (element as HTMLElement).style.display = shouldDisplay ? 'block' : 'none';
  });

  async function loadMap() {
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.57918, 44.837789],
      zoom: 11,
    });

    addMarkers(geojson);

    addControls();
  }

  useEffect(() => {
    loadMap();
  }, []);

  return <div id="map" />;
}

export default MapComponent;
