import { Component } from '@angular/core';
import { ConfigurationService } from './services/configuration.service';
import { ToasterConfig, IToasterConfig } from 'angular2-toaster/angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'sirc-public-front';

  constructor(private conf: ConfigurationService) {}

  // Configuration de base pour les Toasts
  public appConfig: IToasterConfig = new ToasterConfig({
    animation: 'fade', newestOnTop: true,
    positionClass: 'toast-top-right',
    toastContainerId: 1,
    timeout: {success: 4000, info: 0, error: 0, warning: 0 },
    showCloseButton: true,
    mouseoverTimerStop: true
  });

}
