import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../configuration.service';
import { JsonConverterService } from '../json-converter.service';
import { ToasterService } from 'angular2-toaster';
import { ROUTES_API } from 'src/app/constantes/routes-api';
import { JourChome } from 'src/app/modeles/jour-chome.model';
import { BaseCrudService } from '../base-crud.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs/internal/operators/map';



@Injectable()
export class JourChomeService extends BaseCrudService<JourChome> {
  uri: String;
  constructor(http: HttpClient, toasterService: ToasterService,
    jsonConverterService: JsonConverterService,
    configService: ConfigurationService ) {
    super(http, JourChome, toasterService, jsonConverterService, configService);
    this.url = this.url + ROUTES_API.SCHEMA_REFERENTIEL + ROUTES_API.JOUR_CHOME;
  }

  // Récupération des jours chômés nationaux - opération Front
  filterJourChomeNationaux(jcs: JourChome[]): JourChome[] {
    return jcs.filter((jc: JourChome) => jc.actif && jc.national);
  }
}
