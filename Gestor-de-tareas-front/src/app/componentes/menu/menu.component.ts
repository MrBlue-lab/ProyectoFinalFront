import { Component, OnInit, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { UsersService } from '../../servicios/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';
import { ModalAmigosComponent } from '../modal-amigos/modal-amigos.component';
import { FiltroPipe } from '../../pipes/filtro.pipe';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() user: any;
  constructor(private UsersService:UsersService, private loginService: LoginService,private router: Router,private modal: NgbModal) {
    this.user = this.loginService.getUser();
    console.log(this.user);
  }
  friends:any = [];
  almostfriends:any = [];


  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.UsersSearch();
    console.log(this.friends);
  }
  
  //Cerrar sesión
  logOut(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  modalAmigo(): void {
    const modalRef = this.modal.open(ModalAmigosComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = 'Ha ocurrido un error';
    modalRef.componentInstance.exito = false;
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {});
  }
  UsersSearch() {
    this.UsersService.getUsersFriends().subscribe(
      (response: any) => {
        this.friends=response.message.users;
        console.log(this.friends);
      },
      (error) => {
        console.log(error.error.message);
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Ha ocurrido un error al actualizar los datos';
        modalRef.componentInstance.exito = false;
      }
    );
    this.UsersService.getUsersAlmostFriends().subscribe(
      (response: any) => {
        this.almostfriends=response.message.users;
        console.log(this.almostfriends);
      },
      (error) => {
        console.log(error.error.message);
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Ha ocurrido un error al actualizar los datos';
        modalRef.componentInstance.exito = false;
      }
    );
  }
}
