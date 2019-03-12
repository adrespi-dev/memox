import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/common/shared.module';
import { AdministrarPerfilesComponent } from './administrar-perfiles.component';

@NgModule({
    imports: [
      SharedModule
    ],
    declarations: [
      AdministrarPerfilesComponent
  ]
  })
  export class AdministrarPerfilesModule { }
  