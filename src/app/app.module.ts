// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule  } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster';
import {
  MatDialogModule, MatTabsModule,
  MatButtonModule, MatInputModule, MatRadioModule, MatCheckboxModule, MatSelectModule,
  MatProgressBarModule, MatDatepickerModule, MatDateFormats, MatNativeDateModule, MAT_DATE_LOCALE,
  MatTooltipModule, MatAutocompleteModule, MatProgressSpinnerModule
} from '@angular/material';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './web/commun/global-view/header/header.component';
import { GlobalViewComponent } from './web/commun/global-view/global-view.component';
import { FooterComponent } from './web/commun/global-view/footer/footer.component';
import { FilArianeComponent } from './web/commun/fil-ariane/fil-ariane.component';
import { LoaderComponent } from './web/commun/loader/loader.component';
import { AccueilComponent } from './web/accueil.component';
import { SuiviHomologationComponent } from './web/suivi-homologation/suivi-homologation.component';
import { SimulateurDelaisComponent } from './web/simulateur-delais/simulateur-delais.component';
import { SimulateurIndemniteComponent } from './web/simulateur-indemnite/simulateur-indemnite.component';
import { EspaceDocumentaireComponent } from './web/espace-documentaire/espace-documentaire.component';
import { MenuArborescentComponent } from './web/espace-documentaire/menu-arborescent/menu-arborescent.component';
import { ConfirmModaleComponent } from './web/commun/modales/confirm-modale.component';
import { RemoveModaleComponent } from './web/commun/modales/remove-modale.component';
import { LoadingModaleComponent } from './web/commun/modales/loading-modale.component';

// Services
import { ConfigurationService } from './services/configuration.service';
import { ToasterService } from 'angular2-toaster';
import { ArticleService } from './services/crud/article.service';
import { JourChomeService } from './services/crud/jour-chome.service';
import { DemandeService } from './services/crud/demande.service';
/* 
import { OrganismeService } from './services/crud/organisme.service';
import { OrganismeMiniDtoService } from './services/crud/mini-dto/organisme-mini-dto.service';

import { RegionService } from './services/crud/region.service';
import { DepartementService } from './services/crud/departement.service';
import { ParametresService } from './services/crud/parametre.service';
import { PaysService } from './services/crud/pays.service';
import { LocalisationService } from 'src/app/services/crud/localisation.service';
import { MessageInfoService } from './services/crud/message-info.service';
import { ApeService } from 'src/app/services/crud/ape.service';
import { QualificationService } from 'src/app/services/crud/qualification.service';
import { ConventionCollectiveService } from 'src/app/services/crud/convention-collective.service';
import { QualiteAssistantService } from 'src/app/services/crud/qualite-assistant.service';
import { MotifDecisionService } from 'src/app/services/crud/motif-decision.service';
import { TypeCourrierService } from 'src/app/services/crud/type-courrier.service'; */

// Guards + Handler + Directives + Pipes
import { PreventNavigationGuard } from './guards/prevent-navigation.guard';
import { SircErrorsHandler } from './services/sirc-errors-handler';
import { SircLoaderDirective } from './directives/sirc-loader.directive';
import { NumberToMonthPipe } from './pipes/number-to-month.pipe';
import { GenericPipe } from './pipes/generic-pipe.pipe';
import { BooleanPipe } from 'src/app/pipes/boolean-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    GlobalViewComponent,  HeaderComponent, FooterComponent,
    AccueilComponent,
    SuiviHomologationComponent,
    SimulateurDelaisComponent,
    SimulateurIndemniteComponent,
    EspaceDocumentaireComponent, MenuArborescentComponent,
    ConfirmModaleComponent, RemoveModaleComponent, LoadingModaleComponent,
    FilArianeComponent, LoaderComponent, SircLoaderDirective,
    GenericPipe, NumberToMonthPipe, BooleanPipe
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule,
    RouterModule, AppRoutingModule,
    ReactiveFormsModule,
    ToasterModule.forRoot(),
    // Material
    MatDialogModule, MatButtonModule, MatInputModule, MatSelectModule, MatRadioModule, MatCheckboxModule,
    MatTooltipModule, MatNativeDateModule, MatDatepickerModule,
    MatProgressBarModule, MatTabsModule,
    MatAutocompleteModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: APP_INITIALIZER, useFactory: initializer, multi: true, deps: [ConfigurationService]},
    { provide: ErrorHandler, useClass: SircErrorsHandler },
    ArticleService, JourChomeService, DemandeService,
    ToasterService,
    /* ToasterService,  OrganismeService, OrganismeMiniDtoService,  DemandeRechercheDtoService,
      , RegionService, DepartementService, CompteUtilisateurService, ProfilService,
      MessageInfoService, ParametresService, PaysService, LocalisationService, ApeService,
      QualificationService, ConventionCollectiveService, QualiteAssistantService,
      MotifDecisionService, TypeCourrierService */
    PreventNavigationGuard,
  ],
  entryComponents: [
    LoaderComponent,
    ConfirmModaleComponent, RemoveModaleComponent, LoadingModaleComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Initialise la configuration externalisée de l'application
export function initializer(config: ConfigurationService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try { // Configuration de l'APP
        await config.load();
        resolve();
      } catch (error) {
        console.error(`ERREUR - une erreur critique est survenue lors du chargement de la configuration de l'application.`);
        reject(error);
      }
    });
  };
}
