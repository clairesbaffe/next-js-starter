'use client';

import { useState } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCrosshairs,
  faPause,
  faPowerOff,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { CombinedPagesProps } from '../components/types';
import MapComponent from '../components/MapComponent';
import TrackersList from '../components/TrackersList';
import TrackerForm from '../components/TrackerForm';

function CombinedPages({ initialTrackers, balances }: CombinedPagesProps) {
  const [trackers, setTrackers] = useState(initialTrackers);
  const [ruchers, setRuchers] = useState('');
  const [mode, setMode] = useState('');

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
  };

  const handleModeFilterChange = (selectedOption: any) => {
    const filter = selectedOption ? selectedOption.value : '';
    if (filter === 'Tous') setMode('');
    else setMode(filter);
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
            <FontAwesomeIcon
              icon={faPowerOff}
              className="select-tracker-mode-icon"
              id="off-mode"
            />
            Eteint
          </div>
        );
      case 'FONCTIONNEL':
        return (
          <div className="modeFilterSelectOption">
            <FontAwesomeIcon
              icon={faPlay}
              className="select-tracker-mode-icon"
              id="on-mode"
            />
            En marche
          </div>
        );
      case 'PAUSE':
        return (
          <div className="modeFilterSelectOption">
            <FontAwesomeIcon
              icon={faPause}
              className="select-tracker-mode-icon"
              id="pause-mode"
            />
            En pause
          </div>
        );
      case 'TRACKING':
        return (
          <div className="modeFilterSelectOption">
            <FontAwesomeIcon
              icon={faCrosshairs}
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
    <div id="pageContainer">
      <div className="pageLeftSide">
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
            defaultValue={customOptions[0]}
            onChange={handleModeFilterChange}
            name="mode"
            id="modeSelect"
          />
        </div>
      </div>

      <Tabs className="pageRightSide">
        <TabList>
          <Tab>Map</Tab>
          <Tab>Liste des trackers</Tab>
        </TabList>

        <TabPanel forceRender={true}>
          <MapComponent initialTrackers={filteredTrackers} />
        </TabPanel>
        <TabPanel className={'trackerListPanel'}>
          <TrackerForm balances={balances} />
          <TrackersList initialTrackers={filteredTrackers} />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default CombinedPages;
