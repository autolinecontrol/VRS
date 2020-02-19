import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import 'firebase/database';

@Component({
  selector: 'app-rd',
  templateUrl: './rd.component.html',
  styleUrls: ['./rd.component.scss']
})
export class RdComponent implements OnInit {
  ngOnInit() {
  }
  
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  starCountRef:any
  constructor(db: AngularFireDatabase) {
    this.itemRef = db.object('Usuarios');
    let postId="dlcabezas2@gmail.com"
    // this.items = db.list('items').valueChanges();
    
    // this.starCountRef=starCountRef
    this.item = this.itemRef.valueChanges();
  }
  save(newName: string) {
    // this.starCoiuntRef.set({ name: newName });
  }
  update(newSize: string) {
    this.itemRef.update({ size: newSize });
  }
  delete() {
    this.itemRef.remove();
  }
}
  

