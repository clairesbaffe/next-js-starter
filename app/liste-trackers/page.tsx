import './style.css';
import TrackerItem from '../components/TrackerItem';
import { revalidateTag } from 'next/cache';

async function fetchTrackers() {
  const response = await fetch(
    `https://next-js-starter-lyart.vercel.app/api/get-trackers-by-rucher-id?rucher_id=1`,
  );
  const data = await response.json();
  return data.trackers;
}

export default async function Page() {
  revalidateTag('Tracker');
  const trackers = await fetchTrackers();

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Trackers</h1>

      <div className="trackers-list">
        {trackers.map((tracker: any) => (
          <TrackerItem key={tracker.id} tracker={tracker} />
        ))}
      </div>
    </div>
  );
}
