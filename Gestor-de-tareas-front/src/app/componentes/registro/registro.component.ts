import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/servicios/registro.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  nuevoRegistro: FormGroup;
  submitted = false;
  message: string;
  //salida = true;

  constructor(private registroService: RegistroService, private formBuilder: FormBuilder, private router: Router) {
    this.nuevoRegistro = this.formBuilder.group({
      nombre: ['', [Validators.required,Validators.pattern]],
      apellidos: ['', [Validators.required,Validators.pattern]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength]],
      password2: ['', [Validators.required,Validators.minLength]]
    });
    this.message = "";
  }
  ngOnInit(): void {
  }

  get formulario() { return this.nuevoRegistro.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.nuevoRegistro.invalid) {
      return;
    }
    let datosUsuario = this.nuevoRegistro.value;
    const nombre = datosUsuario.nombre;
    const apellidos = datosUsuario.apellidos;
    const email = datosUsuario.email;
    const password = datosUsuario.password;
    //Nos subscribimos a la petición de registro que se implementa en el servicio
    this.registroSuscription(nombre, apellidos, email, password);
    this.onReset();
    this.message = this.registroService.message;
  }

  onReset() {
    this.submitted = false;
    this.nuevoRegistro.reset();
  }

  /**
   * Subscripción a la petición de Registro, si todo es correcto, la almacena en session storage y
   * vamos a /home. Si se produce un error lo muestra
   * */
  public registroSuscription(nombre: string, apellidos: string, email: string, password: string) {
    this.registroService.Registro(nombre, apellidos, email, password).subscribe(
      (response: any) => {
        console.log(response.message);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  validarDistintasPass() {
    let salida =true;
    if(this.nuevoRegistro.get('password')?.value === this.nuevoRegistro.get('password2')?.value){
      salida = false;
    }
    return salida;
  }

}