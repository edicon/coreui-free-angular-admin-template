import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';

import firebase from 'firebase/compat/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {firebaseui, FirebaseUIModule} from 'firebaseui-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.component.html',
  styleUrls: ['./fb-login.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,

    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    // FirebaseUI
    FirebaseUIModule,
  ],
  providers: [],
})
export class FbLoginComponent {
  user: firebase.User | null = null;
  private authSubscription: Subscription | null = null;

  constructor(private afAuth: AngularFireAuth) {
    this.authSubscription = afAuth.authState.subscribe(this.afAuthChangeListener);
  }

  private afAuthChangeListener(user: firebase.User | null) {
    // if needed, do a redirect in here
    this.user = user;
    if (user) {
      console.log('Logged in :)');
    } else {
      console.log('Logged out :(');
    }
  }

  logout(): void {
    this.afAuth.signOut();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

