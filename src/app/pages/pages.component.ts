import { Component, OnInit } from '@angular/core';
import { CambiarClaveService } from '../common/services/cambiar-clave.service';
import { SideMenuService } from '../common/services/side-menu.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  isMenuEditing = false;
  isMenuVisible = true;
  menuMode = 'side';

  constructor(
    private cambiarClave: CambiarClaveService,
    private cambiarDatosUsuario: CambiarClaveService,
    private sideMenuService: SideMenuService
  ) {
    this.sideMenuService.onMenuSetVisible$.subscribe(menuVisible => {
      this.isMenuVisible = menuVisible;
    });
    this.sideMenuService.onMenuModeChanged$.subscribe(menuMode => {
      this.menuMode = menuMode;
    });
  }

  ngOnInit() {
  }

  onToogleEditMenuMode() {
    this.isMenuEditing = !this.isMenuEditing;
    this.menuMode = (this.isMenuEditing !== true) ? 'side' : 'over';
  }

}
