import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../common/services/http.service';
import CustomStore from 'devextreme/data/custom_store';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DxDataGridComponent } from 'devextreme-angular';
import { MatDialog, MatSelectionList } from '@angular/material';
import { ConfimationDialogComponent } from '../../common/confimation-dialog/confimation-dialog.component';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-administrar-perfiles',
  templateUrl: './administrar-perfiles.component.html',
  styleUrls: ['./administrar-perfiles.component.scss']
})
export class AdministrarPerfilesComponent implements OnInit {
  perfilIdSelected: number;
  errorMsgMenu: string;
  perfilMenu: any;
  isCallbackingModalMenu: boolean;
  showModalMenu: boolean;
  permisosDS: any;
  direccionesDS: any;
  deleting: boolean;
  dataSource: CustomStore;
  formOpened = false;
  isInserting = false;
  saving = false;
  form: FormGroup;
  errorMsg: any;
  serviceUrl = 'api/Perfiles';
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @ViewChild('permisosList') permisosList: MatSelectionList;
  @ViewChild('direccionesList') direccionesList: MatSelectionList;
  constructor(private http: HttpService, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = this.http.getWebApiDataSource(this.serviceUrl);
  }

  recargarPermisosOtorgados() {
    let id = 0;
    if (this.form && this.form.value.id) {
      id = this.form.value.id;
    }

    this.http.get('api/perfiles/GetPermisosOtorgados?PerfilId=' + id)
    .subscribe(permisos => {
      this.permisosDS = permisos;
    });
  }

  recargarDireccionesOtorgadas() {
    let id = 0;
    if (this.form && this.form.value.id) {
      id = this.form.value.id;
    }

    this.http.get('api/perfiles/GetDireccionesOtorgadas?PerfilId=' + id)
    .subscribe(direcciones => {
      this.direccionesDS = direcciones;
    });
  }

  initForm(data?: any) {
    this.form = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required)
    });
    if (data) {
      this.form.patchValue(data);
    }
    this.recargarPermisosOtorgados();
    this.recargarDireccionesOtorgadas();
  }

  setFormVisible(open: boolean, data?: any) {
    this.formOpened = open;
    if (open) {
      this.initForm(data);
    } else {
      this.permisosDS = [];
    }
  }

  onAddButtonClick() {
    this.setFormVisible(!this.formOpened);
    this.isInserting = true;
    this.errorMsg = null;
  }

  onRowClick(e) {
    this.setFormVisible(true, e.data);
    this.isInserting = false;
    this.errorMsg = null;
  }

  submit() {
    this.errorMsg = null;
    this.saving = true;
    const data = this.form.value;
    data.PermisosOtorgadosIds = this.permisosList.selectedOptions.selected.map(item => item.value);
    data.DireccionesOtorgadasIds = this.direccionesList.selectedOptions.selected.map(item => item.value);
    this.http.postOrPatch(this.serviceUrl, this.form.value)
    .pipe(finalize(() => { this.saving = false; }))
    .subscribe(response => {
      this.refreshDataSource();
      this.setFormVisible(false);
    },
      err => this.errorMsg = err
    );
  }

  delete() {
    const dialogRef = this.dialog.open(ConfimationDialogComponent, {
      width: '250px',
      data: {
        title: 'Eliminar Perfil',
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
              this.setFormVisible(false);
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

  onSetVisibleModal(value: boolean, perfilId: number) {
    this.showModalMenu = value;
    this.perfilIdSelected = perfilId;
  }

  onShownModal() {
    this.errorMsgMenu = null;
    this.isCallbackingModalMenu = true;
    this.http.get('api/perfiles/GetMenuOtorgado?PerfilId=' + this.perfilIdSelected)
    .pipe(finalize(() => { this.isCallbackingModalMenu = false; } ))
    .subscribe(menu => {
      this.perfilMenu = menu;
    }, err => {
      this.errorMsgMenu = err;
    });
  }

  onGrabarMenu() {
    this.isCallbackingModalMenu = true;
    const data = {
      PerfilId: this.perfilIdSelected,
      MenuOtorgadoIds: this.perfilMenu.map(item => {
        if (item.otorgado) {
          return item.menu.id;
        }
      })
    };
    this.http.post('api/perfiles/GrabarMenuOtorgado', data)
    .pipe(finalize(() => { this.isCallbackingModalMenu = false; } ))
    .subscribe(response => {
      notify('Menu grabado correctamente', 'success');
      this.showModalMenu = false;
    }, err => {
      this.errorMsgMenu = err;
    });
  }
}
