import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrarDireccionesComponent } from './administrar-direcciones.component';
import { SharedModule } from 'src/app/common/shared.module';

@NgModule({
    imports: [
      SharedModule
    ],
    declarations: [
      AdministrarDireccionesComponent
  ]
  })
  export class AdministrarDireccionesModule { }
  