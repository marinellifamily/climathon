import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
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




export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'laws', component: LawsComponent},
    { path: 'activities', component: ActivitiesComponent, children: [
        { path: '', component: ActivitiesIndexComponent},
        { path: 'create', component: ActivitiesCreateComponent},
        { path: ':id', component: ActivitiesCreateComponent }
    ]},
    { path: 'orders', component: OrdersComponent, children: [
        { path: '', component: OrdersIndexComponent},
        { path: 'create', component: OrdersCreateComponent},
        { path: ':id', component: OrdersCreateComponent }
    ]},
    { path: 'reports', component: ReportComponent, children: [
        { path: '', component: ReportsIndexComponent },
        { path: 'create', component: ReportsCreateComponent }
    ]},
    { path: 'proposals', component: ProposalsComponent, children: [
        { path: '', component: ProposalsIndexComponent },
        { path: 'create', component: ProposalsCreateComponent },
        { path: ':id', component: ProposalsCreateComponent }
    ]}
];
