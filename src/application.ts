import {
  Adherent,
  AdherentRepository,
  Exemplaire,
  ExemplaireRepository,
  Livre,
} from "./domain";

export class BibliothequeApplication {
  private _exemplaireRepository: ExemplaireRepository;
  private _adherentRepository: AdherentRepository;

  constructor(
    exemplairesRepository: ExemplaireRepository,
    adherentRepository: AdherentRepository
  ) {
    this._exemplaireRepository = exemplairesRepository;
    this._adherentRepository = adherentRepository;
  }

  public nouvelAdherent(identifiant: string, nom: string) {
    const adherents = this._adherentRepository.load();
    adherents.push(new Adherent(identifiant, nom));
    this._adherentRepository.saveAll(adherents);
  }

  public nouvelExemplaire(identifiant: number, livre: Livre) {
    const exemplaires = this._exemplaireRepository.load();
    exemplaires.push(new Exemplaire(identifiant, livre));
    this._exemplaireRepository.saveAll(exemplaires);
  }

  public listerExemplaires(): string[] {
    const exemplaires = this._exemplaireRepository.load();
    return exemplaires.map(
      (ex) =>
        `${ex.identifiant}: ${ex.livre.titre} - ${ex.livre.auteur} (${
          ex.livre.isbn
        }) => ${ex.statut.valueOf()}`
    );
  }

  public emprunt(idExemplaire: number, idAdherent: string): boolean {
    const maybeExemplaire = this._exemplaireRepository.get(idExemplaire);
    if (!maybeExemplaire) {
      return false;
    }

    const maybeAdherent = this._adherentRepository.get(idAdherent);
    if (!maybeAdherent) {
      return false;
    }

    maybeExemplaire.emprunter(maybeAdherent, new Date());
    this._exemplaireRepository.save(maybeExemplaire);

    return true;
  }

  public retour(idExemplaire: number, idAdherent: string) {
    const maybeExemplaire = this._exemplaireRepository.get(idExemplaire);
    if (!maybeExemplaire) {
      return false;
    }

    const maybeAdherent = this._adherentRepository.get(idAdherent);
    if (!maybeAdherent) {
      return false;
    }

    maybeExemplaire.retourner(new Date());
    this._exemplaireRepository.save(maybeExemplaire);

    return true;
  }
}
