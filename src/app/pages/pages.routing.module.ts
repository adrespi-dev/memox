import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';

// Theme Components

const AppRoutes: Routes = [
    {
        path: '', component: PagesComponent, children: [
            { path: '', pathMatch: 'full', redirectTo:  'inicio' },
            { path: 'inicio', component:  InicioComponent },
            { path: 'direcciones', loadChildren:  './administrar-direcciones/administrar-direcciones.module#AdministrarDireccionesModule' },
            { path: 'perfiles', loadChildren:  './administrar-perfiles/administrar-perfiles.module#AdministrarPerfilesModule' },
            { path: 'usuarios', loadChildren:  './administrar-usuarios/administrar-usuarios.module#AdministrarUsuariosModule' },
            { path: 'series', loadChildren:  './series/series.module#SeriesModule' },
            { path: 'plantillas', loadChildren:  './administrar-plantillas-documentos/administrar-plantillas-documentos.module#AdministrarPlantillasDocumentos' },
            { path: 'documentos', loadChildren:  './administrar-documentos/administrar-documentos.module#AdministrarUsuariosModule' },
            { path: 'analisis-general', loadChildren:  './reporte-general/reporte-general.module#ReporteGeneralModule' },
            { path: 'analisis-por-direccion', loadChildren:  './reporte-direccion/reporte-direccion.module#ReporteDireccionModule' },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(AppRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PagesRoutingModule { }
