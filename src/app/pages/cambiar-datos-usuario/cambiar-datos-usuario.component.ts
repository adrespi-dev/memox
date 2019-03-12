import { Component, OnInit } from '@angular/core';
import { CambiarClaveService } from '../../common/services/cambiar-clave.service';
import { UserInfoService } from '../../common/services/user-info.service';
import { HttpService } from '../../common/services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CambiarDatosUsuarioService } from '../../common/services/cambiar-datos-usuario.service';
import { finalize } from 'rxjs/operators';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-cambiar-datos-usuario',
  templateUrl: './cambiar-datos-usuario.component.html',
  styleUrls: ['./cambiar-datos-usuario.component.scss']
})
export class CambiarDatosUsuarioComponent implements OnInit {
  currentDatos: any;
  errorMessage;
  form: FormGroup;
  showModal = false;
  isCallbacking = false;
  isCallbackingData = false;
  noSePudieronObtenerDatos = false;
  urlImagenCambiada: string;

  constructor(
    private cambiarDatosUsuarioService: CambiarDatosUsuarioService,
    private userInfoService: UserInfoService,
    private http: HttpService
  ) {
    this.form = new FormGroup({
      userName: new FormControl(''),
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
    this.cambiarDatosUsuarioService.onVisibleChanged$.subscribe(value => {
      this.showModal = value;
    });
  }

  onShown() {
    this.urlImagenCambiada = null;
    this.cargarDatos();
  }

  cargarDatos() {
    this.noSePudieronObtenerDatos = false;
    this.isCallbackingData = true;
    this.http.get('api/Usuarios/MisDatos')
    .pipe(finalize(() => { this.isCallbackingData = false; }))
    .subscribe(datos => {
      const data = datos as any;
      this.form.patchValue(data);
    }, err => {
      this.noSePudieronObtenerDatos = true;
    });
  }

  submitForm() {
    this.errorMessage = null;
    this.isCallbacking = true;
    if (this.form.valid) {
      const post = JSON.parse(JSON.stringify(this.form.value));
      post.fotoBase64 = this.urlImagenCambiada;
      this.http.post('api/Usuarios/CambiarDatosUsuario', post)
        .pipe(finalize(() => {this.isCallbacking = false; } ))
      .subscribe(data => {
        notify('Datos modificados correctamente', 'success', 1000);
        this.cambiarDatosUsuarioService.setModalVisible(false);
        this.userInfoService.actualizarDatos();
      }, err => {
        this.errorMessage = err;
      });
    }
  }

  importFoto(event) {
    if (event.target.files.length === 0) {
      this.urlImagenCambiada = null;
       return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.urlImagenCambiada = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

}
