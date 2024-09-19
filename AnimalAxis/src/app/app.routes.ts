import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterPetComponent } from './components/pet/register-pet/register-pet.component';
import { DetailsPetComponent } from './components/pet/details-pet/details-pet.component';
import { SearchPetComponent } from './components/pet/search-pet/search-pet.component';

export const routes: Routes = [ {path: 'home', component: HomeComponent},
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'pet/register', component: RegisterPetComponent},
    { path: 'pet/details', component: DetailsPetComponent},
    { path: 'pet/search', component: SearchPetComponent}
 ];
