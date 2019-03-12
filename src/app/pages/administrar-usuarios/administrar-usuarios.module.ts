import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/common/shared.module';
import { AdministrarUsuariosComponent } from './administrar-usuarios.component';

@NgModule({
    imports: [
      SharedModule
    ],
    declarations: [
      AdministrarUsuariosComponent
  ]
  })
  export class AdministrarUsuariosModule { }
  