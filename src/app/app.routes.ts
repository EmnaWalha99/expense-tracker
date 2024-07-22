import { Routes } from '@angular/router';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './auth/auth.guard';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SignupComponent } from './signup/signup.component';

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
            { path: 'dashbord', component: DashbordComponent}
            
          ]
    },
    {
        path : 'signup' , 
        component :SignupComponent ,
    },
    {
        path : 'dashbord',
        component :DashbordComponent,
        //canActivate :[authGuard],
    },
    {
        path : 'sidebar',
        component:SidebarComponent,
    }
    ,{
        path :'profile',
        component:ProfileComponent,
    },{
        path: 'addexpense',
        component : AddexpenseComponent,
    }
    ,{
        path :'admin' , component:AdminComponent,
        canActivate :[authGuard],
    }
] ; 
