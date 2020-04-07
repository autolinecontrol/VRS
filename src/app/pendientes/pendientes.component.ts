import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Usuarios } from '../models/clientes';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit {
  usuarios: Usuarios[] = new Array<Usuarios>()
  arreglo: any = new Array<any>();
  constructor(public db: AngularFirestore,public storage: AngularFireStorage) { }
  
  ngOnInit() {}
  actualizar(){
    this.db.collection('Usuarios',ref => ref.where('foto', '==', 'xa')).get().subscribe((resultado)=>{
      this.usuarios.length=0;
      resultado.docs.forEach((item)=>{
      let usuario: any= item.data()
      usuario.id= item.id;
      const ref = this.storage.ref('Usuarios/'+usuario.id);
      const algo=ref.getDownloadURL().subscribe((uri)=>{
      this.arreglo[usuario.id]=uri
      console.log(uri)})
      console.log(usuario)
      this.usuarios.push(usuario)
    })
    })
    }
    ver(){
      
    }
}


