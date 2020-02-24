import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }
  mensajeError(){
    Swal.fire(
      {
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      }
    )
  }
  mensajeAgregado(){
    Swal.fire({
      title: 'Agregado Correctamente',
      text: 'Se agrego correctamente',
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
