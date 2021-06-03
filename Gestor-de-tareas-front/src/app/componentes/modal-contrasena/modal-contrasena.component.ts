import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ModUsService } from 'src/app/servicios/mod-us.service';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';
import { GestionTarjetasService } from '../../servicios/gestion-tarjetas.service';
import { CompartirDatosService } from '../../servicios/compartir-datos.service';

@Component({
  selector: 'app-modal-contrasena',
  templateUrl: './modal-contrasena.component.html',
  styleUrls: ['./modal-contrasena.component.scss']
})
export class ModalContrasenaComponent implements OnInit {
  @Output() storeOk: EventEmitter<any> = new EventEmitter();
  registroPass: FormGroup;
  newTarjeta: FormGroup;
  submitted = false;
  submittedFoto = false;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
    private router: Router,private mod_user: ModUsService, private modal: NgbModal, private GestionTableros: GestionTarjetasService,private CompartirDatosService:CompartirDatosService) {
    this.newTarjeta = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      dateinit: ['', [Validators.required]],
      datefin: ['', [Validators.required]],
      timeinit: ['', [Validators.required]],
      timefin: ['', [Validators.required]]
    });
    this.registroPass = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength]],
      newpassword: ['', [Validators.required, Validators.minLength]],
      renewpassword: ['', [Validators.required, Validators.minLength]]
    });
  }

  ngOnInit(): void {
  }

  get formulario2() { return this.registroPass.controls; }
  get formulario() { return this.newTarjeta.controls; }

  onSubminTablero(){
    let tablero=this.newTarjeta.value;
    console.log(tablero);
    this.GestionTableros.setTarjeta(tablero.nombre,tablero.descripcion,this.CompartirDatosService.getidColumna()).subscribe(
      (response: any) => {
        this.activeModal.close();
        this.storeOk.emit(true);
        console.log(response.message);
      },
      (error) => {
        console.log(error);
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Ha ocurrido un error al registrar la tarjeta';
        modalRef.componentInstance.exito = false;
      }
    );
  }
  onSubmitPass() {
    this.submitted = true;
    if (this.registroPass.touched) {
      if (this.registroPass.invalid || this.validarDistintasPass()) {
        return;
      }

      let datosPass = this.registroPass.value;

      if (datosPass.password === datosPass.newpassword) {
        return;
      }
      const oldpassword = datosPass.password;
      const newpassword = datosPass.newpassword;
      this.updatePass(oldpassword,newpassword);
     // const nombre=this.user.nombre + ' ' + this.user.apellidos;
      //this.envEmail(nombre,'tu contraseña ha sido modificada',this.user.email);
    }
    this.onReset();
  }
  updatePass( oldpassword: any, newpassword: any) {
    this.mod_user.Mod_user_pass( oldpassword, newpassword).subscribe(
      (response: any) => {
        //console.log(response);
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Contraseña actualizada correctamente';
        modalRef.componentInstance.exito = true;

      },
      (error) => {
        console.log(error.error.message);
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Ha ocurrido un cambiar la contraseña';
        modalRef.componentInstance.exito = false;
      }
    );
  }
  onReset() {
    this.submitted = false;
  }
  validarDistintasPass() {
    let salida = true;
    if (this.registroPass.get('newpassword')?.value === this.registroPass.get('renewpassword')?.value) {
      salida = false;
    }
    return salida;
  }
  cancelar() {
    this.activeModal.close();
  }
}
