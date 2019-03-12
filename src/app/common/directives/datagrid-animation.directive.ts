import { Directive, HostListener, Host } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { timeout } from 'q';
declare var Waves;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[datagridAnimation]'
})
export class DatagridAnimationDirective {
  showAnimation = true;
  allowRepaint = true;
  maxDelay: any;
  constructor(@Host() private tb: DxDataGridComponent) {

  }

  @HostListener('onRowPrepared', ['$event']) onRowPrepared(e) {
      if (e.rowType === 'data') {
        const rowElement: HTMLElement = e.rowElement;
        if (this.showAnimation) {
          rowElement.classList.remove('no-animated');
          const delay = 0.05 * e.rowIndex;
          rowElement.style.animationDelay = delay.toString() + 's';
          this.maxDelay = delay + 5;
        } else {
          rowElement.classList.add('no-animated');
        }
      }
  }

  @HostListener('onContentReady', ['$event']) onContentReady(e) {
    this.showAnimation = false;
    if (this.allowRepaint) {
      this.allowRepaint = false;
      window.setTimeout(() => { this.tb.instance.updateDimensions(); this.tb.instance.repaint(); }, this.maxDelay + 500);
    }
  }
}
