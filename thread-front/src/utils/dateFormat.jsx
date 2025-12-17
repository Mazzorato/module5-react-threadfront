export function formatDate(date) {
  const heurs = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const jour = date.getDate();

  const mois = [
    "janv",
    "fev",
    "mars",
    "avr",
    "mai",
    "juin",
    "juil",
    "aout",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const singleMois = mois[date.getUTCMonth()];
  const year = date.getUTCFullYear().toString().slice(-2);

  return `${heurs}:${minutes} ${jour} ${singleMois} ${year}`;
}
