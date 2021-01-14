import * as fs from "fs";
import { BibliothequeApplication } from "./src/application";
import {
  InMemoryAdherentRepository,
  InMemoryExemplaireRepository,
} from "./src/infrastructure";
import { EXEMPLAIRES, ADHERENTS } from "./data";
import { Livre } from "./src/domain";

const exemplaireRepository = new InMemoryExemplaireRepository();
const adherentRepository = new InMemoryAdherentRepository();

exemplaireRepository.saveAll(EXEMPLAIRES);
adherentRepository.saveAll(ADHERENTS);

const bibliotheque = new BibliothequeApplication(
  exemplaireRepository,
  adherentRepository
);

console.log("Liste des exemplaires:");
console.log(bibliotheque.listerExemplaires().join("\n"));
console.log("");

console.log("Simulation d'activité");
bibliotheque.emprunt(2, "sde");
bibliotheque.emprunt(1, "lbo");
bibliotheque.nouvelExemplaire(4, new Livre("47290378098", "L'Appel de Cthulhu", "H.P. Lovecraft"));
bibliotheque.retour(2, "sde");
bibliotheque.emprunt(2, "lbo");
console.log("");

console.log("Liste des exemplaires:");
console.log(bibliotheque.listerExemplaires().join("\n"));
console.log("");

fs.writeFileSync(
  "exemplaires.json",
  JSON.stringify(
    {
      exemplaires: exemplaireRepository.load(),
      adherents: adherentRepository.load(),
    },
    null,
    "  "
  )
);
