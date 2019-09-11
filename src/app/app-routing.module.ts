import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from './constantes/routes';
import { GlobalViewComponent } from './web/commun/global-view/global-view.component';
import { AccueilComponent } from './web/accueil.component';
import { SuiviHomologationComponent } from './web/suivi-homologation/suivi-homologation.component';
import { SimulateurDelaisComponent } from './web/simulateur-delais/simulateur-delais.component';
import { SimulateurIndemniteComponent } from './web/simulateur-indemnite/simulateur-indemnite.component';
import { EspaceDocumentaireComponent } from './web/espace-documentaire/espace-documentaire.component';


const routes: Routes = [
  { path: '', redirectTo: ROUTES.ACCUEIL, pathMatch: 'full' },
  { path: '', component: GlobalViewComponent,
    children: [
      { path: ROUTES.ACCUEIL, component: AccueilComponent, },
      { path: ROUTES.SUIVI_HOMOLOGATION, component: SuiviHomologationComponent },
      { path: ROUTES.SIMULATEUR_DELAIS, component: SimulateurDelaisComponent },
      { path: ROUTES.SIMULATEUR_INDEMNITE, component: SimulateurIndemniteComponent },
      { path: ROUTES.ESPACE_DOCUMENTAIRE + '/:code', component: EspaceDocumentaireComponent },
    ]
  },
  { path: '**', redirectTo: ROUTES.ACCUEIL }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
