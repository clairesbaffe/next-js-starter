import styles from './Modal.module.css';
import Modal from 'react-modal';

type TrackerDeleteModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  trackerId: number;
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

  window.location.reload();
}

export default function ModalDeleteTracker({
  isOpen,
  onRequestClose,
  trackerId,
}: TrackerDeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className={styles.modalContainer}
      overlayClassName={styles.modalOverlay}
    >
      <p>Supprimer le tracker ?</p>
      <button onClick={onRequestClose}>Non</button>
      <button
        onClick={() => {
          handleTrackerDelete(trackerId);
        }}
      >
        Oui
      </button>
    </Modal>
  );
}
