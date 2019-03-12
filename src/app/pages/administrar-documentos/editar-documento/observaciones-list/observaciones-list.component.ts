import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-observaciones-list',
  templateUrl: './observaciones-list.component.html',
  styleUrls: ['./observaciones-list.component.scss']
})
export class ObservacionesListComponent implements OnInit {
  @Input() observaciones: any[];
  @Input() puedeAprobar = false;
  @Input() documento: any;
  constructor() {
   }

  ngOnInit() {
    this.documento.observaciones = [];
  }

  onValueChanged(observaciones) {
    this.documento.observaciones = observaciones;
  }
}
