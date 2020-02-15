import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes: any = new Array<any>();
   constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection('Usuarios').valueChanges().subscribe((resultado)=>{
      this.clientes=resultado
     })
  }

}
