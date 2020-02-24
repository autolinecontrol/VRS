import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/database';

@Component({
  selector: 'app-rd',
  templateUrl: './rd.component.html',
  styleUrls: ['./rd.component.scss']
})
export class RdComponent implements OnInit {
  ngOnInit() {
  }
  
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  starCountRef:any
  constructor(db: AngularFireDatabase,private auth: AngularFireAuth) {
    this.itemRef = db.object('Usuarios');
    let postId="dlcabezas2@gmail.com"
    // this.items = db.list('items').valueChanges();
    
    // this.starCountRef=starCountRef
    this.item = this.itemRef.valueChanges();
  }
  save(newName: string) {
    // this.starCoiuntRef.set({ name: newName });
  }
  update(newSize: string) {
    this.itemRef.update({ size: newSize });
  }
  delete() {
    this.itemRef.remove();
  }
  prueba(){
    let email="dlcabezas@gmail.com";
    let password="Acceso2020*"
    this.auth.createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});
  }
}
  

