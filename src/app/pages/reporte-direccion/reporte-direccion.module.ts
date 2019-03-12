import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/common/shared.module';
import { ReporteDireccionComponent } from './reporte-direccion.component';

@NgModule({
    imports: [
      SharedModule
    ],
    declarations: [
      ReporteDireccionComponent
  ]
  })
  export class ReporteDireccionModule { }
  