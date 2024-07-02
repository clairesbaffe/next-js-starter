import './style.css';

import CombinedPages from './CombinedPages';

export default async function Page() {
  const locations = await fetchLocationsByRucher([1, 2]);
  let trackers = locations.trackers;

  async function fetchLocationsByRucher(rucher_id: number[]) {
    const response = await fetch(
      `http://localhost:3000/api/get-trackers-by-rucher-id-with-locations?rucher_id=${rucher_id.join()}`,
    );
    const data = await response.json();

    return data;
  }

  return <CombinedPages initialTrackers={trackers} />;
}
