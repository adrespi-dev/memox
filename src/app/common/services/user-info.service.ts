import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private actualizardatosSource = new Subject<boolean>();
  onDatosChanged$ = this.actualizardatosSource.asObservable();

  constructor() { }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  setValue(name: string, value: any) {
    const userInfo = this.getUserInfo();
    userInfo[name] = value;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  actualizarDatos() {
    this.actualizardatosSource.next();
  }

}
