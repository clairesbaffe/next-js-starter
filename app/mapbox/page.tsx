'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';
import { useEffect } from 'react';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;

export default function Page() {
  let geojson: any = [];

  async function fetchLocations() {
    const response = await fetch('http://localhost:3000/api/get-locations');
    const data = await response.json();

    return data;
  }

  async function initialiseMap() {
    console.log('Initialising...');
    await fetchLocations().then((response) => {
      geojson = response.locations;
    });
    loadMap();
  }

  async function loadMap() {
    console.log('Loading map...');

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.57918, 44.837789],
      zoom: 11.5,
    });

    geojson.forEach((location: any, index: Number) => {
      const el = document.createElement('div');
      if (index == geojson.length - 1) el.className = 'last-marker';
      else el.className = 'previous-marker';

      const coordinates = [location.longitude, location.latitude];

      new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        // .setPopup(
        //   new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>Hello World</p>`),
        // )
        .addTo(map);
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
      {/* <button onClick={initialiseMap} className="btn btn-outline btn-primary">
        REFRESH
      </button> */}
      <div id="map" />
    </div>
  );
}
