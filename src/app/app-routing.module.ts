import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberComponent } from './member/member.component';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'auth', component: AuthComponent },
    {
        path: 'member', component: MemberComponent, children: [
            { path: 'new', component: MemberEditComponent },
            { path: ':id', component: MemberDetailComponent },
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