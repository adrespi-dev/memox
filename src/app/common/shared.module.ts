import { NgModule } from '@angular/core';
import { UserFotoDirective } from './directives/user-foto.directive';
import { LoaderComponent } from './loader/loader.component';
import { DxLoadIndicatorModule } from '../../../node_modules/devextreme-angular';
import { FlexLayoutModule } from '../../../node_modules/@angular/flex-layout';
import { MaterialModule } from './material.module';
import { DevextremeModule } from './devextreme.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    UserFotoDirective,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DevextremeModule,
    DxLoadIndicatorModule,
    FlexLayoutModule
  ],
  exports: [
    MaterialModule,
    DevextremeModule,
    UserFotoDirective,
    LoaderComponent
  ]
})
export class SharedModule { }
