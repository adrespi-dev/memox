import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-documentos-list',
  templateUrl: './documentos-list.component.html',
  styleUrls: ['./documentos-list.component.scss']
})
export class DocumentosListComponent implements OnInit {
  @Input() documentos: any[];
  @Output() clickDocumento = new EventEmitter<any>();
  @Input() isCallbacking: boolean;
  @Input() documentoSeleccionado: any;
  rootUrl: string;

  constructor() {
    this.rootUrl = environment.rootUrl;
  }

  ngOnInit() {
  }

}
