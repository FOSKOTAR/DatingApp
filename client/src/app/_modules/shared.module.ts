import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),   
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  //A la hora de exportar no es necesario volver a incluir la informacion de cada modulo
  exports: [
    BsDropdownModule,
    ToastrModule
  ]
})
export class SharedModule { }
