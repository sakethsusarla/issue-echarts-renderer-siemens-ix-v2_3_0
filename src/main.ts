import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { applyPolyfills, defineCustomElements } from '@siemens/ix-brand-theme/loader';

applyPolyfills().then(() => defineCustomElements());

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
