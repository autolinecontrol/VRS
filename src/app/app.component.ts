import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth,  User } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

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
  
      this.cargando  = false;
      this.usuario = usuario;
 

  });
  }
  
}
