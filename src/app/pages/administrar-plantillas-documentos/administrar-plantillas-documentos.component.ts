import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../common/services/http.service';
import { ConfimationDialogComponent } from '../../common/confimation-dialog/confimation-dialog.component';
import { MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import notify from 'devextreme/ui/notify';
import { SideMenuService } from '../../common/services/side-menu.service';

@Component({
  selector: 'app-administrar-plantillas-documentos',
  templateUrl: './administrar-plantillas-documentos.component.html',
  styleUrls: ['./administrar-plantillas-documentos.component.scss']
})
export class AdministrarPlantillasDocumentosComponent implements OnInit {
  rootUrl: string;
  errorMsg: any;
  plantillas: any[];
  plantillaDuplicar: any;
  isMainCallbacking = true;
  ahora = new Date().getTime();
  showModalPasos = false;
  plantillaSeleccionada: any;

  constructor(private http: HttpService, public dialog: MatDialog) {
    this.refreshPlantillas();
    this.rootUrl = environment.rootUrl;
  }

  ngOnInit() {
  }

  refreshPlantillas() {
    this.isMainCallbacking = true;
    this.http.get(`api/Plantillas`)
    .pipe(finalize(() => {this.isMainCallbacking = false; }))
    .subscribe(plantillas => {
      this.plantillas = plantillas as any[];
    });
  }

  onDeletePlantilla(plantilla) {
    const dialogRef = this.dialog.open(ConfimationDialogComponent, {
      width: '300px',
      data: {
        title: 'Eliminar Plantilla',
        message: 'Esta opción no se puede revertir. ¿Esta seguro?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        plantilla.isCallbacking = true;
        this.http.delete('api/Plantillas/' + plantilla.id)
          .pipe(finalize(() => { plantilla.isCallbacking = false; }))
          .subscribe(response => {
            notify('Se ha eliminado la plantilla correctamente', 'success');
            this.refreshPlantillas();
          },
          err => this.errorMsg = err);
      }
    });
  }

  duplicarPlantilla() {
    this.plantillaDuplicar.isCallbacking = true;
    this.http.get(`api/Plantillas/DuplicarPlantilla?PlantillaId=${this.plantillaDuplicar.id}`)
    .pipe(finalize(() => {this.plantillaDuplicar.isCallbacking = false; }))
    .subscribe(response => {
      this.refreshPlantillas();
      notify('Plantilla duplicada correctamente', 'success', 3000);
    }, err => {
      notify(err, 'error', 7000);
    });
  }
}
