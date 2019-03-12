import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpService } from '../../../../common/services/http.service';
import { DxTagBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'app-editor-parametro-usuarios',
  templateUrl: './editor-parametro-usuarios.component.html',
  styleUrls: ['./editor-parametro-usuarios.component.scss']
})
export class EditorParametroUsuariosComponent implements OnInit {
  @Input() parametro: any;
  @Output() setParametroValue = new EventEmitter<any>();
  @ViewChild(DxTagBoxComponent) tagBox: DxTagBoxComponent;
  usuarios = [];

  constructor(private http: HttpService) {
    http.get('api/usuarios').subscribe(usuarios => {
      this.usuarios = usuarios as any[];
    });
  }

  ngOnInit() {
    if (!this.parametro.value) {
      this.parametro.value = [];
    }
  }

  onSetParametroValue() {
    const separator = '\n';
    let displayText = '';
    this.tagBox.selectedItems.forEach(x => {
      displayText += `${x.apellidos} ${x.nombres}/ ${x.tituloFormal}` + separator;
    });
    this.parametro.displayText = displayText.substring(0, displayText.length - separator.length);
    this.setParametroValue.emit(this.parametro);
  }

}
