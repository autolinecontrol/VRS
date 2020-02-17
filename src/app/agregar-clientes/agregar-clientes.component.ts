import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';


@Component({
  selector: 'app-agregar-clientes',
  templateUrl: './agregar-clientes.component.html',
  styleUrls: ['./agregar-clientes.component.scss']
})
export class AgregarClientesComponent implements OnInit {
  formularioClientes: FormGroup
  constructor(private fb: FormBuilder,private storage: AngularFireStorage) { }

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
      img: ['',Validators.required],
      Carrera: ['']
    })
  }
  agregar(){
    console.log(this.formularioClientes.value)
  }
  subirImagen(evento)
  {
    let archivo = evento.target.files[0]
    let ruta ="Usuarios/imagen1.png";
    const referencia= this.storage.ref(ruta)
    const tarea = referencia.put(archivo)
    tarea.then((objeto)=>{
      console.log('imagen subida')
    })

  }
}
