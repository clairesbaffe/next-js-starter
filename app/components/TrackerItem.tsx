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

function renderModeDescription(
  mode: string,
  pause_tracking: boolean | undefined,
): string {
  switch (mode) {
    case 'INACTIF':
      return 'Tracker éteint';
    case 'FONCTIONNEL':
      return 'Tracker en marche';
    case 'PAUSE':
      return 'Tracker en pause';
    case 'TRACKING':
      if (pause_tracking) return 'Tracking en pause';
      return 'Tracking';
    default:
      return 'Unknown mode';
  }
}

async function handleModeChange(
  tracker: any,
  wanted_mode: string,
  change_to_specified_mode: boolean,
  event?: any,
) {
  let pause_duration;
  let hours;
  let minutes;
  let seconds;
  let deplacement;

  if (event) {
    event.preventDefault();
    const form = event.target;
    hours = form.pause_duration_h.value;
    minutes = form.pause_duration_m.value;
    seconds = form.pause_duration_s.value;
    pause_duration =
      parseInt(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 3600;
    deplacement = form.deplacement.checked;
  }

  let new_mode;
  if (change_to_specified_mode) {
    new_mode = wanted_mode;
  } else {
    switch (wanted_mode) {
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
    const submitData = {
      trackerId: tracker.id,
      duration: pause_duration,
      deplacement: deplacement,
    };
    await fetch('https://next-js-starter-lyart.vercel.app/api/pause-tracker', {
      method: 'PATCH',
      body: JSON.stringify(submitData),
      headers: {
        'content-type': 'application/json',
      },
    });
  } else if (new_mode === 'FONCTIONNEL' && tracker.mode === 'INACTIF') {
    await fetch(
      `https://next-js-starter-lyart.vercel.app/api/wake-tracker?trackerId=${tracker.id}&source=site`,
    );
  } else if (new_mode === 'INACTIF') {
    await fetch(
      `https://next-js-starter-lyart.vercel.app/api/shutdown-tracker?trackerId=${tracker.id}&source=site`,
    );
  } else {
    const submitData = {
      id: tracker.id,
      mode: new_mode,
    };
    await fetch(
      'https://next-js-starter-lyart.vercel.app/api/update-tracker-mode',
      {
        method: 'PATCH',
        body: JSON.stringify(submitData),
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  }

  window.location.reload();

  return new_mode;
}

async function togglePauseTracking(tracker: any, selectedOption: string) {
  if (selectedOption === 'pause') {
    await fetch(
      'https://next-js-starter-lyart.vercel.app/api/toggle-pause-tracking',
      {
        method: 'PATCH',
        body: JSON.stringify({ trackerId: tracker.id, start_pause: true }),
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  } else if (selectedOption === 'cancel') {
    await fetch(
      'https://next-js-starter-lyart.vercel.app/api/cancel-tracking',
      {
        method: 'PATCH',
        body: JSON.stringify({ trackerId: tracker.id }),
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  } else {
    await fetch(
      'https://next-js-starter-lyart.vercel.app/api/toggle-pause-tracking',
      {
        method: 'PATCH',
        body: JSON.stringify({ trackerId: tracker.id, start_pause: false }),
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  }

  window.location.reload();
}

async function handleTrackerDelete(tracker_id: number) {
  const submitData = {
    id: tracker_id,
  };
  await fetch(
    'https://next-js-starter-lyart.vercel.app/api/delete-tracker-by-id',
    {
      method: 'DELETE',
      body: JSON.stringify(submitData),
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  window.location.reload();
}

export default function TrackerItem({ tracker }: { tracker: any }) {
  const [modalDeleteTrackerIsOpen, setModalDeleteTrackerIsOpen] =
    useState(false);
  const [modalToggleTrackerPauseIsOpen, setModalToggleTrackerPauseIsOpen] =
    useState(false);
  const [pauseHours, setPauseHours] = useState(0);
  const [pauseMinutes, setPauseMinutes] = useState(0);
  const [pauseSeconds, setPauseSeconds] = useState(0);

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
  const handlePauseDurationChange = (setter: any) => (e: any) => {
    setter(e.target.value);
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
              handleModeChange(tracker, tracker.mode, false, event)
            }
            className="formContainer space-y-6"
          >
            <div>
              <input
                type="checkbox"
                name="deplacement"
                id="deplacement"
                defaultChecked={false}
              />
              <label htmlFor="deplacement">Déplacement ?</label>
            </div>
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
                  value={pauseHours}
                  onChange={handlePauseDurationChange(setPauseHours)}
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
                  value={pauseMinutes}
                  onChange={handlePauseDurationChange(setPauseMinutes)}
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
                  value={pauseSeconds}
                  onChange={handlePauseDurationChange(setPauseSeconds)}
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
        <p>{renderModeDescription(tracker.mode, tracker.pause_tracking)}</p>
        {tracker.mode === 'PAUSE' && (
          <p>
            Fin de la pause :{' '}
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
          {tracker.mode !== 'PAUSE' && tracker.mode !== 'TRACKING' && (
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
                {tracker.mode === 'INACTIF' && (
                  <button
                    className="tracker-menu-button"
                    onClick={() =>
                      handleModeChange(tracker, 'FONCTIONNEL', true)
                    }
                  >
                    <FontAwesomeIcon
                      icon={faPlay}
                      className="mini-tracker-mode-icon"
                      id="on-mode"
                    />
                    Mettre en marche
                  </button>
                )}
                {tracker.mode === 'FONCTIONNEL' && (
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
                )}
                {tracker.mode === 'FONCTIONNEL' && (
                  <button
                    className="tracker-menu-button"
                    onClick={() => handleModeChange(tracker, 'INACTIF', true)}
                  >
                    <FontAwesomeIcon
                      icon={faPowerOff}
                      className="mini-tracker-mode-icon"
                      id="off-mode"
                    />
                    Eteindre
                  </button>
                )}
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
          )}
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

        {tracker.mode === 'INACTIF' && (
          <div onClick={() => handleModeChange(tracker, tracker.mode, false)}>
            <FontAwesomeIcon
              icon={faPowerOff}
              className="tracker-mode-icon"
              id="off-mode"
            />
          </div>
        )}

        {tracker.mode === 'FONCTIONNEL' && (
          <div onClick={openModalToggleTrackerPause}>
            <FontAwesomeIcon
              icon={faPlay}
              className="tracker-mode-icon"
              id="on-mode"
            />
          </div>
        )}
        {tracker.mode === 'PAUSE' && (
          <div onClick={() => handleModeChange(tracker, tracker.mode, false)}>
            <FontAwesomeIcon
              icon={faPause}
              className="tracker-mode-icon"
              id="pause-mode"
            />
          </div>
        )}
        {tracker.mode === 'TRACKING' && !tracker.pause_tracking && (
          <div>
            <Popup
              trigger={
                <FontAwesomeIcon
                  icon={faCrosshairs}
                  className="tracker-mode-icon"
                  id="tracking-mode"
                />
              }
              position="bottom right"
              contentStyle={{ width: 'fit-content' }}
            >
              <div>
                <button
                  className="tracker-menu-button"
                  onClick={() => togglePauseTracking(tracker, 'pause')}
                >
                  <FontAwesomeIcon
                    icon={faPause}
                    className="mini-tracker-mode-icon"
                    id="pause-tracking-mode"
                  />
                  Mettre en pause le tracking
                </button>
                <button
                  className="tracker-menu-button"
                  onClick={() => togglePauseTracking(tracker, 'cancel')}
                >
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="mini-tracker-mode-icon"
                    id="on-mode"
                  />
                  Annuler le tracking
                </button>
              </div>
            </Popup>
          </div>
        )}
        {tracker.mode === 'TRACKING' && tracker.pause_tracking && (
          <div onClick={() => togglePauseTracking(tracker, 'end-pause')}>
            <FontAwesomeIcon
              icon={faCrosshairs}
              className="tracker-mode-icon"
              id="pause-tracking-mode"
            />
          </div>
        )}
      </div>
    </div>
  );
}
