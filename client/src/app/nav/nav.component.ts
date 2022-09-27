import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(public accountService: AccountService, private router: Router, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      //Para moverse por la pagina, al iniciar sesion nos lleva a members
      this.router.navigateByUrl('/members');
    }, error => {
      console.log(error);
      //Mensaje en pantalla (se utiliza "error.error" para mostrar el string)
      this.toastr.error(error.error);
    })
  }

  logout() {
    this.accountService.logout();
    //Al cerrar sesion nos lleva a la Main Page
    this.router.navigateByUrl('/');
  }

}
