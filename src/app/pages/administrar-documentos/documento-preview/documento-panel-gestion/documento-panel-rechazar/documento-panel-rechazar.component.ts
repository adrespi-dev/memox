import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DxValidationGroupComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { HttpService } from '../../../../../common/services/http.service';

@Component({
  selector: 'app-documento-panel-rechazar',
  templateUrl: './documento-panel-rechazar.component.html',
  styleUrls: ['./documento-panel-rechazar.component.scss']
})
export class DocumentoPanelRechazarComponent implements OnInit {
  observaciones: string[] = [];
  @Input() documento: any = {};
  @Output() clickBack = new EventEmitter();
  @Output() documentoRechazado = new EventEmitter();
  nuevaObservacion: string;
  isCallbacking = false;

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  agregarObservacion(valGrp: DxValidationGroupComponent) {
    if (valGrp.instance.validate().isValid) {
      this.observaciones.push(this.nuevaObservacion);
      this.nuevaObservacion = '';
    } else {
      notify('Porfavor, ingrese una observación', 'error');
    }
  }

  eliminarObservacion(observacion: string) {
    const index = this.observaciones.indexOf(observacion);
    this.observaciones.splice(index, 1);
  }

  grabarRechazo() {
    if (this.observaciones.length > 0) {
      this.isCallbacking = true;
      const request = {
        documentoId: this.documento.id,
        observaciones: this.observaciones
      };
      this.http.post('api/Documentos/RechazarDocumento', request)
      .subscribe(rsp => {
        notify('Rechazo grabado correctamente', 'success');
        this.documentoRechazado.emit();
      }, err => {
        this.isCallbacking = false;
        notify(err, 'error');
      });
    } else {
      notify('Porfavor, ingrese al menos una observación', 'error', 2000);
    }
  }

}
