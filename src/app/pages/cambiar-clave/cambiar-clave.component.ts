import { Component, OnInit } from '@angular/core';
import { CambiarClaveService } from '../../common/services/cambiar-clave.service';
import { UserInfoService } from '../../common/services/user-info.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpService } from '../../common/services/http.service';
import { finalize } from 'rxjs/operators';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.scss']
})
export class CambiarClaveComponent implements OnInit {
  errorMessage;
  form: FormGroup;
  showModal = false;
  cambiarClaveObligatoria = false;
  isCallbacking = false;
  constructor(
    private cambiarClaveService: CambiarClaveService,
    private userInfoService: UserInfoService,
    private http: HttpService
  ) {
    this.form = new FormGroup({
      contraseñaActual: new FormControl('', Validators.required),
      contraseñaNueva: new FormControl('', [
        Validators.required
      ]),
      contraseñaNuevaConfirm: new FormControl('', [
        Validators.required,
        this.matchPassword()
      ])
    });
  }

  ngOnInit() {
    this.cambiarClaveService.onVisibleChanged$.subscribe(value => {
      this.showModal = value;
    });
    const userInfo = this.userInfoService.getUserInfo();
    if (userInfo.debeCambiarClave === true) {
      this.cambiarClaveObligatoria = true;
      this.cambiarClaveService.setModalVisible(true);
    }
  }

  matchPassword (): ValidatorFn {
   return (control: AbstractControl) => {
     if (this.form) {
      const contraseñaNueva = this.form.get('contraseñaNueva');
      const contraseñaNuevaConfirm = control;
      const PasswordMatched = contraseñaNueva.value === contraseñaNuevaConfirm.value;
      return PasswordMatched ? null : {'matchPassword' : {value: contraseñaNueva.value}};
    }
    return null;
   };
 }

  submitForm() {
    this.errorMessage = null;
    this.isCallbacking = true;
    if (this.form.valid) {
      this.http.post('api/Usuarios/CambiarClave', this.form.value)
      .pipe(finalize(() => {this.isCallbacking = false; } ))
      .subscribe(data => {
        notify('Contraseña cambiada correctamente', 'success', 1000);
        this.userInfoService.setValue('debeCambiarClave', false);
        this.cambiarClaveService.setModalVisible(false);
      }, err => {
        this.errorMessage = err;
      });
    }
  }
}
