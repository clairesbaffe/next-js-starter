'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faCrosshairs,
  faPause,
  faPowerOff,
  faPlay,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import styles from './Modal.module.css';

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

async function handleModeChange(
  current_mode: string,
  tracker_id: number,
  change_to_specified_mode: boolean,
) {
  let new_mode;
  if (change_to_specified_mode) {
    new_mode = current_mode;
  } else {
    switch (current_mode) {
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
  }

  await fetch(
    `https://next-js-starter-lyart.vercel.app/api/update-tracker?id=${tracker_id}&mode=${new_mode}`,
  );

  window.location.reload();

  return new_mode;
}

async function handleTrackerDelete(tracker_id: number) {
  await fetch(
    `https://next-js-starter-lyart.vercel.app/api/delete-tracker-by-id?id=${tracker_id}&reset=true`,
  );

  window.location.reload();
}

export default function TrackerItem({ tracker }: { tracker: any }) {
  const [trackerMode, setTrackerMode] = useState(tracker.mode);
  const [modalDeleteTrackerIsOpen, setModalDeleteTrackerIsOpen] =
    useState(false);

  const openModalDeleteTracker = () => {
    setModalDeleteTrackerIsOpen(true);
  };
  const closeModalDeleteTracker = () => {
    setModalDeleteTrackerIsOpen(false);
  };

  return (
    <div className="tracker-container">
      <div className="left-side">
        <h1>{tracker.nom}</h1>
        <p>{renderModeDescription(trackerMode)}</p>
        <p>Ruche : {tracker.ruche.nom}</p>
        <p>ID : {tracker.id}</p>
      </div>
      <div className="right-side">
        <div>
          <Popup
            trigger={
              <FontAwesomeIcon
                className="tracker-menu-icon"
                icon={faEllipsis}
              />
            }
            position="bottom right"
            contentStyle={{ width: 'fit-content' }}
          >
            <div>
              <button
                className="tracker-menu-button"
                onClick={() =>
                  setTrackerMode(
                    handleModeChange('FONCTIONNEL', tracker.id, true),
                  )
                }
              >
                <FontAwesomeIcon
                  icon={faPlay}
                  className="mini-tracker-mode-icon"
                  id="on-mode"
                />
                Mettre en marche
              </button>
              <button
                className="tracker-menu-button"
                onClick={() =>
                  setTrackerMode(handleModeChange('PAUSE', tracker.id, true))
                }
              >
                <FontAwesomeIcon
                  icon={faPause}
                  className="mini-tracker-mode-icon"
                  id="pause-mode"
                />
                Mettre en pause
              </button>
              <button
                className="tracker-menu-button"
                onClick={() =>
                  setTrackerMode(handleModeChange('INACTIF', tracker.id, true))
                }
              >
                <FontAwesomeIcon
                  icon={faPowerOff}
                  className="mini-tracker-mode-icon"
                  id="off-mode"
                />
                Eteindre
              </button>
              <hr />
              <button
                className="tracker-menu-button"
                onClick={openModalDeleteTracker}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="mini-tracker-mode-icon"
                  id="tracking-mode"
                />
                Supprimer le tracker
              </button>
            </div>
          </Popup>
        </div>

        <Modal
          isOpen={modalDeleteTrackerIsOpen}
          onRequestClose={closeModalDeleteTracker}
          contentLabel="Example Modal"
          ariaHideApp={false}
          className={styles.modalContainer}
          overlayClassName={styles.modalOverlay}
        >
          <p>Supprimer le tracker ?</p>
          <button onClick={closeModalDeleteTracker}>Non</button>
          <button
            onClick={() => {
              handleTrackerDelete(tracker.id);
            }}
          >
            Oui
          </button>
        </Modal>

        {trackerMode === 'INACTIF' && (
          <div
            onClick={() =>
              setTrackerMode(handleModeChange(trackerMode, tracker.id, false))
            }
          >
            <FontAwesomeIcon
              icon={faPowerOff}
              className="tracker-mode-icon"
              id="off-mode"
            />
          </div>
        )}

        {trackerMode === 'FONCTIONNEL' && (
          <div
            onClick={() =>
              setTrackerMode(handleModeChange(trackerMode, tracker.id, false))
            }
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="tracker-mode-icon"
              id="on-mode"
            />
          </div>
        )}
        {trackerMode === 'PAUSE' && (
          <div
            onClick={() =>
              setTrackerMode(handleModeChange(trackerMode, tracker.id, false))
            }
          >
            <FontAwesomeIcon
              icon={faPause}
              className="tracker-mode-icon"
              id="pause-mode"
            />
          </div>
        )}
        {trackerMode === 'TRACKING' && (
          <div
            onClick={() =>
              setTrackerMode(handleModeChange(trackerMode, tracker.id, false))
            }
          >
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
