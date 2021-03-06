import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { QuanlyuserComponent } from 'src/app/pages/quanlyuser/quanlyuser.component';
import { AdduserComponent } from 'src/app/pages/adduser/adduser.component';
import { ChartjsComponent } from 'src/app/pages/chartjs/chartjs.component';
import { BanktokenComponent } from 'src/app/pages/banktoken/banktoken.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'quanlyusers',      component: QuanlyuserComponent },
    { path: 'add-user/:id', component: AdduserComponent },
    { path: 'chartjs', component: ChartjsComponent },
    { path: 'banktoken', component: BanktokenComponent },
];
