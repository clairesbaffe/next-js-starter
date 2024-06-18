'use client';

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = process.env.MAPBOX_KEY;
const map = new mapboxgl.Map({
  container: 'my-map',
  style: 'mapbox://styles/mapbox/streets-v11',
});

export default async function Page() {
  const [pageIsMounted, setPageIsMounted] = useState(false);

  useEffect(() => {
    setPageIsMounted(true);
    const map = new mapboxgl.Map({
      container: 'my-map',
      style: 'mapbox://styles/mapbox/streets-v11',
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <div id="my-map" style={{ height: 500, width: 500 }} />
      </main>
    </div>
  );
}
