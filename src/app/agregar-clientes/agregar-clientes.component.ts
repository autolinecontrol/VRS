import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-agregar-clientes',
  templateUrl: './agregar-clientes.component.html',
  styleUrls: ['./agregar-clientes.component.scss']
})
export class AgregarClientesComponent implements OnInit {
  formularioClientes: FormGroup
  constructor(private fb: FormBuilder) { }

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
}
