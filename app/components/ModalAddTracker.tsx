'use client';

import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

import { RuchesListProps } from './types';
import './TrackerFormComponent.css';

async function addTracker(nom: string, selectedBalance: number) {
  const submitData = {
    nom: nom,
    ruche_id: selectedBalance,
  };
  await fetch('http://localhost:3000/api/add-tracker', {
    method: 'POST',
    body: JSON.stringify(submitData),
    headers: {
      'content-type': 'application/json',
    },
  });
}

const TrackerForm = ({ balances }: RuchesListProps) => {
  const [modalNewTracker, setModalNewTracker] = useState(false);
  const [selectedBalance, setSelectedBalance] = useState(balances[0].id);

  const openModalNewTracker = () => {
    setModalNewTracker(true);
  };
  const closeModalNewTracker = () => {
    setModalNewTracker(false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const nom = form.nom.value;

    await addTracker(nom, selectedBalance);

    window.location.reload();
  };

  function handleBalanceSelectChange(event: any) {
    setSelectedBalance(event.target.value);
  }

  return (
    <div>
      <button onClick={openModalNewTracker} className="addTrackerButton">
        <FontAwesomeIcon icon={faPlus} />
        Nouveau tracker
      </button>

      <Modal
        isOpen={modalNewTracker}
        onRequestClose={closeModalNewTracker}
        ariaHideApp={false}
        className={styles.modalContainer}
        overlayClassName={styles.modalOverlay}
      >
        <div className="componentContainer space-y-8">
          <h1>Nouveau tracker</h1>
          <FontAwesomeIcon
            className="closeAddTrackerModal"
            onClick={closeModalNewTracker}
            icon={faXmark}
          />
          <form onSubmit={handleSubmit} className="formContainer space-y-6">
            <div className="displayRow space-x-4">
              <div className="inputGroup inputGroupLarge">
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  required
                  autoComplete="off"
                />
                <label htmlFor="nom" className="formLabel">
                  Nom du tracker
                </label>
              </div>
            </div>
            <select
              defaultValue={selectedBalance}
              required
              onChange={handleBalanceSelectChange}
              className="inputGroup inputGroupLarge"
            >
              {balances.map((balance, index) => (
                <option key={index} value={balance.id}>
                  {balance.nom}
                </option>
              ))}
            </select>

            <input
              type="submit"
              value="Enregistrer"
              className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TrackerForm;
