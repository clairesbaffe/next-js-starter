'use client';

import React from 'react';
import './TrackerFormComponent.css';

async function addTracker(nom: string, ruche_id: string) {
  await fetch(
    `https://next-js-starter-lyart.vercel.app/api/add-tracker?nom=${nom}&ruche_id=${ruche_id}`,
  );
}

const TrackerForm = () => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const nom = form.nom.value;
    const ruche_id = form.ruche_id.value;

    await addTracker(nom, ruche_id);

    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Ajouter un tracker</h1>
      <form onSubmit={handleSubmit} className="formContainer space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="nom" className="formLabel">
              Nom :{' '}
            </label>
            <input type="text" name="nom" id="nom" />
          </div>
          <div>
            <label htmlFor="ruche_id" className="formLabel">
              Id de la ruche :{' '}
            </label>
            <input type="text" name="ruche_id" id="ruche_id" />
          </div>
        </div>

        <input
          type="submit"
          value="Ajouter"
          className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
        />
      </form>
    </div>
  );
};

export default TrackerForm;
