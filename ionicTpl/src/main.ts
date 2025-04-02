import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { enableProdMode, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { C8o, HttpXsrfInterceptor } from 'c8osdkangular';
import { C8oRouter } from 'c8ocaf';
/*c8o_PagesImport*/


if (environment.production) {
	enableProdMode();
}

/**
 * Customize the ngx-translate loader for assets/i18n
 */
export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
	providers: [/*Begin_c8o_NgProviders*/
		provideExperimentalZonelessChangeDetection(),
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		provideIonicAngular(),
		provideRouter(routes, withPreloading(PreloadAllModules)),
		importProvidersFrom(TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
           }
        })),
		provideHttpClient(),
		importProvidersFrom(
			ServiceWorkerModule.register('ngsw-worker.js', {
				enabled: /*=c8o_ServiceWorkerEnabled*/,
				// Register the ServiceWorker as soon as the app is stable
				// or after 30 seconds (whichever comes first).
				registrationStrategy: 'registerWhenStable:30000'
			  }),
		),
		StatusBar,
		SplashScreen,
		C8o,
		C8oRouter,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpXsrfInterceptor,
			multi: true
		},
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	/*End_c8o_NgProviders*/]
});
