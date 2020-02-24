import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }
  mensajeError(titulo: string,texto:string){
    Swal.fire(
      {
        title: titulo,
        text: texto,
        icon: 'error'
      }
    )
  }
  mensajecorrecto(titulo: string,texto:string){
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'success'
    })
  }
  mensajeEditar(){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Estas seguro de deshabilitar este usuaio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deshabilitado!',
          'Este usuario ha sido deshabilitado',
          'success'
        )
      }
    })
  }
}
