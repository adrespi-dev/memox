import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './theme/header/header.component';
import { PagesRoutingModule } from './pages.routing.module';
import { MaterialModule } from '../common/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SideMenuComponent } from './theme/side-menu/side-menu.component';
import { OmnisearchComponent } from '../common/omnisearch/omnisearch.component';
import { DevextremeModule } from '../common/devextreme.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatagridAnimationDirective } from '../common/directives/datagrid-animation.directive';
import { ConfimationDialogComponent } from '../common/confimation-dialog/confimation-dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatOption } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { ClickOutsideDirective } from '../common/directives/click-outside.directive';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DataSourceUrlDirective } from '../common/directives/dataSourceUrl.directive';
import { DragulaModule } from 'ng2-dragula';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    DevextremeModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    PerfectScrollbarModule,
    DragulaModule,
    FormsModule
  ],
  declarations: [
    PagesComponent,
    HeaderComponent,
    SideMenuComponent,
    OmnisearchComponent,
    DatagridAnimationDirective,
    ClickOutsideDirective,
    ConfimationDialogComponent,
    DataSourceUrlDirective,
],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  entryComponents: [
    ConfimationDialogComponent,
    MatOption
  ]
})
export class PagesModule { }
