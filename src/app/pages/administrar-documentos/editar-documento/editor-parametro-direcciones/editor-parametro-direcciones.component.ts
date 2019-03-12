import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpService } from '../../../../common/services/http.service';
import { DxTagBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'app-editor-parametro-direcciones',
  templateUrl: './editor-parametro-direcciones.component.html',
  styleUrls: ['./editor-parametro-direcciones.component.scss']
})
export class EditorParametroDireccionesComponent implements OnInit {
  @Input() parametro: any;
  @Output() setParametroValue = new EventEmitter<any>();
  @ViewChild(DxTagBoxComponent) tagBox: DxTagBoxComponent;
  direcciones = [];

  constructor(private http: HttpService) {
    http.get('api/direcciones?ShowAll=true').subscribe(direcciones => {
      this.direcciones = direcciones as any[];
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
      displayText += `${x.nombre}` + separator;
    });
    this.parametro.displayText = displayText.substring(0, displayText.length - separator.length);
    this.setParametroValue.emit(this.parametro);
  }

}
