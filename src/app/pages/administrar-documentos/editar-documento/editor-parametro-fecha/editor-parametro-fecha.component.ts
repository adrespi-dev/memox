import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editor-parametro-fecha',
  templateUrl: './editor-parametro-fecha.component.html',
  styleUrls: ['./editor-parametro-fecha.component.scss']
})
export class EditorParametroFechaComponent implements OnInit {
  @Input() parametro: any;
  @Output() setParametroValue = new EventEmitter<any>();
  constructor(private datePipe: DatePipe) {
  }

  ngOnInit() {
    if (!this.parametro.value) {
      const ahora = new Date();
      this.parametro.value = ahora;
    }
  }

  onSetParametroValue() {
    const displayText = this.datePipe.transform(this.parametro.value, this.parametro._formatoFecha);
    this.parametro.displayText = displayText;
    this.setParametroValue.emit(this.parametro);
  }

}
