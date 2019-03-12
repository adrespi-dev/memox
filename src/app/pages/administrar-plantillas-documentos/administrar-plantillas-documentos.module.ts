import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/common/shared.module';
import { AdministrarPlantillasDocumentosComponent } from './administrar-plantillas-documentos.component';
import { EditarPlantillaComponent } from './editar-plantilla/editar-plantilla.component';
import { EditarPlantillaPasosComponent } from './editar-plantilla-pasos/editar-plantilla-pasos.component';

@NgModule({
    imports: [
      SharedModule
    ],
    declarations: [
      AdministrarPlantillasDocumentosComponent,
      EditarPlantillaComponent,
      EditarPlantillaPasosComponent
  ]
  })
  export class AdministrarPlantillasDocumentosModule { }
  