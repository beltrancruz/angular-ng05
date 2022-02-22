import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'heros',
        loadChildren: ()=> import('./heros/heros.module').then(m => m.HerosModule),
        canLoad: [ AuthGuard ],
        canActivate: [ AuthGuard ]
    },
    {
        path: '404',
        component: ErrorPageComponent
    },
    {
        path: '**',
        redirectTo: '404'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}