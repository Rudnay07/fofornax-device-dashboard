import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { provideRouter } from '@angular/router'; 
import { routes } from './app/app.routes';      
import { providePrimeNG } from 'primeng/config'
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),    
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
    provideAnimations(),
    MessageService
  ]
}).catch(err => console.error(err));