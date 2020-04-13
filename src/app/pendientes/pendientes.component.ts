import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Usuarios } from '../models/clientes';
import { AngularFireStorage } from '@angular/fire/storage';
import { MensajesService } from '../services/mensajes.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.scss']
})
export class PendientesComponent implements OnInit {
  usuarios: Usuarios[] = new Array<Usuarios>()
  usuariosmostrar: Usuarios[] = new Array<Usuarios>()
  usuariord:Usuarios
  arreglo: any = new Array<any>();
  constructor(public http: HttpClient,public db: AngularFirestore,public storage: AngularFireStorage,public msj : MensajesService,public rd: AngularFireDatabase) { }
  
  ngOnInit() {}
  actualizar(){
    this.usuarios.length=0
    let algo:any
    this.db.collection('Usuarios',ref => ref.where('foto', '==', 'xa')).get().subscribe((resultado)=>{
      //this.usuarios.length=0;
      resultado.docs.forEach((item)=>{
      let usuario: any= item.data()
      let correo : any=usuario.email
      this.db.collection('Clientes',ref => ref.where('Email', '==', correo)).get().subscribe((traer)=>{
        traer.docs.forEach((dato)=>{
        let datos: any= dato.data()
        usuario.clave=datos.Pin
        })
      })
      usuario.id= item.id;
      const ref = this.storage.ref('Usuarios/'+usuario.uid+'.jpg');
      const algo=ref.getDownloadURL().subscribe((uri)=>{
      usuario.foto=uri
      usuario.db='fs'
      //console.log(uri)
    })

      //console.log(usuario)
      this.usuarios.push(usuario)
    })
    })
    var resultados=this.rd.list('/users', ref => ref.orderByChild('foto').equalTo('xa')).valueChanges()
    resultados.subscribe(queriedItems => {
      console.log(queriedItems);  
      queriedItems.forEach((item)=>{
      algo=item
      const ref = this.storage.ref('Usuarios/'+algo.uid+'.jpg');
      const referencia =ref.getDownloadURL().subscribe((uri)=>{
        algo.foto=uri
      })
      console.log(algo)
      algo.db='rd'
      this.usuarios.push(algo)
      })
    
    });
    }
    ver(usuario: Usuarios){
    this.usuariosmostrar.length=0
    //console.log(usuario)
    this.usuariosmostrar.push(usuario)
    }
    activar(usuario: Usuarios){
      //console.log(usuario)
    if(usuario.db='db'){
      let acceder
      let ejemplo=
      {
        email:"",
        name:"",
        uid:"",
        pin:""
      }
      ejemplo.email=usuario.email
      ejemplo.name=usuario.name
      ejemplo.uid=usuario.uid
      ejemplo.pin=usuario.clave
      acceder=JSON.stringify(ejemplo)
      let posicion=this.usuarios.indexOf(usuario)
      const itemRef = this.rd.object('users/'+usuario.uid);
      itemRef.update({ foto: 'si' }).then((resultado)=>{
        this.http.post<any>('http://localhost/correos/habilitar.php',acceder).toPromise().then((data)=>{
        console.log (data)
        })
        this.msj.mensajecorrecto('Activar','se Activo Correctamente y se ha enviado un correo')
        this.usuariosmostrar.length=0
        this.usuarios.splice(posicion,1)
      });
     }
    if(usuario.db=='fs'){
      let acceder
      let ejemplo=
      {
        email:"",
        name:"",
        uid:"",
        pin:""
      }
      ejemplo.email=usuario.email
      ejemplo.name=usuario.name
      ejemplo.uid=usuario.uid
      ejemplo.pin=usuario.clave
      acceder=JSON.stringify(ejemplo)
    let correo=usuario.email
    let posicion=this.usuarios.indexOf(usuario)
    //console.log(posicion)
    this.db.collection("Usuarios").doc(correo).update({
        foto:'si'
    }).then((resultado)=>{
      this.http.post<any>('http://localhost/correos/habilitar.php',acceder).toPromise().then((data)=>{
        console.log (data)
      })
      this.msj.mensajecorrecto('Activar','se Activo Correctamente')
      this.usuariosmostrar.length=0
      this.usuarios.splice(posicion,1)
    })
    }
    }
    desactivar(usuario: Usuarios){
      if(usuario.db='db'){
        let acceder
      let ejemplo=
      {
        email:"",
        name:"",
        uid:"",
        pin:""
      }
      ejemplo.email=usuario.email
      ejemplo.name=usuario.name
      ejemplo.uid=usuario.uid
      ejemplo.pin=usuario.clave
      acceder=JSON.stringify(ejemplo)
        let posicion=this.usuarios.indexOf(usuario)
        const itemRef = this.rd.object('users/'+usuario.uid);
        itemRef.update({ foto: 'no' }).then((resultado)=>{
          this.http.post<any>('http://localhost/correos/deshabilitar.php',acceder).toPromise().then((data)=>{
            console.log (data)
            })
          this.msj.mensajecorrecto('Desactivar','Se Desactivo Correctamente')
          this.usuariosmostrar.length=0
          this.usuarios.splice(posicion,1)
        });
       }
      if(usuario.db=='fs'){
        let acceder
        let ejemplo=
        {
          email:"",
          name:"",
          uid:"",
          pin:""
        }
        ejemplo.email=usuario.email
        ejemplo.name=usuario.name
        ejemplo.uid=usuario.uid
        ejemplo.pin=usuario.clave
      let correo=usuario.email
      let posicion=this.usuarios.indexOf(usuario)
      this.db.collection("Usuarios").doc(correo).update({
          foto:'no'
      }).then((resultado)=>{
        this.http.post<any>('http://localhost/correos/habilitar.php',acceder).toPromise().then((data)=>{
          console.log (data)
        })
        this.msj.mensajecorrecto('Desctivar','Se desactivo Correctamente')
        this.usuariosmostrar.length=0
      this.usuarios.splice(posicion,1)
      })
    }
  
      }
}


