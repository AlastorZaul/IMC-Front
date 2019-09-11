import { Component, OnInit } from '@angular/core';
import { FilArianeItem } from '../modeles/utils/fil-ariane-item.model';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html'
})
export class AccueilComponent implements OnInit {
  filAriane: FilArianeItem [];

  constructor() { }

  ngOnInit() {
  }

}
