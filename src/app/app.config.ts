import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';

import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireModule} from '@angular/fire/compat';
import {FormsModule} from '@angular/forms';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import { environment } from '../environments/environment';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: ['public_profile', 'email', 'user_likes', 'user_friends'],
      customParameters: {
        auth_type: 'reauthenticate',
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation(),
    ),
    importProvidersFrom(SidebarModule, DropdownModule,
      BrowserModule,
      FormsModule,
      // AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      FirebaseUIModule.forRoot(firebaseUiAuthConfig)
    ),
    IconSetService,
    provideAnimations(),
  ],
};
