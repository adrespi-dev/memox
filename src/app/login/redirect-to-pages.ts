import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class RedirectToPagesGuard implements CanActivate {

  constructor() {}

  canActivate() {
    const accessToken =  localStorage.getItem('accessToken');
    return accessToken != null;
  }
}
