import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/common/shared.module';
import { AdministrarDocumentosComponent } from './administrar-documentos.component';
import { AprobarEscaneoComponent } from './aprobar-escaneo/aprobar-escaneo.component';
import { DocumentoPreviewComponent } from './documento-preview/documento-preview.component';
import { DocumentosListComponent } from './documentos-list/documentos-list.component';
import { EditarDocumentoComponent } from './editar-documento/editar-documento.component';
import { EscogerPlantillaDocumentoComponent } from './escoger-plantilla-documento/escoger-plantilla-documento.component';

@NgModule({
    imports: [
      SharedModule
    ],
    declarations: [
      AdministrarDocumentosComponent,
      AprobarEscaneoComponent,
      DocumentoPreviewComponent,
      DocumentosListComponent,
      EditarDocumentoComponent,
      EscogerPlantillaDocumentoComponent
  ]
  })
  export class AdministrarDocumentosModule { }
  