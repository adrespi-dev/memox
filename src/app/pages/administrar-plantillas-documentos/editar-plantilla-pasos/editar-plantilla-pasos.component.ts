import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../../common/services/http.service';
import { finalize } from '../../../../../node_modules/rxjs/operators';
import { DragulaService } from '../../../../../node_modules/ng2-dragula';
import notify from '../../../../../node_modules/devextreme/ui/notify';

@Component({
  selector: 'app-editar-plantilla-pasos',
  templateUrl: './editar-plantilla-pasos.component.html',
  styleUrls: ['./editar-plantilla-pasos.component.scss']
})
export class EditarPlantillaPasosComponent implements OnInit {
  @Input() showModal = false;
  @Output() showModalChange = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter();
  @Input() plantilla: any;
  pasos = [];
  usuarios = [];
  isCallbacking = false;

  constructor(private http: HttpService, private dragulaService: DragulaService) {
    this.agregarPaso = this.agregarPaso.bind(this);

    const bag: any = this.dragulaService.find('pasos-bag');
    if (bag !== undefined ) {
      this.dragulaService.destroy('pasos-bag');
    }
    dragulaService.setOptions('pasos-bag', {
      removeOnSpill: false,
      moves: (el, container, handler) => {
        return (<HTMLElement>handler).classList.contains('handler');
      }
    });
  }

  ngOnInit() {
  }

  recargarPasos() {
    this.isCallbacking = true;
    this.http.get(`api/Plantillas/${this.plantilla.id}/GetPasos`)
    .pipe(finalize(() => { this.isCallbacking = false; }))
    .subscribe(pasos => {
      this.pasos = pasos as any[];
    });
    this.http.get('api/Usuarios').subscribe(usuarios => {
      this.usuarios = usuarios as any[];
      this.usuarios = this.usuarios.filter(x => x.direccionId === this.plantilla.direccionId);
    });
  }

  agregarPaso() {
    this.pasos.push({id: 0});
  }

  grabar() {
    this.isCallbacking = true;
    this.http.post(`api/Plantillas/${this.plantilla.id}/GuardarPasos`, this.pasos)
    .pipe(finalize(() => { this.isCallbacking = false; }))
    .subscribe(rsp => {
      notify('Pasos guardados correctamente', 'success');
      this.saved.emit();
    }, err => {
      notify(err, 'error');
    });
  }

  borrarPaso(paso) {
    const index = this.pasos.indexOf(paso);
    this.pasos.splice(index, 1);
  }

}
