import './style.css';

import MapComponent from '../components/MapComponent';

export default async function Page() {
  const locations = await fetchLocationsByRucher(1);
  let geojson = locations;

  async function fetchLocationsByRucher(rucher_id: number) {
    const response = await fetch(
      `https://next-js-starter-lyart.vercel.app/api/get-trackers-by-rucher-id-with-locations?rucher_id=${rucher_id}`,
    );
    const data = await response.json();

    return data;
  }

  // async function initialiseMap() {
  //   const locations = await fetchLocationsByRucher(1);
  //   geojson = locations.trackers;
  // }

  return (
    <div>
      {/* <button onClick={initialiseMap} className="btn btn-outline btn-primary">
        REFRESH
      </button> */}
      <MapComponent initialTrackers={geojson} />
    </div>
  );
}
