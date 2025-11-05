import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './config/app.config';
import { AppComponent } from './components/app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
// Aquí aplicamos un patrón de programación que se usa en Angular, también Spring, .netCore,
// llamado Inversion de control (IoC - Inversion of Control).


// Angular, porfa, encargate tu de ejecutar mi aplicación!