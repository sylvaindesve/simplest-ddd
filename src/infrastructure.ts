import {
  Adherent,
  AdherentRepository,
  Exemplaire,
  ExemplaireRepository,
} from "./domain";

export class InMemoryExemplaireRepository implements ExemplaireRepository {
  private _memory: Exemplaire[];

  constructor() {
    this._memory = [];
  }

  get(identifiant: number): Exemplaire | undefined {
    return this._memory.find(
      (exemplaire) => exemplaire.identifiant === identifiant
    );
  }

  load(): Exemplaire[] {
    return this._memory;
  }

  save(exemplaire: Exemplaire): void {
    this._memory = this._memory.reduce(
      (all: Exemplaire[], current: Exemplaire) => {
        if (current.identifiant === exemplaire.identifiant) {
          return [...all, exemplaire];
        } else {
          return [...all, current];
        }
      },
      []
    );
  }

  saveAll(exemplaires: Exemplaire[]): void {
    this._memory = exemplaires;
  }
}

export class InMemoryAdherentRepository implements AdherentRepository {
  private _memory: Adherent[];

  constructor() {
    this._memory = [];
  }

  get(identifiant: string): Adherent | undefined {
    return this._memory.find(
      (adherent) => adherent.identifiant === identifiant
    );
  }

  load(): Adherent[] {
    return this._memory;
  }

  save(adherent: Adherent): void {
    this._memory = this._memory.reduce((all: Adherent[], current: Adherent) => {
      if (current.identifiant === adherent.identifiant) {
        return [...all, adherent];
      } else {
        return [...all, current];
      }
    }, []);
  }

  saveAll(adherents: Adherent[]): void {
    this._memory = adherents;
  }
}
