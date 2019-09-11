import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  // Version récupérée directement depuis le fichier "package.json"
  public version: string = environment.VERSION;

  constructor() { }

  ngOnInit() {
  }

}
