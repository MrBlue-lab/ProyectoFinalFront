import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() user: any;
  constructor(private loginService: LoginService,private router: Router,private modal: NgbModal,) {
    this.user = this.loginService.getUser();
    console.log(this.user);
    this.user.foto="../../../assets/img/leaves.svg";
  }


  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.user.foto="../../../assets/img/leaves.svg";
  }
  
  //Cerrar sesión
  logOut(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
