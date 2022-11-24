export interface DtoOutputDeleteEvents {
  // Date de début, contient également l'heure
  startDate: string;

  // Date de fin, contient également l'heure
  endDate: string;

  // Numéro unique de l'événement
  idEventsEmployee: number;

  // Numéro de l'employé
  idAccount: number;
}