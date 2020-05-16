import { NgModule } from '@angular/core';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberComponent } from './member.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MemberRoutingModule } from './member-routing.module';
import { SharedComponentModules } from '../sharedComponents/sharedComponents.module';

@NgModule({
    declarations: [
        MemberEditComponent,
        MemberListComponent,
        MemberComponent,
        MemberDetailComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        MemberRoutingModule,
        SharedComponentModules
    ]
})

export class MemberModule {
}