import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Modal from 'react-modal';
import styles from './Modal.module.css';
import { useState } from 'react';

type TrackerPauseModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  handleModeChange: (
    tracker: any,
    mode: string,
    isPaused: boolean,
    event: React.FormEvent<HTMLFormElement>,
  ) => void;
  tracker: any;
};

export default function ModalToggleTrackerPause({
  isOpen,
  onRequestClose,
  handleModeChange,
  tracker,
}: TrackerPauseModalProps) {
  const [pauseHours, setPauseHours] = useState(0);
  const [pauseMinutes, setPauseMinutes] = useState(0);
  const [pauseSeconds, setPauseSeconds] = useState(0);

  const handlePauseDurationChange = (setter: any) => (e: any) => {
    setter(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleModeChange(tracker, tracker.mode, false, event);
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className={styles.modalContainer}
      overlayClassName={styles.modalOverlay}
    >
      <div className="componentContainer space-y-8">
        <h1>Temps de pause</h1>
        <FontAwesomeIcon
          className="closeAddTrackerModal"
          onClick={onRequestClose}
          icon={faXmark}
        />
        <form onSubmit={handleSubmit} className="formContainer space-y-6">
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
  );
}
