import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Theme Components

const AppRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(AppRoutes, {onSameUrlNavigation: 'reload'})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
