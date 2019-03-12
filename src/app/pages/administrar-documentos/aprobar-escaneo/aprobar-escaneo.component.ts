import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { HttpService } from '../../../common/services/http.service';
import { finalize } from '../../../../../node_modules/rxjs/operators';
import { SafeUrl, DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { DxValidationGroupComponent } from '../../../../../node_modules/devextreme-angular';
import notify from '../../../../../node_modules/devextreme/ui/notify';

@Component({
  selector: 'app-aprobar-escaneo',
  templateUrl: './aprobar-escaneo.component.html',
  styleUrls: ['./aprobar-escaneo.component.scss']
})
export class AprobarEscaneoComponent implements OnInit {
  documentoId: number;
  observacion: string;
  gestionTerminada = false;
  isCallbaking = true;
  isCallbakingPopup = false;
  showDoc = false;
  documento: any;
  pdfSinFirmarUrl: SafeUrl;
  pdfFirmadoUrl: SafeUrl;
  ahora = new Date();
  showPopup = false;
  tipoGestion: 1 | 2 = 1; // 1 es aprobar y 2 es rechazar
  constructor(private route: ActivatedRoute, private http: HttpService, private satinizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.documentoId = +params['id'];
      this.recargarDocumento();
    });
  }

  recargarDocumento() {
    this.isCallbaking = true;
    this.http.get('api/Documento/ConsultaDetallada/' + this.documentoId)
    .pipe(finalize(() => this.isCallbaking = false))
    .subscribe(doc => {
      this.documento = doc;
      const urlLeft = environment.rootUrl + this.documento.rutaArchivoPdfFinal + '?x=' + this.ahora.getTime();
      this.pdfSinFirmarUrl =
        this.satinizer.bypassSecurityTrustResourceUrl(urlLeft);
      const urlRight = environment.rootUrl + this.documento.rutaArchivoPdfFirmado + '?x=' + this.ahora.getTime();
      this.pdfFirmadoUrl =
        this.satinizer.bypassSecurityTrustResourceUrl(urlRight);
    });
  }

  onClickGestion(tipo: 1 | 2) {
    this.showPopup = true;
    this.tipoGestion = tipo;
  }

  gestionar(valGrp: DxValidationGroupComponent) {
    if (valGrp.instance.validate().isValid) {
      this.isCallbakingPopup = true;
      this.http.post('api/documentos/GestionarEscaneo', {
        tipoGestion: this.tipoGestion,
        docId: this.documentoId,
        observacion: this.observacion
      })
      .pipe(finalize(() => this.isCallbakingPopup = false))
      .subscribe(rsp => {
        const accion = (this.tipoGestion === 1) ? 'aprobado' : 'rechazado';
        notify(`Documento ${accion} correctamente.`, 'success');
        this.gestionTerminada = true;
        this.showPopup = false;
      }, err => {
        notify(err, 'error');
      });
    }
  }

  onHidden() {
    if (this.gestionTerminada === true) {
      this.showDoc = true;
    }
  }

}
