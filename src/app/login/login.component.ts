import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../common/services/http.service';
import { finalize } from 'rxjs/operators';
import notify from 'devextreme/ui/notify';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formRecuperarClave: FormGroup;
  selectedUser: any;
  users: any[];
  form: FormGroup;
  selectedPanel = '';
  isCallbacking = false;

  constructor(private http: HttpService, private router: Router) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.router.navigate(['/pages']);
    }
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.formRecuperarClave = new FormGroup({
      username: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email])
    });
    this.users = [
      {
        username: 'Otro usuario', direccion: 'Nueva sesión',
        isNuevoUsuario: true
      }
    ];
    // localStorage.removeItem('userInfo');
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo == null) {
      this.selectedPanel  = 'signin';
      this.selectedUser = this.users[0];
    } else {
      const userInfoData = JSON.parse(userInfo);
      this.users.push({
        username: userInfoData.username, direccion: userInfoData.direccion
      });
      this.selectedPanel  = 'userChooser';
      this.users = this.users.reverse();
    }
  }

  ngOnInit() {
  }

  setUser(user) {
    this.selectedUser = user;
    this.selectedPanel = 'signin';
    this.form.get('username').setValue('');
    if (!user.isNuevoUsuario) {
      this.form.get('username').setValue(user.username);
    }
  }

  submit() {
    if (this.form.valid) {
      const params = this.form.value;
      this.isCallbacking = true;
      this.http.postWithoutCredentials('api/Security/Login', params)
      .subscribe(data => {
        const response = data as any;
        const userInfo = {
          username : response.userName,
          perfil : response.perfil,
          direccion : response.direccion,
          debeCambiarClave : response.debeCambiarClave,
          nombreCompleto : response.nombreCompleto,
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('accessToken', response.accessToken);
        this.router.navigate(['/pages']);
      }, err => {
        this.isCallbacking = false;
        notify(err, 'error');
      });
    }
  }

  recuperarClave() {
    if (this.formRecuperarClave.valid) {
      const params = this.formRecuperarClave.value;
      this.isCallbacking = true;
      this.http.postWithoutCredentials('api/Security/RecuperarClave', params)
      .pipe(finalize(() => {this.isCallbacking = false; }))
      .subscribe(data => {
        this.selectedPanel = 'signin';
        notify('Contraseña enviada al correo satisfactoriamente', 'success');
      }, err => {
        notify(err, 'error');
      });
    }
  }

}
