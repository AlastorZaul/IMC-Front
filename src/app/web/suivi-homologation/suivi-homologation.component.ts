import { Component, OnInit } from '@angular/core';
import { IFilAriane } from 'src/app/interfaces/IFilAriane';
import { FilArianeItem } from 'src/app/modeles/utils/fil-ariane-item.model';
import { ROUTES } from 'src/app/constantes/routes';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-suivi-homologation',
  templateUrl: './suivi-homologation.component.html'
})
export class SuiviHomologationComponent implements OnInit, IFilAriane {
  
  filAriane: FilArianeItem [];
  private modeleForm: FormGroup;
  public show:boolean = false;
  
  
  constructor(private fb: FormBuilder,) { }

  ngOnInit() {
    this.initFilAriane();

    this.modeleForm = this.fb.group({
        'numeroDem': this.fb.control('', Validators.required),
        'numeroSiret':this.fb.control('', Validators.required),
    });
  }

   /** Gestion du fil d'Ariane */
   initFilAriane() {
    this.filAriane = [new FilArianeItem("Suivre une demande d'homologation", '/' + ROUTES.SUIVI_HOMOLOGATION)];
  }
  getFilAriane(): FilArianeItem[] {
    return this.filAriane;
  }

  onRecup(){
    this.numeroDem;
    this.numeroSiret;
    this.show = true;
  }

  onRetour(): void {
    this.modeleForm.reset()
    this.show = false;
  }

  get numeroDem(): FormControl { return this.modeleForm.get('numeroDem') as FormControl; }
  get numeroSiret(): FormControl { return this.modeleForm.get('numeroSiret') as FormControl; }

}
