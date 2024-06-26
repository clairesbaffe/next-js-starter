// pages/Page.tsx
import './style.css';
import TrackerItem from '../components/TrackerItem'; // Importez le composant client

async function fetchTrackers() {
  const response = await fetch(
    'https://next-js-starter-lyart.vercel.app/api/api/get-trackers-by-rucher-id?rucher_id=1',
  );
  const data = await response.json();
  return data;
}

async function fetchRucher(rucher_id: Number) {
  const response = await fetch(
    `https://next-js-starter-lyart.vercel.app/api/api/get-rucher-by-id?rucher_id=${rucher_id}`,
  );
  const data = await response.json();
  return data;
}

export default async function Page() {
  const trackers = await fetchTrackers();
  const trackersWithRucher = await Promise.all(
    trackers.trackers.map(async (tracker: any) => {
      const rucher = await fetchRucher(tracker.rucher_id);
      return { ...tracker, rucher };
    }),
  );
  // console.log(JSON.stringify(trackersWithRucher, null, 2));

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Trackers</h1>

      <div className="trackers-list">
        {trackersWithRucher.map((tracker: any) => (
          <TrackerItem key={tracker.id} tracker={tracker} />
        ))}
      </div>
    </div>
  );
}
