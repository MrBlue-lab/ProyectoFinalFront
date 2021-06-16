import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';
import { GestionTarjetasService } from '../../servicios/gestion-tarjetas.service';
import { CompartirDatosService } from '../../servicios/compartir-datos.service';
import { UsersService } from '../../servicios/users.service';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-modal-invitar-tablero',
  templateUrl: './modal-invitar-tablero.component.html',
  styleUrls: ['./modal-invitar-tablero.component.scss']
})
export class ModalInvitarTableroComponent implements OnInit {
  @Output() storeOk: EventEmitter<any> = new EventEmitter();
  newAmigo: FormGroup;
  @Input() @Output() searchText = '';
  characters:any = [];

  constructor(private loginService: LoginService,private UsersService:UsersService,public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
    private router: Router, private modal: NgbModal, private GestionTableros: GestionTarjetasService,private CompartirDatosService:CompartirDatosService) {
    this.newAmigo = this.formBuilder.group({
    });
  }

  ngOnInit(): void {
  }

  get formulario() { return this.newAmigo.controls; }

  onSubminUser(email:any){
    console.log(email);
    this.UsersService.addUserTablero(email,this.CompartirDatosService.getidTablero()).subscribe(
      (response: any) => {
        this.activeModal.close();
        this.storeOk.emit(true);
        console.log(response.message);
      },
      (error) => {
        console.log(error);
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Ha ocurrido un error al enviar la petición al usuario';
        modalRef.componentInstance.exito = false;
      }
    );
  }
  cancelar() {
    this.activeModal.close();
  }
  UsersSearch() {
    this.UsersService.getAllUsers().subscribe(
      (response: any) => {
        this.characters=response.message.users;
        console.log(this.characters);
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
