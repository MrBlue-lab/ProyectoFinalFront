import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  message: string;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) {
    this.message = "";
    if (!loginService.isUserSignedIn()) {
      router.navigate(['/login']);
    }
   }
  public getUsersNotFriends = () => {
    const url = environment.dirBack + "getUsersNotFriends";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url,{'id' : this.loginService.getUser().id},{ headers: headers });
  };
  public getUsersAlmostFriends = () => {
    const url = environment.dirBack + "getUsersAlmostFriends";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url,{'id' : this.loginService.getUser().id},{ headers: headers });
  };
  public getUsersFriends = () => {
    const url = environment.dirBack + "getUsersFriends";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url,{'id' : this.loginService.getUser().id},{ headers: headers });
  };
  public getAllUsers = () => {
    const url = environment.dirBack + "getAllUsers";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url,{'id' : this.loginService.getUser().id},{ headers: headers });
  };
  public addAmigo = (email:any) => {
    const url = environment.dirBack + "putUserAmigo";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.put(url,{'email' : email,'id' : this.loginService.getUser().id},{ headers: headers });
  };
  public addUserTablero = (email:any, id:any) => {
    const url = environment.dirBack + "addUserTablero";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url,{'email' : email,'id_tablero' : id},{ headers: headers });
  };
  
}
