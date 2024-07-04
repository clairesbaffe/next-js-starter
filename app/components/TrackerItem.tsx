'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faCrosshairs,
  faPause,
  faPowerOff,
  faPlay,
  faTrash,
  faXmark,
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
  event?: any,
) {
  let pause_duration;
  let hours;
  let minutes;
  let seconds;

  if (event) {
    event.preventDefault();
    const form = event.target;
    hours = form.pause_duration_h.value;
    minutes = form.pause_duration_m.value;
    seconds = form.pause_duration_s.value;
    pause_duration =
      parseInt(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 3600;
  }

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

  if (new_mode === 'PAUSE' && pause_duration) {
    await fetch(
      `https://next-js-starter-lyart.vercel.app/api/update-tracker-mode?id=${tracker_id}&mode=${new_mode}&pause_duration=${pause_duration}`,
    );
  } else {
    await fetch(
      `https://next-js-starter-lyart.vercel.app/api/update-tracker-mode?id=${tracker_id}&mode=${new_mode}`,
    );
  }

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
  const [modalToggleTrackerPauseIsOpen, setModalToggleTrackerPauseIsOpen] =
    useState(false);

  const openModalDeleteTracker = () => {
    setModalDeleteTrackerIsOpen(true);
  };
  const closeModalDeleteTracker = () => {
    setModalDeleteTrackerIsOpen(false);
  };

  const openModalToggleTrackerPause = () => {
    setModalToggleTrackerPauseIsOpen(true);
  };
  const closeModalToggleTrackerPause = () => {
    setModalToggleTrackerPauseIsOpen(false);
  };

  return (
    <div className="tracker-container">
      <Modal
        isOpen={modalToggleTrackerPauseIsOpen}
        onRequestClose={closeModalToggleTrackerPause}
        ariaHideApp={false}
        className={styles.modalContainer}
        overlayClassName={styles.modalOverlay}
      >
        <div className="componentContainer space-y-8">
          <h1>Temps de pause</h1>
          <FontAwesomeIcon
            className="closeAddTrackerModal"
            onClick={closeModalToggleTrackerPause}
            icon={faXmark}
          />
          <form
            onSubmit={(event) =>
              handleModeChange(tracker.mode, tracker.id, false, event)
            }
            className="formContainer space-y-6"
          >
            <div className="displayRow">
              <div className="displayColumn">
                <label htmlFor="pause_duration_h">heures</label>
                <input
                  className="input-style"
                  type="number"
                  name="pause_duration_h"
                  id="pause_duration_h"
                  required
                  min={0}
                  max={59}
                  defaultValue={0}
                />
              </div>

              <span> : </span>
              <div className="displayColumn">
                <label htmlFor="pause_duration_m">minutes</label>
                <input
                  className="input-style"
                  type="number"
                  name="pause_duration_m"
                  id="pause_duration_m"
                  required
                  min={0}
                  max={59}
                  defaultValue={0}
                />
              </div>

              <span> : </span>

              <div className="displayColumn">
                <label htmlFor="pause_duration_s">secondes</label>
                <input
                  className="input-style"
                  type="number"
                  name="pause_duration_s"
                  id="pause_duration_s"
                  required
                  min={0}
                  max={59}
                  defaultValue={0}
                />
              </div>
            </div>

            <input
              type="submit"
              value="Enregistrer"
              className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
            />
          </form>
        </div>
      </Modal>

      <div className="left-side">
        <h1>{tracker.nom}</h1>
        <p>{renderModeDescription(trackerMode)}</p>
        {tracker.mode === 'PAUSE' && (
          <p>
            Fin de la pause :
            {new Date(tracker.pause_end_time).toLocaleTimeString('fr-FR', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </p>
        )}
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
                onClick={openModalToggleTrackerPause}
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
          <div onClick={openModalToggleTrackerPause}>
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
