import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../common/services/http.service';
import { finalize } from '../../../../node_modules/rxjs/operators';
import { DocumentoForList } from '../../_models/DocumentoForList';
import { DocumentTab } from '../../_models/document-tab';
import { QueryDoc } from '../../_models/query-doc';

@Component({
  selector: 'app-administrar-documentos',
  templateUrl: './administrar-documentos.component.html',
  styleUrls: ['./administrar-documentos.component.scss']
})
export class AdministrarDocumentosComponent implements OnInit {
  isCallbacking = true;
  isCallbackingPendientes = true;
  documentos: DocumentoForList[] = [];
  documentosPendientes = [];
  documentoSeleccionado: any;
  selectedTab = 0;
  tabs: DocumentTab[] = [];
  showFilters = true;
  query = new QueryDoc();
  seriesDS: any[] = [];
  estadosDS: any[] = [];
  direccionesDS: any[] = [];
  direccionesTodasDS: any[] = [];
  usuariosDS: any[] = [];
  usuariosTodosDS: any[] = [];

  constructor(private http: HttpService) {
    this.recargarDocumentos();
  }

  ngOnInit() {
    this.recargarSeries();
    this.recargarEstados();
    this.recargarDirecciones();
    this.recargarUsuarios();
  }

  recargarDocumentos() {
    this.isCallbacking = true;
    this.http.get('api/Documento', this.query)
    .pipe(finalize(() => { this.isCallbacking = false; }))
    .subscribe(documentos => {
      this.documentos = documentos as any[];
    });
  }

  onDocumentClick(documento: DocumentoForList) {
    const newTab = {
      id: documento.id,
      codigo: documento.codigo
    };
    const tab = this.tabs.find(x => x.id === documento.id);
    if (tab) {
      const index = this.tabs.indexOf(tab);
      this.selectedTab = index + 1;
    } else {
      this.tabs.push(newTab);
      const index = this.tabs.indexOf(newTab);
      this.selectedTab = index + 1;
    }
  }

  cerrarTab(tab: DocumentTab) {
    const index = this.tabs.indexOf(tab);
    this.tabs.splice(index, 1);
  }

  recargarEstados() {
    this.http.get('api/DocEstados')
    .subscribe(estados => {
      this.estadosDS = estados;
    });
  }

  recargarSeries() {
    this.http.get('api/Series')
    .subscribe(series => {
      this.seriesDS = series;
    });
  }

  recargarDirecciones() {
    this.http.get('api/Direcciones')
    .subscribe(direcciones => {
      this.direccionesDS = direcciones;
    });

    this.http.get('api/Direcciones?ShowAll=true')
    .subscribe(direcciones => {
      this.direccionesTodasDS = direcciones;
    });
  }

  onLimpiarFiltros() {
    this.query = new QueryDoc();
  }

  recargarUsuarios() {
    this.http.get('api/Usuarios?SoloDireccion=true')
    .subscribe(usuarios => {
      this.usuariosDS = usuarios;
    });

    this.http.get('api/Usuarios')
    .subscribe(usuarios => {
      this.usuariosTodosDS = usuarios;
    });
  }

}
