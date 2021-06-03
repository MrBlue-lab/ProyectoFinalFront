import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

//COMPONENTES
import { MenuComponent } from './componentes/menu/menu.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { TablerosComponent } from './componentes/tableros/tableros.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { HelpComponent } from './componentes/help/help.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { ModalCrearTableroComponent } from './componentes/modal-crear-tablero/modal-crear-tablero.component';
import { ModalAlertaComponent } from './componentes/modal-alerta/modal-alerta.component';
import { ListaComponent } from './componentes/lista/lista.component';
import { ModalAddTarjetaComponent } from './componentes/modal-add-tarjeta/modal-add-tarjeta.component';
import { ModalAddColumnaComponent } from './componentes/modal-add-columna/modal-add-columna.component';
import { Tablerov2Component } from './componentes/tablerov2/tablerov2.component';
import { ModalTarjetaComponent } from './componentes/modal-tarjeta/modal-tarjeta.component';
import { ModalColumnaComponent } from './componentes/modal-columna/modal-columna.component';
import { ModalTableroComponent } from './componentes/modal-tablero/modal-tablero.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ErrorComponent } from './componentes/error/error.component';
import { InfoComponent } from './componentes/info/info.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { BannerComponent } from './componentes/banner/banner.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ModalContrasenaComponent } from './componentes/modal-contrasena/modal-contrasena.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    RegistroComponent,
    HomeComponent,
    TablerosComponent,
    CalendarioComponent,
    ChatComponent,
    HelpComponent,
    TableroComponent,
    ModalCrearTableroComponent,
    ModalAlertaComponent,
    ListaComponent,
    ModalAddTarjetaComponent,
    ModalAddColumnaComponent,
    Tablerov2Component,
    ModalTarjetaComponent,
    ModalColumnaComponent,
    ModalTableroComponent,
    ErrorComponent,
    InfoComponent,
    FooterComponent,
    BannerComponent,
    PerfilComponent,
    ModalContrasenaComponent,
  ],
  imports: [
    DragDropModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
