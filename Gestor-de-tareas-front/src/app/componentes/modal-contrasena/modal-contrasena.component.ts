import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { LoginService } from '../../servicios/login.service';
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
  submitted = false;
  submittedFoto = false;
  @Input() user: any;

  constructor(private loginService: LoginService,public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
    private router: Router,private mod_user: ModUsService, private modal: NgbModal, private GestionTableros: GestionTarjetasService,private CompartirDatosService:CompartirDatosService) {
    this.registroPass = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength]],
      newpassword: ['', [Validators.required, Validators.minLength]],
      renewpassword: ['', [Validators.required, Validators.minLength]]
    });
    this.user = this.loginService.getUser();
  }

  ngOnInit(): void {
  }

  get formulario2() { return this.registroPass.controls; }

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
      //this.envEmail(nombre,'tu contraseña ha sido modificada',this.user.email);
    }
    this.onReset();
  }
  updatePass( oldpassword: any, newpassword: any) {
    this.mod_user.Mod_user_pass( oldpassword, newpassword).subscribe(
      (response: any) => {
        console.log(response);
        this.user=response.message.user;
        this.user.access_token = response['message']['access_token'];
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
