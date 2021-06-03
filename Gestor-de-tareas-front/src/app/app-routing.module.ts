import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { TablerosComponent } from './componentes/tableros/tableros.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { HelpComponent } from './componentes/help/help.component';
import { ListaComponent } from './componentes/lista/lista.component';
import { Tablerov2Component } from './componentes/tablerov2/tablerov2.component';
import { ErrorComponent } from './componentes/error/error.component';
import { InfoComponent } from './componentes/info/info.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';

const routes: Routes = [
  {path: 'info', component: InfoComponent},
  {path: 'calendario', component: CalendarioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'home', component: HomeComponent},
  {path: 'lista', component: ListaComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'tableros', component: TablerosComponent},
  {path: 'tablero', component: Tablerov2Component},
  {path: 'tablerov2', component: TableroComponent},
  {path: 'calendario', component: CalendarioComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'help', component: HelpComponent},
  {path: '**',pathMatch:'full', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
