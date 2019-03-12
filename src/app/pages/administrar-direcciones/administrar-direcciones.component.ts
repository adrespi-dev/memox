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
  selector: 'app-administrar-direcciones',
  templateUrl: './administrar-direcciones.component.html',
  styleUrls: ['./administrar-direcciones.component.scss']
})
export class AdministrarDireccionesComponent implements OnInit {
  deleting: boolean;
  dataSource: CustomStore;
  formOpened = false;
  isInserting = false;
  saving = false;
  form: FormGroup;
  errorMsg: any;
  serviceUrl = 'api/Direcciones';
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  constructor(private http: HttpService, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = this.http.getWebApiDataSource(this.serviceUrl);
  }

  initForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      alias: new FormControl('', Validators.required)
    });
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
        title: 'Eliminar Dirección',
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

}
