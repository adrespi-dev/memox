import { NgModule } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { DxDataGridModule, DxScrollViewModule, DxPopupModule, DxPopoverModule, DxLoadPanelModule, DxLoadIndicatorModule, DxTagBoxModule, DxSelectBoxModule, DxListModule, DxTextAreaModule, DxValidationGroupModule, DxValidatorModule, DxDateBoxModule, DxTextBoxModule } from 'devextreme-angular';

@NgModule({
  imports: [
    DxDataGridModule,
    DxScrollViewModule,
    DxPopupModule,
    DxPopoverModule,
    DxLoadPanelModule,
    DxLoadIndicatorModule,
    DxTagBoxModule,
    DxSelectBoxModule,
    DxListModule,
    DxTextAreaModule,
    DxValidationGroupModule,
    DxValidatorModule,
    DxDateBoxModule,
    DxTextBoxModule
  ],
  exports: [
    DxDataGridModule,
    DxScrollViewModule,
    DxPopupModule,
    DxPopoverModule,
    DxLoadPanelModule,
    DxLoadIndicatorModule,
    DxTagBoxModule,
    DxSelectBoxModule,
    DxListModule,
    DxTextAreaModule,
    DxValidationGroupModule,
    DxValidatorModule,
    DxDateBoxModule,
    DxTextBoxModule
  ]
})
export class DevextremeModule { }
