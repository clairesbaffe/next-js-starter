import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Modal.module.css';
import Modal from 'react-modal';

type TrackerDeleteModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  handleModeChange: (tracker: any, mode: string, isPaused: boolean) => void;
  tracker: any;
};

export default function ModalActivateTracker({
  isOpen,
  onRequestClose,
  handleModeChange,
  tracker,
}: TrackerDeleteModalProps) {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const tracker_id = form.tracker_id.value;

    // CHECK TRACKER ID
    // LINK TRACKER

    handleModeChange(tracker, tracker.mode, false);

    onRequestClose();
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
        <h1>Activer le tracker</h1>
        <FontAwesomeIcon
          className="closeAddTrackerModal"
          onClick={onRequestClose}
          icon={faXmark}
        />

        <div className="componentContainer space-y-8">
          <form onSubmit={handleSubmit} className="formContainer space-y-6">
            <div className="displayRow space-x-4">
              <div className="inputGroup inputGroupLarge">
                <input
                  type="text"
                  name="tracker_id"
                  id="tracker_id"
                  required
                  autoComplete="off"
                />
                <label htmlFor="tracker_id">Id du tracker</label>
              </div>
            </div>

            <input
              type="submit"
              value="Enregistrer"
              className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
            />
          </form>
        </div>
      </div>
    </Modal>
  );
}
