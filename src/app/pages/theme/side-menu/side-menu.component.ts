import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatIconsService } from './material-icons';
import { DragulaService } from 'ng2-dragula';
import { HttpService } from '../../../common/services/http.service';
import { finalize } from 'rxjs/operators';
import notify from 'devextreme/ui/notify';
import { MatDialog } from '@angular/material';
import { ConfimationDialogComponent } from '../../../common/confimation-dialog/confimation-dialog.component';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  respaldoMenu: string;
  errorMsg: any;
  matIconsFiltered: string[];
  menuItemSelected: any;
  matIcons: string[];
  isPopoverVisible: any;
  isCallbacking = true;
  @Input() isMenuEditing = false;
  @Output() toogleMenuEdit = new EventEmitter();
  targetPopoverIconChooser: any;
  menu: any;
  showEditMenuBtn = false;
  // tslint:disable-next-line:max-line-length
  constructor(private matIconsService: MatIconsService, private dragulaService: DragulaService, private http: HttpService, public dialog: MatDialog) {
    this.matIcons = matIconsService.getIcons();
    this.matIconsFiltered = this.matIcons;
    const bag: any = this.dragulaService.find('menu-bag');
    if (bag !== undefined ) {
      this.dragulaService.destroy('menu-bag');
    }
    dragulaService.setOptions('menu-bag', {
      removeOnSpill: false,
      moves: (el, container, handle) => {
        return (<HTMLElement>handle).classList.contains('handle');
      }
    });
    http.get('api/Permisos/PuedoEditarMenu').subscribe(response => {
      this.showEditMenuBtn = (response as any).otorgado;
    });
  }

  ngOnInit() {
    this.recargarMenu();
  }

  recargarMenu() {
    this.isCallbacking = true;
    this.http.get('api/menu')
              .pipe(finalize(() => {this.isCallbacking = false; }))
              .subscribe(menu => {
      this.menu = menu;
    });
  }

  onBeginEdit() {
    if (!this.isMenuEditing) {
      this.respaldoMenu = JSON.stringify(this.menu);
      this.toogleMenuEdit.emit();
    } else {
      const dialogRef = this.dialog.open(ConfimationDialogComponent, {
        width: '350px',
        data: {
          title: 'Terminar edición de Menú',
          message: 'Perderá todos los cambios que no haya grabado'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.menu = JSON.parse(this.respaldoMenu);
          this.toogleMenuEdit.emit();
        }
      });
    }
  }

  onBeginIconChooser(e, menuItem) {
    this.targetPopoverIconChooser = e.srcElement;
    this.isPopoverVisible = true;
    this.menuItemSelected = menuItem;
  }

  onSearchIcon(searchTerm) {
    this.matIconsFiltered = this.matIcons.filter(x => x.includes(searchTerm));
  }

  onSaveMenu() {
    this.isCallbacking = true;
    this.errorMsg = null;
    this.http.post('api/menu/ActualizarMenu', this.menu)
      .pipe(finalize(() => { this.isCallbacking = false; } ))
      .subscribe(data => {
        notify('Menu actualizado correctamente', 'success');
        this.recargarMenu();
        this.toogleMenuEdit.emit();
      },
      err => this.errorMsg = err);
  }

  onEliminarMenu(menuItem: any) {
    const index: number = this.menu.indexOf(menuItem);
    if (index !== -1) {
        this.menu.splice(index, 1);
    }
  }

  onAgregarMenu() {
    this.menu.push({id: -1, type: 'link', icon: 'crop_square'});
  }

}
