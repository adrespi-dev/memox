import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/common/shared.module';
import { CambiarDatosUsuarioComponent } from './cambiar-datos-usuario.component';

@NgModule({
    imports: [
      SharedModule
    ],
    declarations: [
      CambiarDatosUsuarioComponent
  ]
  })
  export class CambiarDatosUsaurioModule { }
  