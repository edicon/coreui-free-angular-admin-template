import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { environment } from 'src/environments/environment';

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
    // AngularFireDatabaseModule,
    FirebaseUIModule,
  ],
  providers: [],
})
export class FbLoginComponent implements OnInit, OnDestroy {
  user: firebase.User | null = null;
  private authSubscription: Subscription | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private router: Router,
  ) {
    this.authSubscription = afAuth.authState.subscribe(
      this.afAuthChangeListener,
    );
  }

  ngOnInit(): void { }

  private afAuthChangeListener = (user: firebase.User | null) => {
    this.user = user;
    if (user) {
      if (!environment.production) {
        console.log('Logged in :)');
        this.testAuthDb();
      }
      // if needed, do a redirect in here
      this.router.navigateByUrl('/home/dashboard');
    } else {
      console.log('Logged out :(');
    }
  };

  testAuthDb(): void {
    const test$ = this.afDb.object('test');
    test$.valueChanges().subscribe((data) => {
      console.log('test data:', data);
    });
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
