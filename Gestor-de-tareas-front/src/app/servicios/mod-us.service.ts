import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class ModUsService {

  message: string;
  user: any;

  constructor(private router: Router, private http: HttpClient, private loginService: LoginService) {
    this.user = {
      email: "",
      rol: ""
    }
    if (!loginService.isUserSignedIn()) {
      router.navigate(['/login']);
    }
    this.message = "";
  }

  /**
  * Petición de modificacion de usuario
  * */
  public Mod_user_pass = (password: any, newpassword: any) => {
    const url = environment.dirBack + "mod_user_pass";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });
    return this.http.put(url, { 'id': this.loginService.getUser().id, 'password': password, 'newpassword': newpassword }, { headers: headers });
  };

  public Mod_user = (email: any, nombre: any, apellidos: any) => {
    const url = environment.dirBack + "mod_user";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'id': this.loginService.getUser().id, 'email': email, 'nombre': nombre, 'apellidos': apellidos }, { headers: headers });
  };

  //Cambiar foto perfil
  public cambiarFoto = (img: File, id: any) => {
    const url = environment.dirBack + "cambiarFoto/" + id;
    const fd = new FormData;
    fd.append('img', img, img.name);
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, fd, { headers: headers });
  };
}
