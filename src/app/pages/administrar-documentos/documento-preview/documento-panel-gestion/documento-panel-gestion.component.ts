import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { Router } from '../../../../../../node_modules/@angular/router';
import { HttpService } from '../../../../common/services/http.service';
import notify from 'devextreme/ui/notify';
import { finalize } from '../../../../../../node_modules/rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-documento-panel-gestion',
  templateUrl: './documento-panel-gestion.component.html',
  styleUrls: ['./documento-panel-gestion.component.scss']
})
export class DocumentoPanelGestionComponent implements OnInit {
  @Input() documento: any = {};
  @Output() accionTerminada = new EventEmitter();
  observacionAprobacion: string;
  accionId = 0;
  isCallbackingPopupDocOriginal = false;
  showPopoverSinFirmar = false;
  showPopupDescargarOriginal = false;

  observacionDocSinFirma: string;

  observacionDocFirma: string;
  contraseniaDocFirma: string;
  /*
    1 presentar rechazo
    2 presentar aprobacion
    3 presentar subir escaneo
    4 presentar aprobar escaneo
  */
  constructor(private router: Router, private http: HttpService) { }

  ngOnInit() {
  }

  goToEditDocumento() {
    this.router.navigate(['/pages/editar-documento'], { queryParams: { esNuevo: false, documentoId: this.documento.id } });
  }

  aprobarDocumento(valGrp: DxValidationGroupComponent) {
    if (valGrp.instance.validate().isValid) {
      this.http.post('api/Documentos/AprobarDocumento/' + this.documento.id, {observacion: this.observacionAprobacion}).subscribe(rsp => {
        notify('Se ha aprobado el documento correctamente', 'success');
        this.accionTerminada.emit();
        this.accionId = 0;
      }, err => {
        notify(err, 'error');
      });
    }
  }

  descargarArchivo(tipoDescarga: number) {
    let solicitud: any = {};
    if (tipoDescarga === 1) {
      solicitud = {
        tipoDescarga: tipoDescarga,
        observacion: this.observacionDocSinFirma
      };
    } else {
      solicitud = {
        tipoDescarga: tipoDescarga,
        observacion: this.observacionDocFirma,
        contrasenia: this.contraseniaDocFirma
      };
    }
    this.isCallbackingPopupDocOriginal = true;
    this.http.post('api/DescargasDocumentos/SolicitarDescarga/' + this.documento.id, solicitud)
    .pipe(finalize(() => this.isCallbackingPopupDocOriginal = false))
    .subscribe(rsp => {
      const llave = rsp['llaveSecreta'];
      const url = environment.rootUrl + 'api/DescargasDocumentos/Descargar?k=' + llave;
      const newWindow = window.open(url);
      this.accionTerminada.emit();
      this.showPopoverSinFirmar = false;
      this.showPopupDescargarOriginal = false;
      this.observacionDocSinFirma = '';
    }, err => {
      notify(err, 'error');
    });
  }

}
