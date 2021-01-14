import { Adherent, Exemplaire, Livre } from "./src/domain";

const hp = new Livre(
  "42897309821",
  "Harry Potter à l'école de sorciers",
  "J.K. Rowling"
);
const sda = new Livre("8247301982", "Le Seigneur des Anneaux", "J.R. Tolkien");

export const EXEMPLAIRES: Exemplaire[] = [
  new Exemplaire(1, hp),
  new Exemplaire(2, hp),
  new Exemplaire(3, sda),
];

export const ADHERENTS: Adherent[] = [
  new Adherent("sde", "Sylvain"),
  new Adherent("lbo", "Laurent"),
];
