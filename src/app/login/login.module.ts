import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { LoginRoutingModule } from './login.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { MatInputModule, MatIconModule, MatProgressSpinnerModule, MatButtonModule, MatLineModule, MatListModule, MatProgressBarModule } from '@angular/material';
import { RedirectToPagesGuard } from './redirect-to-pages';
import { UserFotoDirective } from '../common/directives/user-foto.directive';
import { SharedModule } from '../common/shared.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    SharedModule
  ],
  declarations: [LoginComponent],
  providers: [RedirectToPagesGuard]
})
export class LoginModule { }
