// EXEMPLAIRE

export class Livre {
  constructor(
    public isbn: string,
    public titre: string,
    public auteur: string
  ) {}
}

export class Emprunt {
  public dateRetour?: Date;

  constructor(public dateEmprunt: Date, public idAdherent: string) {}
}

export enum StatutExemplaire {
  DISPONIBLE = "Disponible",
  EMPRUNTE = "Emprunté",
}

export class Exemplaire {
  public statut: StatutExemplaire = StatutExemplaire.DISPONIBLE;
  public emprunts: Emprunt[] = [];

  constructor(public identifiant: number, public livre: Livre) {}

  public estEmpruntable(): boolean {
    return this.statut === StatutExemplaire.DISPONIBLE;
  }

  public estEmprunte(): boolean {
    return this.statut === StatutExemplaire.EMPRUNTE;
  }

  public emprunter(adherent: Adherent, dateEmprunt: Date): boolean {
    if (this.estEmpruntable()) {
      this.emprunts.push(new Emprunt(dateEmprunt, adherent.identifiant));
      this.statut = StatutExemplaire.EMPRUNTE;
      return true;
    } else {
      return false;
    }
  }

  public retourner(dateRetour: Date): boolean {
    if (this.estEmprunte()) {
      this.getEmpruntEnCours().dateRetour = dateRetour;
      this.statut = StatutExemplaire.DISPONIBLE;
      return true;
    } else {
      return false;
    }
  }

  private getEmpruntEnCours(): Emprunt {
    const maybeEmprunt = this.emprunts.find(
      (emprunt) => emprunt.dateRetour === undefined
    );
    if (maybeEmprunt) {
      return maybeEmprunt;
    } else {
      throw Error("Pas d'emprunt en cours");
    }
  }
}

export interface ExemplaireRepository {
  get(identifiant: number): Exemplaire | undefined;
  load(): Exemplaire[];
  save(exemplaire: Exemplaire): void;
  saveAll(exemplaires: Exemplaire[]): void;
}

// ADHERENT

export class Adherent {
  constructor(public identifiant: string, public nom: string) {}
}

export interface AdherentRepository {
  get(identifiant: string): Adherent | undefined;
  load(): Adherent[];
  save(adherent: Adherent): void;
  saveAll(adherents: Adherent[]): void;
}
