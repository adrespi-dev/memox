import { Injectable } from '@angular/core';
import { HttpService } from '../common/services/http.service';
import { Observable } from 'rxjs';
import { DocumentoObservacion, DiaObservaciones } from '../_models/documentoObservacion';
import { map } from 'rxjs/operators';
import { DocumentoPaso } from '../_models/DocumentoPaso';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor(private http: HttpService) {
  }

  getDocumento(id: number): Observable<any> {
    return this.http.get('api/Documento/ConsultaDetallada/' + id).pipe(
      map((rsp) => {
        return rsp as any;
      })
    );
  }

  preguntarPorPermisoParaResponder(id: number): Observable<boolean> {
    return this.http.get('api/Documentos/PuedoResponder/' + id).pipe(
      map((rsp) => {
        return rsp.permitido as boolean;
      })
    );
  }

  getObservacionesFromDocumento(id: number): Observable<DiaObservaciones[]> {
    return this.http.get('api/DocumentosObservaciones/' + id).pipe(
      map((rsp) => {
        const observaciones = rsp as DiaObservaciones[];
        observaciones.forEach(o => o.abierto = true );
        return observaciones;
      })
    );
  }

  getPasosFromDocumento(id: number): Observable<DocumentoPaso[]> {
    return this.http.get('api/DocumentosPasos/' + id).pipe(
      map((observaciones) => {
        return observaciones as DocumentoPaso[];
      })
    );
  }

}
