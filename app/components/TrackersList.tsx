'use client';

import { useState } from 'react';
import TrackerItem from '../components/TrackerItem';

function TrackersList({ initialTrackers }) {
  const [trackers, setTrackers] = useState(initialTrackers);
  const [ruchers, setRuchers] = useState('');
  const [mode, setMode] = useState('');

  // filteredTrackers change à chaque changement de filtre grâce au useState sur le filtre
  const filteredTrackers = trackers.filter(
    (tracker: any) =>
      (ruchers.length === 0 || ruchers.includes(tracker.ruche.rucher.nom)) &&
      (mode.length === 0 || tracker.mode === mode),
  );

  // si le filtre est dans prevRucherFilters, l'enlever, sinon l'ajouter
  const handleRucherFilterChange = (filter: any) => {
    setRuchers((prevRucherFilters: any) => {
      if (prevRucherFilters.includes(filter)) {
        return prevRucherFilters.filter((f: any) => f !== filter);
      } else {
        return [...prevRucherFilters, filter];
      }
    });
  };

  const handleModeFilterChange = (event: any) => {
    const filter = event.target.value;
    setMode(filter);
  };

  // récupérer les noms des ruchers
  let getFilteredRuchers = (initialTrackers: any) => {
    let unique_values = initialTrackers
      .map((tracker: any) => tracker.ruche.rucher.nom)
      .filter(
        (value: any, index: number, current_value: any) =>
          current_value.indexOf(value) === index,
      );
    return unique_values;
  };
  const filterRuchers: any = getFilteredRuchers(initialTrackers);

  let getFilteredModes = (initialTrackers: any) => {
    let unique_values = initialTrackers
      .map((tracker: any) => tracker.mode)
      .filter(
        (value: any, index: number, current_value: any) =>
          current_value.indexOf(value) === index,
      );
    return unique_values;
  };
  const filterModes: any = getFilteredModes(initialTrackers);

  return (
    <div>
      <div>
        {filterRuchers.map((rucher: any) => (
          <label key={rucher}>
            <input
              type="checkbox"
              value={rucher}
              checked={ruchers.includes(rucher)}
              onChange={() => handleRucherFilterChange(rucher)}
              className="checkbox-class"
            />
            {rucher}
          </label>
        ))}
      </div>

      <div>
        <select name="mode" id="mode" onChange={handleModeFilterChange}>
          <option value="">Tous</option>
          {filterModes.map((modeValue: any) => (
            // <div>
            <option key={modeValue} value={modeValue}>
              {modeValue}
            </option>
          ))}
        </select>

        {/* <label key={'Tous'}>
          <input
            type="radio"
            value={'Tous'}
            checked={mode === ''}
            onChange={() => handleModeFilterChange('Tous')}
            className="radio-class"
          />
          Tous
        </label>
        {filterModes.map((modeValue: any) => (
          <label key={modeValue}>
            <input
              type="radio"
              value={modeValue}
              checked={mode === modeValue}
              onChange={() => handleModeFilterChange(modeValue)}
              className="radio-class"
            />
            {modeValue}
          </label>
        ))} */}
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
