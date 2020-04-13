import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AgregarClientesComponent } from './agregar-clientes/agregar-clientes.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RdComponent } from './rd/rd.component';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { MensajesService } from './services/mensajes.service';
import { PendientesComponent } from './pendientes/pendientes.component';
import { EnviarcorreosService } from './services/enviarcorreos.service';
import { BuscarfirestoreComponent } from './buscarfirestore/buscarfirestore.component';
import { HttpClientModule } from '@angular/common/http'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncabezadoComponent,
    ListadoClientesComponent,
    AgregarClientesComponent,
    RdComponent,
    PendientesComponent,
    BuscarfirestoreComponent,
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AngularFireModule.initializeApp(environment["firebase"]),
    AngularFirestoreModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    ProgressbarModule.forRoot(),
    AngularFireStorageModule,
    
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    MensajesService,
    EnviarcorreosService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
