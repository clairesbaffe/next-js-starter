import './style.css';

import CombinedPages from './CombinedPages';
import { revalidateTag } from 'next/cache';

export default async function Page() {
  revalidateTag('Tracker');
  const locations = await fetchLocationsByRucher([1, 2]);
  let trackers = locations;
  const balances = await fetchRuchesByRucher([1, 2]);
  let ruches = balances;

  async function fetchLocationsByRucher(rucher_id: number[]) {
    const response = await fetch(
      `https://next-js-starter-lyart.vercel.app/api/get-trackers-by-rucher-id-with-locations?rucher_id=${rucher_id.join()}`,
    );
    const data = await response.json();

    return data;
  }

  async function fetchRuchesByRucher(rucher_id: number[]) {
    const response = await fetch(
      `https://next-js-starter-lyart.vercel.app/api/get-ruches-by-rucher-id?rucher_id=${rucher_id.join()}`,
    );
    const data = await response.json();

    return data;
  }

  return <CombinedPages initialTrackers={trackers} balances={ruches} />;
}
