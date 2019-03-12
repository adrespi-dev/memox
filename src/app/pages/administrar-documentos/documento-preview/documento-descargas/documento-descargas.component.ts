import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../../common/services/http.service';
import { finalize } from '../../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-documento-descargas',
  templateUrl: './documento-descargas.component.html',
  styleUrls: ['./documento-descargas.component.scss']
})
export class DocumentoDescargasComponent implements OnInit {
  @Input() documentoId: number;
  descargas = [];
  isCallbacking = false;
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.recargarDescargas();
  }

  recargarDescargas() {
    this.isCallbacking = true;
    this.http.get('api/DescargasDocumentos/' + this.documentoId)
    .pipe(finalize(() => this.isCallbacking = false))
    .subscribe(descargas => {
      this.descargas = descargas as any[];
    });
  }

}
