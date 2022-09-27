import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  //Mostrar o no el formulario de registro
  registerToggle() {
    this.registerMode = !this.registerMode
  }

  //Metodo de cuando pulsas "cancel" en el form de registro
  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
