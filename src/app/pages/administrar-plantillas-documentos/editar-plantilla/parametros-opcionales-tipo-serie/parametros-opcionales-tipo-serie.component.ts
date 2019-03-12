import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../../../common/services/http.service';

@Component({
  selector: 'app-parametros-opcionales-tipo-serie',
  templateUrl: './parametros-opcionales-tipo-serie.component.html',
  styleUrls: ['./parametros-opcionales-tipo-serie.component.scss']
})
export class ParametrosOpcionalesTipoSerieComponent implements OnInit {
  @Input() parametro: any;
  @Output() parametroChanged = new EventEmitter();
  series = [];

  constructor(private http: HttpService) {
    http.get('api/series').subscribe(series => {
      this.series = series as any[];
    });
  }

  ngOnInit() {
  }

  onChange() {
    this.parametroChanged.emit();
  }

}
