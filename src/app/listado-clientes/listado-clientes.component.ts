import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Usuarios } from '../models/clientes';
import { MensajesService } from '../services/mensajes.service';
import { error } from 'util';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes: any = new Array<any>();
  usuarios: Usuarios[] = new Array<Usuarios>()
  arreglo: any = new Array<any>();
   constructor(private db: AngularFirestore,private storage: AngularFireStorage,private msj : MensajesService) { }

  ngOnInit() {
    this.db.collection('Usuarios').get().subscribe((resultado)=>{
      this.usuarios.length=0;
      resultado.docs.forEach((item)=>{
        let usuario: any= item.data()
        usuario.id= item.id;
        usuario.visible=false;
        const ref = this.storage.ref('Usuarios/'+usuario.id);
        const algo=ref.getDownloadURL().subscribe((uri)=>{
        this.arreglo[usuario.id]=uri
              },error=>{
              console.log(error)
              })
            
        this.usuarios.push(usuario)
      })
    })
    }
    buscarUsuario(nombre: string){
      this.usuarios.forEach((usuario)=>{
        if(usuario.Nombre.toLowerCase().includes(nombre.toLowerCase())){
          usuario.visible=true;
        }
        else{
          usuario.visible=false
        }
      })
    }
    Activar(objeto: any)
    {
      let correo=objeto.Email
      let posicion=this.usuarios.indexOf(objeto)
      this.db.collection("Usuarios").doc(correo).update({
      Carrera:'Habilitado'
      }).then((resultado)=>{
        this.msj.mensajecorrecto('Activar','se Activo Correctamente')
        objeto.Carrera='Habilitado'
        this.usuarios[posicion] = objeto;
      })
    }
    Desactivar(objeto: any)
    {
      let correo=objeto.Email
      let posicion=this.usuarios.indexOf(objeto)
      this.db.collection("Usuarios").doc(correo).update({
      Carrera:'Deshabilitado'
      }).then((resultado)=>{
        this.msj.mensajecorrecto('Desactivar','Se desactivo Correctamente')
        objeto.Carrera='Deshabilitado'
        this.usuarios[posicion] = objeto;
      })
    }
  }
  

