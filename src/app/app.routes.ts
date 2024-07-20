import { Routes } from '@angular/router';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {
        path :'' , 
        component :HomeComponent,
    },
    {
        path :'login',
        component :LoginComponent,
    },
    {
        path : 'signup' , 
        component :SignupComponent ,
    },
    {
        path : 'dashbord',
        component :DashbordComponent,
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
] ; 
