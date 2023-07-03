import { provideHttpClient } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  bootstrapApplication,
  platformBrowser,
} from '@angular/platform-browser';

//import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes)],
}).catch((err) => console.error(err));
