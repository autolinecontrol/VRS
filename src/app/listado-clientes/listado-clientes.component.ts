import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes: any = new Array<any>();
  arreglo: any = new Array<any>();
   constructor(private db: AngularFirestore,private storage: AngularFireStorage) { }

  ngOnInit() {
    // this.db.collection('Usuarios').valueChanges().subscribe((resultado)=>{
    //   this.clientes=resultado
    //  })
    this.clientes.lenght=0
    
    this.db.collection('Usuarios').get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        let cliente = item.data();
        cliente.id=item.id;
        cliente.ref=item.ref;
        const ref = this.storage.ref('Usuarios/'+cliente.id);
        ref.getDownloadURL().subscribe((uri)=>{
           this.arreglo[cliente.id]=uri
         })
        this.clientes.push(cliente);

      })
    })
  }

}
