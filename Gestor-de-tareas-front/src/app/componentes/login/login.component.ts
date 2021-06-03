import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { environment } from 'src/environments/environment';
import { ModalAlertaComponent} from '../modal-alerta/modal-alerta.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  nuevoLogin: FormGroup;
  submitted = false;
  message: string;
  user: any;
  subs: any;
  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router, private modal: NgbModal) {
    this.nuevoLogin = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    });
    this.subs = false;
    this.message = "";
    this.user = {
      access_token: "",
      id: "",
      email: "",
      apellidos: "",
      nombre: "",
      foto: "",
      password: ""
    }
  }

  ngOnInit(): void {
    //Si ya hemos hecho login vamos a vista lista cursos
    if (this.loginService.isUserSignedIn()) {
      this.router.navigate(['/home']);
    }
  }

  get formulario() { return this.nuevoLogin.controls; }

  
  onSubmit() {
    this.submitted = true;
    if (this.nuevoLogin.invalid) {
      return;
    }
    let datosUsuario = this.nuevoLogin.value;
    const email = datosUsuario.email;
    const password = datosUsuario.password;
    this.onReset();
    //Nos subscribimos a la petición de login que se implementa en el servicio
    this.login(email, password);
  }

  login(email: string, password: string){
    console.log(email, password);
    this.loginService.login(email, password).subscribe(
      (response: any) => {
        //console.log(response.message);
        this.subs = true;
        this.message = "Login correcto";
        this.user.access_token = response['message']['access_token'];
        this.user.email = response.message.user.email;
        //Guardar datos usuario
        this.user.id = response.message.user.id;
        this.user.apellidos = response.message.user.apellidos;
        this.user.nombre = response.message.user.nombre;
        this.user.password = response.message.user.password;
        this.user.foto = environment.dirBack2 + "img/generico.jpg" ;
        //Comprobamos si tiene foto o no
        /* 
        if(response.message.datos_user.foto == 0){
        }else{
          this.user.foto = environment.dirBack2 + "IMG/" + this.user.dni + ".png";
        }
        */
        //Guardamos el usuario en session storage
        this.loginService.saveUser(this.user);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error.error.message);
        this.subs = false;
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = error.error.message;
        modalRef.componentInstance.exito = false;
      }
    );
  }

  showMessageTime(){
    this.message = "Loading ...";
    setTimeout(()=>{     
      if (!this.subs){
        //console.log('Ups. Parece que el servidor ha tardando demasiado.');
        this.message = "Ups. Parece que el servidor ha tardando demasiado.";
      }
    },5001);
    this.subs = false;
  }

  onReset() {
    this.submitted = false;
    this.nuevoLogin.reset();
  }

}
