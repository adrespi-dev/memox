import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-documentos-relacionados',
  templateUrl: './documentos-relacionados.component.html',
  styleUrls: ['./documentos-relacionados.component.scss']
})
export class DocumentosRelacionadosComponent implements OnInit {
  @Input() documento: any;
  constructor() { }

  ngOnInit() {
  }

}
