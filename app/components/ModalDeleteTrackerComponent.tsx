import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Modal.module.css';
import Modal from 'react-modal';

type TrackerDeleteModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  tracker: any;
  setTrackers: React.Dispatch<React.SetStateAction<any[]>>;
  trackers: any[];
};

export default function ModalDeleteTracker({
  isOpen,
  onRequestClose,
  tracker,
  setTrackers,
  trackers,
}: TrackerDeleteModalProps) {
  const deleteTracker = (id: number) => {
    const updatedTrackers = trackers.filter((tr) => tr.id !== id);
    setTrackers(updatedTrackers);
  };

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

    deleteTracker(tracker.id);

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className={styles.modalContainer}
      overlayClassName={styles.modalOverlay}
    >
      <div className="componentContainer space-y-6">
        <h1>Supprimer le tracker ?</h1>
        <FontAwesomeIcon
          className="closeAddTrackerModal"
          onClick={onRequestClose}
          icon={faXmark}
        />

        <div className="deleteTrackerChoice">
          <button onClick={onRequestClose}>Non</button>
          <button
            onClick={() => {
              handleTrackerDelete(tracker.id);
            }}
          >
            Oui
          </button>
        </div>
      </div>
    </Modal>
  );
}
