'use client';

import Head from 'next/head';
// import styles from '../styles/Page.module.css';
import { useEffect, useState } from 'react';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export default function Page() {
  const [pageIsMounted, setPageIsMounted] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;
    setPageIsMounted(true);
    const map = new mapboxgl.Map({
      container: 'my-map',
      style: 'mapbox://styles/mapbox/streets-v11',
    });
  }, []);

  return (
    <div>
      {/* className={styles.container} */}
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>

      <main>
        {/* className={styles.main} */}
        <div id="my-map" style={{ height: 500, width: 500 }} />
      </main>
    </div>
  );
}
