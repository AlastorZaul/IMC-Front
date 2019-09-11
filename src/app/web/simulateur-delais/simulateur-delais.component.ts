import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DemandeService } from 'src/app/services/crud/demande.service';
import { ROUTES } from 'src/app/constantes/routes';
import { JourChome } from 'src/app/modeles/jour-chome.model';
import { JourChomeService } from 'src/app/services/crud/jour-chome.service';
import * as moment from 'moment';
import { IFilAriane } from 'src/app/interfaces/IFilAriane';
import { FilArianeItem } from 'src/app/modeles/utils/fil-ariane-item.model';

@Component({
  selector: 'app-simulateur-delais',
  templateUrl: './simulateur-delais.component.html'
})
export class SimulateurDelaisComponent implements OnInit, IFilAriane {
  public listeJourChomesNationaux: JourChome[];
  public loading = true;
  public showResultats = false;
  public filAriane: FilArianeItem[];
  public modeleForm = this.fb.group({
    'dateSignature': this.fb.control(''),
    'dateFinDelaiRetractation': this.fb.control(''),
    'dateEnvoiFormulaire': this.fb.control(''),
    'dateFinDelaiInstruction': this.fb.control(''),
  });

  constructor(public fb: FormBuilder,
    private demandeSvc: DemandeService,
    private jourChomeSvc: JourChomeService) {
  }

  ngOnInit() {
    // Récupération des jours chômés nationaux
    this.jourChomeSvc.getAll().subscribe(res => {
      this.listeJourChomesNationaux = this.jourChomeSvc.filterJourChomeNationaux(res as JourChome[]);
      this.loading = false;
      this.initFilAriane();
    });
  }

  onCalcul() {
    if (this.dateSignature) {
      const dateFinRetract: moment.Moment
        = moment(this.demandeSvc.calculDateFinDelaiRetractation(this.dateSignature.value, this.listeJourChomesNationaux));
      this.dateFinDelaiRetractation.setValue(dateFinRetract);
      this.dateEnvoiFormulaire.setValue(moment(dateFinRetract).add(1, 'days'));
      this.dateFinDelaiInstruction.setValue(
        this.demandeSvc.calculDateFinDelaiInstru(dateFinRetract.toDate(), this.listeJourChomesNationaux));
      this.showResultats = true;
    } else {
      this.showResultats = false;
    }
  }

  get dateSignature(): FormControl { return this.modeleForm.get('dateSignature') as FormControl; }
  get dateFinDelaiRetractation(): FormControl { return this.modeleForm.get('dateFinDelaiRetractation') as FormControl; }
  get dateEnvoiFormulaire(): FormControl { return this.modeleForm.get('dateEnvoiFormulaire') as FormControl; }
  get dateFinDelaiInstruction(): FormControl { return this.modeleForm.get('dateFinDelaiInstruction') as FormControl; }

  /** Gestion du fil d'Ariane */
  initFilAriane() {
    this.filAriane = [new FilArianeItem(`Simulation des délais de rétractation et d'homologation`, '/' + ROUTES.SIMULATEUR_DELAIS)];
  }
  getFilAriane(): FilArianeItem[] {
    return this.filAriane;
  }
}
