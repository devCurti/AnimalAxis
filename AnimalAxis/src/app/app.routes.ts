import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterPetComponent } from './components/pet/register-pet/register-pet.component';
import { DetailsPetComponent } from './components/pet/details-pet/details-pet.component';
import { SearchPetComponent } from './components/pet/search-pet/search-pet.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [ {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'pet/register', component: RegisterPetComponent, canActivate: [AuthGuard]},
    { path: 'pet/details', component: DetailsPetComponent, canActivate: [AuthGuard]},
    { path: 'pet/search', component: SearchPetComponent, canActivate: [AuthGuard]},
    { path: 'register', component: RegisterComponent},
 ];
