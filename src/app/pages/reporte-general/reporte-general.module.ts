import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/common/shared.module';
import { ReporteGeneralComponent } from './reporte-general.component';

@NgModule({
    imports: [
      SharedModule
    ],
    declarations: [
      ReporteGeneralComponent
  ]
  })
  export class ReporteGeneralModule { }
  