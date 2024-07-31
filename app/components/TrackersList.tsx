'use client';

import TrackerItem from './TrackerItem';
import { TrackersListProps } from './types';

function TrackersList({ initialTrackers, setTrackers }: TrackersListProps) {
  return (
    <div className="trackers-list">
      {initialTrackers.map((tracker: any) => (
        <TrackerItem
          key={tracker.id}
          tracker={tracker}
          setTrackers={setTrackers}
          trackers={initialTrackers}
        />
      ))}
    </div>
  );
}

export default TrackersList;
