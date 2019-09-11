import { Injectable } from '@angular/core';
import { JOUR_CHOME_PAQUE } from 'src/app/constantes/referentiel/jour-chome-paque.enum';
import { JourChome } from 'src/app/modeles/jour-chome.model';
import * as moment from 'moment';
import { Moment } from 'moment';
import { DELAI } from 'src/app/constantes/delai';
import { JsonConverterService } from '../json-converter.service';
import { JourChomeService } from './jour-chome.service';
import { ConfigurationService } from '../configuration.service';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';
import { BaseCrudService } from '../base-crud.service';
import { ROUTES_API } from 'src/app/constantes/routes-api';

@Injectable()
export class DemandeService extends BaseCrudService<DemandeService> {
  uri: String;
  constructor(http: HttpClient, toasterService: ToasterService,
    jsonConverterService: JsonConverterService,
    configService: ConfigurationService ) {
    super(http, DemandeService, toasterService, jsonConverterService, configService);
    this.url = this.url + ROUTES_API.SCHEMA_METIER + ROUTES_API.DEMANDE;
  }

// Permet de vérifier si la date est un jour chômé ou pas
  isDateChomeeLoc(listeJourChomes: JourChome[], date: Moment): boolean {
    let isJourChome = false;
    if (listeJourChomes !== undefined) {
      for (const jC of listeJourChomes) {
        let dateJC;
        // Créer un objet date si le jour chomé est à calculé
        if (jC.jour === null || jC.mois === null ) {
          switch (jC.code) {
            case JOUR_CHOME_PAQUE.ASSOMPTION: {
              dateJC = this.JoursFeries(date.year(), true, false, false, false, false, false, false); break;
            }
            case JOUR_CHOME_PAQUE.PAQUES: {
              dateJC = this.JoursFeries(date.year(), false, true, false, false, false, false, false); break;
            }
            case JOUR_CHOME_PAQUE.VENDREDI_SAINT: {
              dateJC = this.JoursFeries(date.year(), false, false, true, false, false, false, false); break;
            }
            case JOUR_CHOME_PAQUE.LUNDI_PAQUES: {
              dateJC = this.JoursFeries(date.year(), false, false, false, true, false, false, false); break;
            }
            case JOUR_CHOME_PAQUE.ASCENSION: {
              dateJC = this.JoursFeries(date.year(), false, false, false, false, true, false, false); break;
            }
            case JOUR_CHOME_PAQUE.PENTECOTE: {
              dateJC = this.JoursFeries(date.year(), false, false, false, false, false, true, false); break;
            }
            case JOUR_CHOME_PAQUE.LUNDI_PENTECOTE: {
              dateJC = this.JoursFeries(date.year(), false, false, false, false, false, false, true); break;
            }
          }
        } else { // Créer un objet date si le jour chomé est fixe
          dateJC = new Date(date.year(), jC.mois - 1, jC.jour);
        }
        // Comparer le jour chômé avec la date
        if (dateJC.getDate() === date.date() && dateJC.getMonth() === date.month() && dateJC.getFullYear() === date.year()) {
          isJourChome = true;
        }
      }
    }
    return isJourChome;
  }

  JoursFeries (an: number, assomption: boolean, paques: boolean, vendrediSaint: boolean,
               lundipaque: boolean, ascension: boolean, pentecote: boolean, lundiPentocote: boolean): Date {

    let date;
    const G = an % 19;
    const C = Math.floor(an / 100);
    const H = (C  -  Math.floor(C / 4)  -  Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30;
    const I = H  -  Math.floor(H / 28) * (1  -  Math.floor(H / 28) * Math.floor(29 / (H + 1)) * Math.floor((21  -  G) / 11));
    const J = (an * 1 + Math.floor(an / 4) + I + 2  -  C + Math.floor(C / 4)) % 7;
    const L = I  -  J;
    const MoisPaques = 3 + Math.floor((L + 40) / 44);
    const JourPaques = L + 28  -  31 * Math.floor(MoisPaques / 4);

    // Assomption
    if (assomption)     { date = new Date(an,  7, 15); }
    // Paques
    if (paques)         { date = new Date(an, MoisPaques - 1, JourPaques); }
    // VendrediSaint
    if (vendrediSaint)  { date = new Date(an, MoisPaques - 1, JourPaques - 2); }
    // LundiPaques
    if (lundipaque)     { date = new Date(an, MoisPaques - 1, JourPaques + 1); }
    // Ascension
    if (ascension)      { date = new Date(an, MoisPaques - 1, JourPaques + 39); }
    // Pentecote
    if (pentecote)      { date = new Date(an, MoisPaques - 1, JourPaques + 49); }
    // LundiPentecote
    if (lundiPentocote) { date = new Date(an, MoisPaques - 1, JourPaques + 50); }
    return date;
  }

  /** Calcul date de fin du délai d'instruction */
  calculDateFinDelaiInstru(dateReception: Date, listeJourChomes: JourChome[]): Date {
    const dateInstru: moment.Moment = moment(dateReception);
    // Prise en compte du délai d'instruction - en jours ouvrables
    for (let i = 0; i < DELAI.DELAI_INSTRUCTION ; i++) {
      dateInstru.add(1, 'days');
      // Si le jour de réception potentiel est un jour chomé ou un dimanche ==> on se déplace au jour ouvré suivant
      while (dateInstru.weekday() === 0 || this.isDateChomeeLoc(listeJourChomes, dateInstru)) {
        dateInstru.add(1, 'days');
      }
    }
    // Lorsque le délai expire un samedi, dimanche ou jour férié ou chômé, il est prorogé jusqu’au premier jour ouvrable suivant.
    while (dateInstru.weekday() === 6 || dateInstru.weekday() === 0 || this.isDateChomeeLoc(listeJourChomes, dateInstru)) {
      dateInstru.add(1, 'days');
    }
    return dateInstru.toDate();
  }

  /** Calcul date de fin du délai de rétractation */
  calculDateFinDelaiRetractation(dateSignature: Date, listeJourChomes: JourChome[]): Date {
    if (dateSignature) {
      const dateSign: moment.Moment = moment(dateSignature);
      // Prise en compte du délai de rétractation - en jours calendaires
      dateSign.add(15, 'days');
      // Lorsque le délai expire un samedi, dimanche ou jour férié ou chômé, il est prorogé jusqu’au premier jour ouvrable suivant.
      while (dateSign.weekday() === 6 || dateSign.weekday() === 0 || this.isDateChomeeLoc(listeJourChomes, dateSign)) {
        dateSign.add(1, 'days');
      }
      return dateSign.toDate();
    }
    return undefined;
  }
}
