import './style.css';
import TrackerForm from '../components/TrackerForm';
import TrackersList from '../components/TrackersList';
import { revalidateTag } from 'next/cache';

async function fetchTrackers() {
  const response = await fetch(
    `http://localhost:3000/api/get-trackers-by-rucher-id?rucher_id=1,2`,
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

      <TrackersList initialTrackers={trackers} />

      <TrackerForm />
    </div>
  );
}
