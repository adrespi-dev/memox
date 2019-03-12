import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../common/services/http.service';
import CustomStore from 'devextreme/data/custom_store';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DxDataGridComponent } from 'devextreme-angular';
import { MatDialog } from '@angular/material';
import { ConfimationDialogComponent } from '../../common/confimation-dialog/confimation-dialog.component';


@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.scss']
})
export class AdministrarUsuariosComponent implements OnInit {
  selectedDireccionId = 0;
  direccionesDS: {} | Object;
  perfilesDS: {} | Object;
  deleting: boolean;
  dataSource: CustomStore;
  formOpened = false;
  isInserting = false;
  saving = false;
  form: FormGroup;
  errorMsg: any;
  serviceUrl = 'api/Usuarios';
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  constructor(private http: HttpService, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = this.http.getWebApiDataSource(this.serviceUrl);
    this.getDirecciones();
  }

  initForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      userName: new FormControl('', Validators.required),
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      perfilId: new FormControl('', Validators.required),
      direccionId: new FormControl('', Validators.required),
      tituloFormal: new FormControl('', Validators.required)
    });
    this.gerPerfiles();
  }

  onAddButtonClick() {
    this.formOpened = !this.formOpened;
    this.initForm();
    this.isInserting = true;
    this.errorMsg = null;
  }

  onRowClick(e) {
    this.initForm();
    this.formOpened = true;
    this.isInserting = false;
    this.errorMsg = null;
    this.form.patchValue(e.data);
  }

  submit() {
    this.errorMsg = null;
    this.saving = true;
    this.http.postOrPatch(this.serviceUrl, this.form.value)
    .pipe(finalize(() => { this.saving = false; }))
    .subscribe(response => {
      this.refreshDataSource();
      this.formOpened = false;
    },
      err => this.errorMsg = err
    );
  }

  delete() {
    const dialogRef = this.dialog.open(ConfimationDialogComponent, {
      width: '250px',
      data: {
        title: 'Eliminar Usuario',
        message: '¿Esta seguro?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.errorMsg = null;
        this.deleting = true;
        this.http.delete(this.serviceUrl + '/' + this.form.value.id)
            .pipe(finalize(() => { this.deleting = false; }))
            .subscribe(response => {
              this.refreshDataSource();
              this.formOpened = false;
            },
            err => this.errorMsg = err);
      }
    });
  }

  refreshDataSource() {
    this.dataSource.load().then(
      () => { this.dataGrid.instance.refresh(); }
    );
  }

  search(searchTerm: string) {
    this.dataGrid.instance.searchByText(searchTerm);
  }

  gerPerfiles() {
    this.http.get('api/Perfiles')
        .subscribe(perfiles => {
          this.perfilesDS = perfiles;
    });
  }

  getDirecciones() {
    this.http.get('api/Direcciones')
        .subscribe(direcciones => {
          this.direccionesDS = direcciones;
    });
  }

  recargarUsuariosPorDireccion(direccionId: number) {
    this.selectedDireccionId = direccionId;
    if (direccionId === 0) {
      this.dataSource = this.http.getWebApiDataSource(this.serviceUrl);
    } else {
      this.dataSource = this.http.getWebApiDataSource(this.serviceUrl + '?DireccionId=' + direccionId);
    }
  }
}
