import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-agregar-clientes',
  templateUrl: './agregar-clientes.component.html',
  styleUrls: ['./agregar-clientes.component.scss']
})
export class AgregarClientesComponent implements OnInit {
  formularioClientes: FormGroup
  constructor(private fb: FormBuilder,private storage: AngularFireStorage,private db: AngularFirestore) { }
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
    
    let correo: string=this.formularioClientes.value.Email
    let nombre: string=this.formularioClientes.value.Nombre
    let apellido: string=this.formularioClientes.value.Apellido
    let facultad: string=this.formularioClientes.value.Facultad
    let iden: string=this.formularioClientes.value.Iden
    let role: string=this.formularioClientes.value.Role
    let carrera: string=this.formularioClientes.value.Carrera
    this.db.collection("Usuarios").doc(correo).set({
      Nombre: this.formularioClientes.value.Nombre,
      Apellido: apellido,
      Email: correo,
      Facultad: facultad,
      Iden: iden,
      Role: role,
      Carrera: carrera
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
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
          console.log(uri)
        })
      })
      tarea.percentageChanges().subscribe((porcentaje)=>{
        this.porcentajeSubida=parseInt(porcentaje.toString())
      })
  
    }

    }
   
}
