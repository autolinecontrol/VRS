import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/database';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { EnviarcorreosService } from '../services/enviarcorreos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rd',
  templateUrl: './rd.component.html',
  styleUrls: ['./rd.component.scss']
})
export class RdComponent implements OnInit {
  objeto:any
  postId:any
  ngOnInit() {
  }
  
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  
  algo={
    email:"",
    name:"",
    uid:""
  }
  starCountRef:any
  constructor(db: AngularFireDatabase,private auth: AngularFireAuth,private subir: AngularFireStorage,public  ec:EnviarcorreosService,public http: HttpClient) {
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
    let algo="David"
    this.algo.email="dlcabezas2@gmail.com"
    this.algo.name="David"
    this.algo.uid="1013672652"
    
    this.itemRef.update({ 1013672652 : this.algo  });
  }
  delete() {
    this.itemRef.remove();
  }
  storage(){
    let archivo="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"
    let ruta ="Usuarios/dlcabezas2@gmail.com";
    var metadata = {
      contentType: 'image/png',
    };
    const referencia= this.subir.ref(ruta)
    const tarea = referencia.putString(archivo,'base64',metadata)
  }
  // Realizar Pruebas para enviar correos por post
  correo(){
    let acceder
    let ejemplo=
    {
      email:"",
      name:"",
      uid:""
    }
    ejemplo.name="David"
    ejemplo.uid="1013672652"
    ejemplo.email="dlcabezas2@gmail.com"
    acceder=JSON.stringify(ejemplo)
    console.log(acceder)
    this.http.post<any>('http://localhost/ejemplo/enviarcorreos1.php',acceder).toPromise().then((data)=>{
      console.log (data)
    })
    
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
  

