import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { RedirectToPagesGuard } from './redirect-to-pages';
// Theme Components

const LoginRoutes: Routes = [
    {
        path: '', component: LoginComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(LoginRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class LoginRoutingModule { }
