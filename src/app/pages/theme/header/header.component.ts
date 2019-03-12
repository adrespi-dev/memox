import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CambiarClaveService } from '../../../common/services/cambiar-clave.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../common/services/user-info.service';
import { CambiarDatosUsuarioService } from '../../../common/services/cambiar-datos-usuario.service';
import { HttpService } from '../../../common/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuToggleClick = new EventEmitter();
  isMenuUserOpened = false;
  user: any;

  constructor(
    private cabiarClave: CambiarClaveService,
    private cambiarDatosUsuario: CambiarDatosUsuarioService,
    private router: Router,
    private http: HttpService,
    private userInfoService: UserInfoService
  ) {
    this.getDatos();
    this.userInfoService.onDatosChanged$.subscribe(() => {
      this.getDatos();
    });
  }

  getDatos() {
    this.http.get('api/Usuarios/MisDatos')
    .subscribe(datos => {
      this.user = datos;
    });
  }

  ngOnInit() {
  }

  onCambiarClaveClick() {
    this.cabiarClave.setModalVisible(true);
  }

  onCerrarSesionClick() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

  onCambiarDatosUsuarioClick() {
    this.cambiarDatosUsuario.setModalVisible(true);
  }
}
