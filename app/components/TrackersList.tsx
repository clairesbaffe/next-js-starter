'use client';

import TrackerItem from './TrackerItem';
import { TrackersListProps } from './types';

function TrackersList({ initialTrackers }: TrackersListProps) {
  return (
    <div className="trackers-list">
      {initialTrackers.map((tracker: any) => (
        <TrackerItem key={tracker.id} tracker={tracker} />
      ))}
    </div>
  );
}

export default TrackersList;
