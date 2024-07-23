'use client';

import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faCrosshairs,
  faPause,
  faPowerOff,
  faPlay,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import ModalDeleteTracker from './ModalDeleteTrackerComponent';
import ModalToggleTrackerPause from './ModalToggleTrackerPauseComponent';

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

export default function TrackerItem({ tracker }: { tracker: any }) {
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
      <ModalToggleTrackerPause
        isOpen={modalToggleTrackerPauseIsOpen}
        onRequestClose={closeModalToggleTrackerPause}
        handleModeChange={handleModeChange}
        tracker={tracker}
      />

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

        <ModalDeleteTracker
          isOpen={modalDeleteTrackerIsOpen}
          onRequestClose={closeModalDeleteTracker}
          trackerId={tracker.id}
        />

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
          <div>
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
