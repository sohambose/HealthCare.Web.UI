import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { AuthGuard } from '../auth/auth.guard';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { CanDeactivateGuard } from '../CommonServices/can-deactivate-guard.service';
import { MemberDetailComponent } from './member-detail/member-detail.component';

const memberModuleRoutes: Routes = [
    {
        path: '', component: MemberComponent, canActivate: [AuthGuard],
        children: [
            { path: 'new', component: MemberEditComponent, canDeactivate: [CanDeactivateGuard] },
            { path: ':id', component: MemberDetailComponent },
            { path: ':id/edit', component: MemberEditComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(memberModuleRoutes)],
    exports: [RouterModule]
})
export class MemberRoutingModule {

}