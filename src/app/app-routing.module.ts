import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AgregarClientesComponent } from './agregar-clientes/agregar-clientes.component';
import { RdComponent } from './rd/rd.component';
import { PendientesComponent } from './pendientes/pendientes.component';
import { BuscarfirestoreComponent } from './buscarfirestore/buscarfirestore.component';


const routes: Routes = [
  {
    path: 'listado-clientes', component: ListadoClientesComponent
  },
  {
    path: 'agregar-clientes', component: AgregarClientesComponent
  },
  {
    path: 'rd', component:RdComponent
  },
  {
    path: 'pendientes', component:PendientesComponent
  },
  {
    path: 'firestore', component:BuscarfirestoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
