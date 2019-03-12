import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../../../../common/services/http.service';
import { DxValidationGroupComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-documento-panel-subir-escanear',
  templateUrl: './documento-panel-subir-escanear.component.html',
  styleUrls: ['./documento-panel-subir-escanear.component.scss']
})
export class DocumentoPanelSubirEscanearComponent implements OnInit {
  @Input() documento: any = {};
  @Output() clickBack = new EventEmitter();
  @Output() escaneoSubido = new EventEmitter();
  nuevaObservacion: string;
  isCallbacking = false;
  file: File;

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  subirEscaneo() {
    if (this.file) {
      this.isCallbacking = true;
      const formData: FormData = new FormData();
      formData.append('uploadFile', this.file, this.file.name);

      const headers = new HttpHeaders()
                      .set('Accept', 'application/json')
                      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      this.http.post('api/Documentos/SubirEscaneo/' + this.documento.id, formData)
      .subscribe(rsp => {
        notify('Documento subido correctamente', 'success');
        this.escaneoSubido.emit();
      }, err => {
        this.isCallbacking = false;
        notify(err, 'error');
      });
    } else {
      notify('Debe ingresar un archivo pdf', 'error', 2000);
    }
  }

  onChange(e) {
    const files = e.files as FileList;
    this.file = files[0];
  }

}
