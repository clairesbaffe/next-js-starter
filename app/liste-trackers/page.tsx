import Link from 'next/link';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faCrosshairs,
  faPause,
  faPowerOff,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

async function fetchTrackers() {
  const response = await fetch(
    'http://localhost:3000/api/get-trackers-by-rucher-id?rucher_id=1',
  );
  const data = await response.json();
  return data;
}
async function fetchRucher(rucher_id: Number) {
  const response = await fetch(
    `http://localhost:3000/api/get-rucher-by-id?rucher_id=${rucher_id}`,
  );
  const data = await response.json();
  return data;
}

function renderModeDescription(mode: string): string {
  switch (mode) {
    case 'INACTIF':
      return 'Tracker éteint';
    case 'FONCTIONNEL':
      return 'Tracker en marche';
    case 'PAUSE':
      return 'Tracker en pause';
    case 'TRACKING':
      return 'Tracking';
    default:
      return 'Unknown mode';
  }
}

export default async function Page() {
  const trackers = await fetchTrackers();
  const trackersWithRucher = await Promise.all(
    trackers.trackers.map(async (tracker: any) => {
      const rucher = await fetchRucher(tracker.rucher_id);
      return { ...tracker, rucher };
    }),
  );
  console.log(JSON.stringify(trackersWithRucher, null, 2));

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Trackers</h1>

      <div className="trackers-list">
        {trackersWithRucher.map((tracker: any) => {
          return (
            <div className="tracker-container">
              <div className="left-side">
                <h1>{tracker.nom}</h1>
                <p>{renderModeDescription(tracker.mode)}</p>
                <p>Rucher : {tracker.rucher.rucher.nom}</p>
                <p>ID : {tracker.id}</p>
              </div>
              <div className="right-side">
                <FontAwesomeIcon
                  className="tracker-menu-icon"
                  icon={faEllipsis}
                />

                {tracker.mode === 'INACTIF' && (
                  // <Link
                  //   href={`/"http://localhost:3000/api/update-tracker?id=1&mode=FONCTIONNEL"`}
                  // >
                  //   <div>
                  <FontAwesomeIcon
                    icon={faPowerOff}
                    className="tracker-mode-icon"
                    id="off-mode"
                  />
                  //   </div>
                  // </Link>
                )}

                {tracker.mode === 'FONCTIONNEL' && (
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="tracker-mode-icon"
                    id="on-mode"
                  />
                )}
                {tracker.mode === 'PAUSE' && (
                  <FontAwesomeIcon
                    icon={faPause}
                    className="tracker-mode-icon"
                    id="pause-mode"
                  />
                )}
                {tracker.mode === 'TRACKING' && (
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    className="tracker-mode-icon"
                    id="tracking-mode"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
