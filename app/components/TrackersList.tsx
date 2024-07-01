'use client';

import { useState } from 'react';
import TrackerItem from '../components/TrackerItem';

function TrackersList({ initialTrackers }) {
  const [trackers, setTrackers] = useState(initialTrackers);
  const [selectedFilters, setSelectedFilters] = useState('');

  // filteredTrackers change à chaque changement de filtre grâce au useState sur le filtre
  const filteredTrackers = trackers.filter(
    (tracker: any) =>
      selectedFilters.length === 0 ||
      selectedFilters.includes(tracker.ruche.rucher.nom),
  );

  // si le filtre est dans prevFilters, l'enlever, sinon l'ajouter
  const handleFilterChange = (filter: any) => {
    setSelectedFilters((prevFilters: any) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((f: any) => f !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };

  // récupérer les noms des ruchers
  let getFilteredOptions = (initialTrackers: any) => {
    let unique_values = initialTrackers
      .map((tracker: any) => tracker.ruche.rucher.nom)
      .filter(
        (value: any, index: number, current_value: any) =>
          current_value.indexOf(value) === index,
      );
    return unique_values;
  };
  const filterOptions: any = getFilteredOptions(initialTrackers);

  return (
    <div>
      <div>
        {filterOptions.map((filter: any) => (
          <label key={filter}>
            <input
              type="checkbox"
              value={filter}
              checked={selectedFilters.includes(filter)}
              onChange={() => handleFilterChange(filter)}
              className="checkbox-class"
            />
            {filter}
          </label>
        ))}
      </div>

      <div className="trackers-list">
        {filteredTrackers.map((tracker: any) => (
          <TrackerItem key={tracker.id} tracker={tracker} />
        ))}
      </div>
    </div>
  );
}

export default TrackersList;
