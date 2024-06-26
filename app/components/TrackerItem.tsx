// components/TrackerItem.tsx
'use client'; // Indique que ce composant est un composant client

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faCrosshairs,
  faPause,
  faPowerOff,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

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

async function handleModeChange(mode: string, tracker_id: number) {
  console.log('Changing mode...');
  let new_mode;
  switch (mode) {
    case 'INACTIF':
      new_mode = 'FONCTIONNEL';
      break;
    case 'FONCTIONNEL':
      new_mode = 'PAUSE';
      break;
    case 'PAUSE':
      new_mode = 'FONCTIONNEL';
      break;
    case 'TRACKING':
      new_mode = 'FONCTIONNEL';
      break;
  }
  await fetch(
    `https://next-js-starter-lyart.vercel.app/api/update-tracker?id=${tracker_id}&mode=${new_mode}`,
  );
}

export default function TrackerItem({ tracker }: { tracker: any }) {
  return (
    <div className="tracker-container">
      <div className="left-side">
        <h1>{tracker.nom}</h1>
        <p>{renderModeDescription(tracker.mode)}</p>
        <p>Rucher : {tracker.rucher.rucher.nom}</p>
        <p>ID : {tracker.id}</p>
      </div>
      <div className="right-side">
        <FontAwesomeIcon className="tracker-menu-icon" icon={faEllipsis} />

        {tracker.mode === 'INACTIF' && (
          <div onClick={() => handleModeChange(tracker.mode, tracker.id)}>
            <FontAwesomeIcon
              icon={faPowerOff}
              className="tracker-mode-icon"
              id="off-mode"
            />
          </div>
        )}

        {tracker.mode === 'FONCTIONNEL' && (
          <div onClick={() => handleModeChange(tracker.mode, tracker.id)}>
            <FontAwesomeIcon
              icon={faPlay}
              className="tracker-mode-icon"
              id="on-mode"
            />
          </div>
        )}
        {tracker.mode === 'PAUSE' && (
          <div onClick={() => handleModeChange(tracker.mode, tracker.id)}>
            <FontAwesomeIcon
              icon={faPause}
              className="tracker-mode-icon"
              id="pause-mode"
            />
          </div>
        )}
        {tracker.mode === 'TRACKING' && (
          <div onClick={() => handleModeChange(tracker.mode, tracker.id)}>
            <FontAwesomeIcon
              icon={faCrosshairs}
              className="tracker-mode-icon"
              id="tracking-mode"
            />
          </div>
        )}
      </div>
    </div>
  );
}
