import { Routes } from '@angular/router';
import { DashbordComponent } from './account/account.component';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { InsightsComponent } from './insights/insights.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ScanreceiptComponent } from './scanreceipt/scanreceipt.component';
import { SignupComponent } from './signup/signup.component';
import { TrackerComponent } from './tracker/tracker.component';


export const routes: Routes = [
    {
        path :'' ,
        /* redirectTo:'/login', pathMatch:'full',*/
        component :HomeComponent,
    },
    {
        path :'login',
        component :LoginComponent,
        
        children: [
            { path: 'profile', component:ProfileComponent ,}
            
          ]
    },
    {
        path : 'signup' , 
        component :SignupComponent ,
    },
    {
        path : 'account',
        component :DashbordComponent ,
        canActivate :[authGuard],
    },
    {
        path :'profile',
        component:ProfileComponent,
        canActivate :[authGuard],

    }
    ,{
        path: 'addexpense',
        component : AddexpenseComponent,
        canActivate :[authGuard],

    }
    ,{
        path :'admin' , component:AdminComponent,
        canActivate :[authGuard],
    },{
        path : 'scanreceipt' , 
        component :ScanreceiptComponent,
        canActivate :[authGuard],

    },
    {
        path :'insights',
        component :InsightsComponent,
        canActivate :[authGuard],

    },
    {
        path:'track-expenses',
        component: TrackerComponent,
        canActivate:[authGuard],
    }
] ; 
