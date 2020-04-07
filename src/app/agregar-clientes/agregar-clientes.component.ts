import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajesService } from '../services/mensajes.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-agregar-clientes',
  templateUrl: './agregar-clientes.component.html',
  styleUrls: ['./agregar-clientes.component.scss']
})
export class AgregarClientesComponent implements OnInit {
  formularioClientes: FormGroup
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  constructor(private fb: FormBuilder,private storage: AngularFireStorage,private db: AngularFirestore,
    private msj:MensajesService,private rd:AngularFireDatabase) {
      this.itemRef = rd.object('Usuarios');
      this.item = this.itemRef.valueChanges();
     }
  porcentajeSubida:number =0
  arreglo: any = new Array<any>();
  correo: string
  a = new Object();
  ngOnInit() {
    
    this.formularioClientes=this.fb.group({
      Nombre: ['',Validators.required],
      Apellido: ['',Validators.required],
      Email: ['',Validators.compose([
        Validators.required,Validators.email
      ])],
      Facultad: ['',Validators.required],
      Iden: ['',Validators.required],
      Role: ['',Validators.required],
      Carrera: ['']
      
      
    })
  }
 
  
  agregar(){
    let Pin=Math.round(Math.random()*(1000-9999)+(9999));
    let correo: string=this.formularioClientes.value.Email
    let nombre: string=this.formularioClientes.value.Nombre
    let apellido: string=this.formularioClientes.value.Apellido
    let facultad: string=this.formularioClientes.value.Facultad
    let iden: string=this.formularioClientes.value.Iden
    let role: string=this.formularioClientes.value.Role
    let carrera: string=""
    let foto: string="xa"
    let pin : string="1234"
    //Agregar a Clientes
    this.db.collection("Clientes").doc(iden).set({
      Email: correo,
      Nid: iden,
      Pin: Pin
    }).then((resultado)=>{
      // console.log("Insertado en Clientes")
    });
    //Agregar a Realtime Database
    this.rd.object('/Usuarios/' + iden).update({
      Facultad:facultad,
      Perfil: role,
      clave:Pin,
      email:correo,
      foto:foto,
      name: nombre,
      uid:iden
    });
    //Agregar a Usuarios Firestore
     this.db.collection("Usuarios").doc(correo).set({
      Apellido: apellido,
      Email: correo,
      Facultad: facultad,
      Iden: iden,
      Nombre: nombre,
      Role: role,
      foto: foto,
  })
  .then((resultado)=>{
    this.msj.mensajecorrecto('Agregar','se Agrego Correctamente')
  }) 
  .catch((error)=>{
    this.msj.mensajeError('Error','Sucedio un Error')
  });
  
    
  }
  subirImagen(evento)
  {
    if(evento.target.files.length>0){
      let nombre=this.formularioClientes.value.Email
      let archivo = evento.target.files[0]
      let extension= archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'))
      let ruta ="Usuarios/"+nombre;
      const referencia= this.storage.ref(ruta)
      const tarea = referencia.put(archivo)
      tarea.then((objeto)=>{
        referencia.getDownloadURL().subscribe((uri)=>{
          //console.log(uri)
        })
      })
      tarea.percentageChanges().subscribe((porcentaje)=>{
        this.porcentajeSubida=parseInt(porcentaje.toString())
      })
  
    }

    }
   
}
