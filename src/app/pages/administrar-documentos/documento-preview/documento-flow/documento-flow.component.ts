import { Component, OnInit, Input } from '@angular/core';
import { DocumentoPaso } from '../../../../_models/DocumentoPaso';
import { DocumentosService } from '../../../../_services/documentos.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-documento-flow',
  templateUrl: './documento-flow.component.html',
  styleUrls: ['./documento-flow.component.scss']
})
export class DocumentoFlowComponent implements OnInit {
  @Input() documentoId: number;
  pasos: DocumentoPaso[] = [];
  isCallbacking = true;
  constructor(private service: DocumentosService) { }

  ngOnInit() {
    this.gerPasos();
  }

  gerPasos() {
    this.isCallbacking = true;
    this.service.getPasosFromDocumento(this.documentoId)
    .pipe(finalize(() => { this.isCallbacking = false; }))
    .subscribe(pasos => {
      this.pasos = pasos;
    });
  }

}
