import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  // Version récupérée directement depuis le fichier "package.json"
  public version: string = environment.VERSION;

  constructor(
  ) { }

  ngOnInit() {
  }
}
