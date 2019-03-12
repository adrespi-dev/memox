import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../common/services/http.service';
import { finalize } from 'rxjs/operators';
import { UserInfoService } from '../../common/services/user-info.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  user: any;
  isCallbacking = true;
  menu = [];
  constructor(private http: HttpService, private userInfoService: UserInfoService) {
  }

  ngOnInit() {
    this.recargarMenu();
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

  recargarMenu() {
    this.isCallbacking = true;
    this.http.get('api/menu')
              .pipe(finalize(() => {this.isCallbacking = false; }))
              .subscribe(menu => {
      this.menu = menu.filter(x => x.type === 'link');
    });
  }

}
