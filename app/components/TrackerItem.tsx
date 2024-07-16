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
  current_mode: string,
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

async function handleStartPauseTracking(
  tracker: any,
  selectedOption: string,
  event?: any,
) {
  let pause_duration;
  let hours;
  let minutes;
  let seconds;
  let pause;

  if (event) {
    event.preventDefault();
    const form = event.target;
    if (selectedOption === 'pause') {
      hours = form.pause_duration_h.value;
      minutes = form.pause_duration_m.value;
      seconds = form.pause_duration_s.value;
      pause_duration =
        parseInt(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 3600;
    }
  }

  if (selectedOption === 'pause') {
    const submitData = {
      trackerId: tracker.id,
      duration: pause_duration,
    };
    await fetch('https://next-js-starter-lyart.vercel.app/api/pause-tracking', {
      method: 'PATCH',
      body: JSON.stringify(submitData),
      headers: {
        'content-type': 'application/json',
      },
    });
  } else {
    const submitData = {
      trackerId: tracker.id,
    };
    await fetch(
      'https://next-js-starter-lyart.vercel.app/api/cancel-tracking',
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
  const [trackerMode, setTrackerMode] = useState(tracker.mode);
  const [modalDeleteTrackerIsOpen, setModalDeleteTrackerIsOpen] =
    useState(false);
  const [modalToggleTrackerPauseIsOpen, setModalToggleTrackerPauseIsOpen] =
    useState(false);
  const [modalToggleTrackingPauseIsOpen, setModalToggleTrackingPauseIsOpen] =
    useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [pauseDuration, setPauseDuration] = useState('');
  const [pauseHours, setPauseHours] = useState(0);
  const [pauseMinutes, setPauseMinutes] = useState(0);
  const [pauseSeconds, setPauseSeconds] = useState(44);

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

  const openModalToggleTrackingPause = () => {
    setModalToggleTrackingPauseIsOpen(true);
  };
  const closeModalToggleTrackingPause = () => {
    setModalToggleTrackingPauseIsOpen(false);
  };

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
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

      <Modal
        isOpen={modalToggleTrackingPauseIsOpen}
        onRequestClose={closeModalToggleTrackingPause}
        ariaHideApp={false}
        className={styles.modalContainer}
        overlayClassName={styles.modalOverlay}
      >
        <div className="componentContainer space-y-8">
          <h1>Mettre en pause ou annuler le tracking ?</h1>
          <FontAwesomeIcon
            className="closeAddTrackerModal"
            onClick={closeModalToggleTrackingPause}
            icon={faXmark}
          />
          <form
            onSubmit={(event) =>
              handleStartPauseTracking(tracker, selectedOption, event)
            }
            className="formContainer space-y-6"
          >
            <div>
              <label>
                <input
                  type="radio"
                  value="pause"
                  checked={selectedOption === 'pause'}
                  onChange={handleOptionChange}
                />
                Mettre en pause
              </label>
              <label>
                <input
                  type="radio"
                  value="cancel"
                  checked={selectedOption === 'cancel'}
                  onChange={handleOptionChange}
                />
                Annuler
              </label>
            </div>

            {selectedOption === 'pause' && (
              <div>
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
              </div>
            )}
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
        <p>{renderModeDescription(trackerMode, tracker.pause_tracking)}</p>
        {(tracker.mode === 'PAUSE' ||
          (tracker.mode === 'TRACKING' && tracker.pause_tracking)) && (
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
                  setTrackerMode(handleModeChange(tracker, 'FONCTIONNEL', true))
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
                  setTrackerMode(handleModeChange(tracker, 'INACTIF', true))
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
              setTrackerMode(handleModeChange(tracker, trackerMode, false))
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
              setTrackerMode(handleModeChange(tracker, trackerMode, false))
            }
          >
            <FontAwesomeIcon
              icon={faPause}
              className="tracker-mode-icon"
              id="pause-mode"
            />
          </div>
        )}
        {trackerMode === 'TRACKING' && !tracker.pause_tracking && (
          <div onClick={openModalToggleTrackingPause}>
            <FontAwesomeIcon
              icon={faCrosshairs}
              className="tracker-mode-icon"
              id="tracking-mode"
            />
          </div>
        )}
        {trackerMode === 'TRACKING' && tracker.pause_tracking && (
          <div
          // onClick={() =>
          //   setTrackerMode(handleModeChange(tracker, trackerMode, false))
          // }
          >
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
