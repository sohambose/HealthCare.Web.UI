import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberComponent } from './member/member.component';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';


const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'member', component: MemberComponent, canActivate: [AuthGuard],
        children: [
            { path: 'new', component: MemberEditComponent },
            { path: ':id', component: MemberDetailComponent },
            { path: ':id/edit', component: MemberEditComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}