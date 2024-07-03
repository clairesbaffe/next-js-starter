'use client';

import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

import { RuchesListProps } from '../components/types';
import './TrackerFormComponent.css';

async function addTracker(
  nom: string,
  ruche_id: string,
  selectedBalance: number,
) {
  await fetch(
    `https://next-js-starter-lyart.vercel.app/api/add-tracker?nom=${nom}&ruche_id=${selectedBalance}`,
  );
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
    const ruche_id = form.ruche_id.value;

    await addTracker(nom, ruche_id, selectedBalance);

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
              <div className="inputGroup inputGroupLeft">
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
              <div className="inputGroup">
                <input
                  type="text"
                  name="ruche_id"
                  id="ruche_id"
                  required
                  autoComplete="off"
                />
                <label htmlFor="ruche_id" className="formLabel">
                  ID
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
