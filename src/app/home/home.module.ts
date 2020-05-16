import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const homeRoutes: Routes = [{
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
}]
@NgModule({
    declarations: [
        HomeComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        ChartsModule,
        RouterModule.forChild(homeRoutes)
    ]
})
export class HomeModule {

}