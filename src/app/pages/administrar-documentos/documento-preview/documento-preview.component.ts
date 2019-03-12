import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '../../../../../node_modules/@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { DocumentosService } from '../../../_services/documentos.service';
import { DocumentoPanelGestionComponent } from './documento-panel-gestion/documento-panel-gestion.component';
import { DocumentoObservacionesListComponent } from './documento-observaciones-list/documento-observaciones-list.component';
import { DocumentoFlowComponent } from './documento-flow/documento-flow.component';
import { finalize } from 'rxjs/operators';
import { DocumentoDescargasComponent } from './documento-descargas/documento-descargas.component';

@Component({
  selector: 'app-documento-preview',
  templateUrl: './documento-preview.component.html',
  styleUrls: ['./documento-preview.component.scss']
})
export class DocumentoPreviewComponent implements OnInit {
  @Input() documentoId: any;
  @Input() documento: any;
  @ViewChild(DocumentoPanelGestionComponent) panelGestion: DocumentoPanelGestionComponent;
  @ViewChild(DocumentoObservacionesListComponent) observacionesList: DocumentoObservacionesListComponent;
  @ViewChild(DocumentoFlowComponent) docFlow: DocumentoFlowComponent;
  @ViewChild(DocumentoDescargasComponent) docDescargas: DocumentoDescargasComponent;
  isCallbacking = true;
  rootUrl: string;
  pdfUrl: SafeUrl;
  selectedTab = 0;
  puedoGestionarDocumento = false;

  constructor(private satinizer: DomSanitizer, private service: DocumentosService) {
    this.rootUrl = environment.rootUrl;
  }

  ngOnInit() {
    this.recargarDocumento();
  }

  recargarDocumento() {
    this.isCallbacking = true;
    this.service.getDocumento(this.documentoId)
    .pipe(finalize(() => this.isCallbacking = false))
    .subscribe(documento => {
      console.log(documento);
      this.documento = documento;
      const ahora = new Date();
      // tslint:disable-next-line:max-line-length
      this.pdfUrl = this.satinizer.bypassSecurityTrustResourceUrl(this.rootUrl + this.documento.rutaArchivoPdfFinal + '?x=' + ahora.getTime());
    });
    this.service.preguntarPorPermisoParaResponder(this.documentoId).subscribe(puedoResponder => {
      this.puedoGestionarDocumento = puedoResponder;
    });
    if (this.observacionesList) {
      this.observacionesList.getObservaciones();
    }
    if (this.docFlow) {
      this.docFlow.gerPasos();
    }
    if (this.docDescargas) {
      this.docDescargas.recargarDescargas();
    }
  }

}
