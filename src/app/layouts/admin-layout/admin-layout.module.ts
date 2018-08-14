import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { LawsComponent } from '../../laws/laws.component';
import { ActivitiesComponent } from '../../activities/activities.component';
import { ActivitiesIndexComponent } from '../../activities/index/index.component';
import { ActivitiesCreateComponent } from '../../activities/create/create.component';
import { OrdersComponent } from '../../orders/orders.component';
import { OrdersIndexComponent } from '../../orders/index/index.component';
import { OrdersCreateComponent } from '../../orders/create/create.component';
import { ReportComponent } from '../../report/report.component';
import { ReportsIndexComponent } from '../../report/index/index.component';
import { ReportsCreateComponent } from '../../report/create/create.component';
import { ProposalsComponent } from '../../proposals/proposals.component';
import { ProposalsIndexComponent } from '../../proposals/index/index.component';
import { ProposalsCreateComponent } from '../../proposals/create/create.component';
import { DashComponent } from '../../dash/dash.component';








@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    LawsComponent,
    ActivitiesComponent,
    ActivitiesIndexComponent,
    ActivitiesCreateComponent,
    OrdersComponent,
    OrdersIndexComponent,
    OrdersCreateComponent,
    ReportComponent,
    ReportsIndexComponent,
    ReportsCreateComponent,
    ProposalsComponent,
    ProposalsIndexComponent,
    ProposalsCreateComponent,
    DashComponent
  ]
})

export class AdminLayoutModule {}
