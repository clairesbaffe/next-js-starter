'use client';

import { useState } from 'react';
import Select from 'react-select';
import { FaPowerOff, FaPlay, FaPause } from 'react-icons/fa';
import { MdOutlineMyLocation } from 'react-icons/md';

import { TrackersListProps } from '../components/types';
import MapComponent from '../components/MapComponent';
import TrackerForm from '../components/TrackerForm';
import TrackersList from '../components/TrackersList';

function CombinedPages({ initialTrackers }: TrackersListProps) {
  const [trackers, setTrackers] = useState(initialTrackers);
  const [ruchers, setRuchers] = useState('');
  const [mode, setMode] = useState('');

  const [key, setKey] = useState(0);

  const reloadMapComponent = () => {
    setKey((prevKey) => prevKey + 1);
  };

  // UPDATE TRACKERS LIST AT ANY MOMENT WITH USESTATE
  const filteredTrackers = trackers.filter(
    (tracker: any) =>
      (ruchers.length === 0 || ruchers.includes(tracker.ruche.rucher.nom)) &&
      (mode.length === 0 || tracker.mode === mode),
  );

  // HANDLE CHANGE ON FILTERS
  const handleRucherFilterChange = (filter: any) => {
    setRuchers((prevRucherFilters: any) => {
      if (prevRucherFilters.includes(filter)) {
        return prevRucherFilters.filter((f: any) => f !== filter);
      } else {
        return [...prevRucherFilters, filter];
      }
    });
    reloadMapComponent();
  };

  const handleModeFilterChange = (selectedOption: any) => {
    const filter = selectedOption ? selectedOption.value : '';
    if (filter === 'Tous') setMode('');
    else setMode(filter);
    reloadMapComponent();
  };

  // SET OPTIONS
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
  filterModes.unshift('Tous');

  // SELECT MODES DESIGN
  function getModeDescriptionWithIcon(mode: string) {
    switch (mode) {
      case 'INACTIF':
        return (
          <div className="modeFilterSelectOption">
            <FaPowerOff className="select-tracker-mode-icon" id="off-mode" />{' '}
            Eteint
          </div>
        );
      case 'FONCTIONNEL':
        return (
          <div className="modeFilterSelectOption">
            <FaPlay className="select-tracker-mode-icon" id="on-mode" /> En
            marche
          </div>
        );
      case 'PAUSE':
        return (
          <div className="modeFilterSelectOption">
            <FaPause className="select-tracker-mode-icon" id="pause-mode" /> En
            pause
          </div>
        );
      case 'TRACKING':
        return (
          <div className="modeFilterSelectOption">
            <MdOutlineMyLocation
              className="select-tracker-mode-icon"
              id="tracking-mode"
            />
            En alerte
          </div>
        );
      case 'Tous':
        return <div className="modeFilterSelectOption">Tous</div>;
      default:
        return 'Unknown mode';
    }
  }

  const customOptions = filterModes.map((modeValue: string) => ({
    value: modeValue,
    label: getModeDescriptionWithIcon(modeValue),
  }));

  return (
    <div>
      <div className="filterContainer">
        <h1>Filtrer par rucher</h1>
        {filterRuchers.map((rucher: any) => (
          <label key={rucher} className="rucherFilterGroup">
            <input
              type="checkbox"
              value={rucher}
              checked={ruchers.includes(rucher)}
              onChange={() => handleRucherFilterChange(rucher)}
              className="checkbox-class checkbox-info checkbox"
            />
            {rucher}
          </label>
        ))}
      </div>

      <div className="filterContainer">
        <h1>Filtrer par état</h1>
        <Select
          options={customOptions}
          onChange={handleModeFilterChange}
          name="mode"
          id="mode"
        />
      </div>

      {/* <TrackerForm /> */}
      <div className="container">
        <MapComponent key={key} initialTrackers={filteredTrackers} />
        <TrackersList initialTrackers={filteredTrackers} />
      </div>
    </div>
  );
}

export default CombinedPages;
