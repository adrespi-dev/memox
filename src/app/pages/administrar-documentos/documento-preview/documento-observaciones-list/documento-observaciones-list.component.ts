import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentoObservacion, DiaObservaciones } from '../../../../_models/DocumentoObservacion';
import { DocumentosService } from '../../../../_services/documentos.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-documento-observaciones-list',
  templateUrl: './documento-observaciones-list.component.html',
  styleUrls: ['./documento-observaciones-list.component.scss']
})
export class DocumentoObservacionesListComponent implements OnInit {
  @Input() documentoId: number;
  @Input() isEditable = false;
  @Output() valueChange = new EventEmitter<any[]>();
  dias: DiaObservaciones[] = [];
  isCallbacking = true;
  constructor(private service: DocumentosService) { }

  ngOnInit() {
    this.getObservaciones();
  }

  getObservaciones() {
    this.isCallbacking = true;
    this.service.getObservacionesFromDocumento(this.documentoId)
    .pipe(finalize(() => { this.isCallbacking = false; }))
    .subscribe(dias => {
      this.dias = dias;
    });
  }

  onRespuestaChange() {
    if (this.isEditable) {
      const observaciones: {observacionId: number, respuesta: string}[] = [];
      this.dias.forEach(x => {
        x.observaciones.forEach(o => {
          observaciones.push({ observacionId: o.id, respuesta: o.respuesta});
        });
      });
      this.valueChange.emit(observaciones);
    }
  }

}
