import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpService } from '../../../common/services/http.service';
import { environment } from '../../../../environments/environment';
import { finalize } from 'rxjs/operators';
import { ConfimationDialogComponent } from '../../../common/confimation-dialog/confimation-dialog.component';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-escoger-plantilla-documento',
  templateUrl: './escoger-plantilla-documento.component.html',
  styleUrls: ['./escoger-plantilla-documento.component.scss']
})
export class EscogerPlantillaDocumentoComponent implements OnInit {
  rootUrl: string;
  errorMsg: any;
  plantillas: any[];
  isMainCallbacking = true;
  ahora = new Date().getTime();

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
      this.plantillas = this.plantillas.filter(x => x.numeroPasos > 0);
    });
  }
}
