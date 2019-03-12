import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PagesModule } from '../../pages/pages.module';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
  private setMenuVisible = new Subject<boolean>();
  onMenuSetVisible$ = this.setMenuVisible.asObservable();
  private setMenuMode = new Subject<string>();
  onMenuModeChanged$ = this.setMenuMode.asObservable();

  constructor() { }

  onSetMenuVisible(value: boolean) {
    this.setMenuVisible.next(value);
  }

  onSetMenuMode(value: string) {
    this.setMenuMode.next(value);
  }

}
