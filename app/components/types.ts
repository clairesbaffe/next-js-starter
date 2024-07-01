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

export interface Tracker {
  id: number;
  nom: string;
  ruche_id: number;
  mode: string;
  date_ajout: string;
  date_modification: string;
  ruche: Ruche;
}

export interface TrackersListProps {
  initialTrackers: Tracker[];
}
