import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //Se utiliza para enviar un parametro al padre desde el hijo.
  //  se va a utilizar desde el metodo cancel()
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  //Al darle al botón registrar ocurre esto
  register() {
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  //Al darle al botón cancelar, se utiliza el EventEmmitter y emitimos false
  //  para cambiar el "registerMode" de "home.*.ts"
  cancel() {
    this.cancelRegister.emit(false)
  }
}
