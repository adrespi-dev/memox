import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/common/shared.module';
import { SeriesComponent } from './series.component';

@NgModule({
    imports: [
      SharedModule
    ],
    declarations: [
      SeriesComponent
  ]
  })
  export class SeriesModule { }
  