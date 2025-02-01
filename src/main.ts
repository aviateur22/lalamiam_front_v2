import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AuthService } from './app/module/auth/services/auth.service';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
