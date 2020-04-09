import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Usuarios } from '../models/clientes';
import { AngularFireStorage } from '@angular/fire/storage';
import { MensajesService } from '../services/mensajes.service';
@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit {
  usuarios: Usuarios[] = new Array<Usuarios>()
  usuariosmostrar: Usuarios[] = new Array<Usuarios>()
  arreglo: any = new Array<any>();
  constructor(public db: AngularFirestore,public storage: AngularFireStorage,public msj : MensajesService) { }
  
  ngOnInit() {}
  actualizar(){
    this.db.collection('Usuarios',ref => ref.where('foto', '==', 'xa')).get().subscribe((resultado)=>{
      this.usuarios.length=0;
      resultado.docs.forEach((item)=>{
      let usuario: any= item.data()
      usuario.id= item.id;

      const ref = this.storage.ref('Usuarios/'+usuario.Iden+'.jpg');
      const algo=ref.getDownloadURL().subscribe((uri)=>{
      usuario.foto=uri
      console.log(uri)})
      console.log(usuario)
      this.usuarios.push(usuario)
    })
    })
    }
    ver(usuario: Usuarios){
    this.usuariosmostrar.length=0
    console.log(usuario)
    this.usuariosmostrar.push(usuario)
    }
    activar(usuario: Usuarios){
    let correo=usuario.Email
    let posicion=this.usuarios.indexOf(usuario)
    console.log(posicion)
    
    this.db.collection("Usuarios").doc(correo).update({
        foto:'si'
    }).then((resultado)=>{
      this.msj.mensajecorrecto('Activar','se Activo Correctamente')
      this.usuariosmostrar.length=0
      this.usuarios.splice(posicion,1)
    })
    
    }
    desactivar(usuario: Usuarios){
      let correo=usuario.Email
      let posicion=this.usuarios.indexOf(usuario)
      this.db.collection("Usuarios").doc(correo).update({
          foto:'no'
      }).then((resultado)=>{
        this.msj.mensajecorrecto('Desctivar','se desactivo Correctamente')
        this.usuariosmostrar.length=0
      this.usuarios.splice(posicion,1)
      })
  
      }
}


