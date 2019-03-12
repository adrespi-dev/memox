import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PagesModule } from '../../pages/pages.module';

@Injectable({
  providedIn: 'root'
})
export class CambiarClaveService {
  private setModalVisibleSource = new Subject<boolean>();
  onVisibleChanged$ = this.setModalVisibleSource.asObservable();

  constructor() { }

  setModalVisible(value: boolean) {
    this.setModalVisibleSource.next(value);
  }

}
