// types.ts

export interface Rucher {
  id: number;
  nom: string;
  date_creation: string;
}

export interface Ruche {
  id: number;
  nom: string;
  rucher_id: number;
  date_creation: string;
  rucher: Rucher;
}

export interface Historique {
  id: number;
  tracker_id: number;
  latitude: number;
  longitude: number;
  date_ajout: string;
}

export interface Tracker {
  id: number;
  nom: string;
  ruche_id: number;
  mode: string;
  date_ajout: Date;
  date_modification: Date;
  date_modif_mode: Date;
  pause_duration: number | undefined;
  pause_end_time: Date | undefined;
  deplacement: boolean | undefined;
  pause_tracking: boolean | undefined;
  historiques: Historique[];
  ruche: Ruche;
}

export interface TrackersListProps {
  initialTrackers: Tracker[];
  setTrackers: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface CombinedPagesProps {
  initialTrackers: Tracker[];
  balances: Ruche[];
}

export interface RuchesListProps {
  balances: Ruche[];
}
