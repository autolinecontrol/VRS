import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth,  User } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'VRS';
  usuario: User;
  cargando: boolean =  true;
  constructor(private auth: AngularFireAuth) {
  this.auth.user.subscribe((usuario) =>   {

    setTimeout(() => {
      this.cargando  = false;
      this.usuario = usuario;
    }, 2000);

  });
  }
  login() {
    this.auth.signInWithEmailAndPassword('dlcabezas2@gmail.com', 'firebase2020' );
  }
  logout() {
    this.auth.signOut();
  }
}
