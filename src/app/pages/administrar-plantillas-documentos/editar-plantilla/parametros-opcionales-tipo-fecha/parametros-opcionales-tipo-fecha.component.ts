import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../../common/services/http.service';

@Component({
  selector: 'app-parametros-opcionales-tipo-fecha',
  templateUrl: './parametros-opcionales-tipo-fecha.component.html',
  styleUrls: ['./parametros-opcionales-tipo-fecha.component.scss']
})
export class ParametrosOpcionalesTipoFechaComponent implements OnInit {
  @Input() parametro: any;
  @Output() parametroChanged = new EventEmitter();
  Ahora = new Date();

  constructor(private http: HttpService) {
  }

  onChange() {
    this.parametroChanged.emit();
  }

  ngOnInit() {
    if (!this.parametro._formatoFecha) {
      this.parametro._formatoFecha = 'dd/MM/yyyy';
    }
  }

}
