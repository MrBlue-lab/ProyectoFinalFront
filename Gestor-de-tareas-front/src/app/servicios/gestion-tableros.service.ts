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
export class GestionTablerosService {
  message: string;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService,) {
    this.message = "";
    if (!loginService.isUserSignedIn()) {
      router.navigate(['/login']);
    }
   }

   public updateTableroNombre = (id: any, nombre: any) => {
    const url = environment.dirBack + "updateTableroNombre";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'id': id, 'nombre': nombre}, { headers: headers });
  };

   public getTablero = (id: any) => {
    const url = environment.dirBack + "getTablero";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url,{'id_Creador' : this.loginService.getUser().id, 'id': id},{ headers: headers });
  };
  public getTableros = () => {
    const url = environment.dirBack + "getTableros";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url,{'id_Creador' : this.loginService.getUser().id},{ headers: headers });
  };
  public setTableros = (nombre : any, tipo : any, descripcion : any) => {
    const url = environment.dirBack + "setTableros";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url,{'id_Creador' : this.loginService.getUser().id,'nombre' : nombre, 'tipo' : tipo, 'descripcion' : descripcion},{ headers: headers });
  };
  
  public updateTableros = (codigo : any, cif : any, nombre : any, provincia : any, localidad : any, cp : any, calle : any, email : any, tlf : any) => {
    const url = environment.dirBack + "updateTableros";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url,{'codigo' : codigo, 'cif' : cif, 'nombre' : nombre, 'provincia' : provincia, 'localidad' : localidad, 'cp' : cp, 'calle' : calle, 'email' : email, 'tlf' : tlf},{ headers: headers });
  };

  public dropTablero = (id : any) => {
    const url = environment.dirBack + "dropTablero";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url,{'id_Creador' : this.loginService.getUser().id,'id' : id},{ headers: headers });
  };
}
