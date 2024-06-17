'use client';

import { FormEvent, useState } from 'react';

export default function Page() {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(`Entry : ${name} ; ${owner}`);
  }

  return (
    <div className="space-y-8">
      <div className="space-y-10 text-white">
        <h1>Ajouter une donnée</h1>

        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="owner">Owner : </label>
          <input
            type="text"
            name="owner"
            id="owner"
            onChange={(e) => setOwner(e.target.value)}
          />

          <input type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
}

// const response = await fetch(
//   'https://next-js-starter-lyart.vercel.app/api/add-pet',
//   {
//     method: 'POST',
//     body: formData,
//   },
// );

// Handle response if necessary
// const data = await response.json();
// ...
