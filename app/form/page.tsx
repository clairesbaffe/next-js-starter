'use client';

import { log } from 'console';
import { FormEvent } from 'react';

export default async function Page() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = event.currentTarget;
    const name = formData.elements.name.value;
    const owner = formData.elements.owner.value;
    console.log(`Entry : ${name} ; ${owner}`);

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
  }

  return (
    <div className="space-y-8">
      <div className="space-y-10 text-white">
        <h1>Ajouter une donnée</h1>

        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name : </label>
          <input type="text" name="name" id="name" />

          <label htmlFor="owner">Owner : </label>
          <input type="text" name="owner" id="owner" />

          <input type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
}
