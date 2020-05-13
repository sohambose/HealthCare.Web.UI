import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberComponent } from './member/member.component';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { CanDeactivateGuard } from './CommonServices/can-deactivate-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard]
    },
    {
        path: 'member', component: MemberComponent, canActivate: [AuthGuard],
        children: [
            { path: 'new', component: MemberEditComponent, canDeactivate: [CanDeactivateGuard] },
            { path: ':id', component: MemberDetailComponent },
            { path: ':id/edit', component: MemberEditComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}