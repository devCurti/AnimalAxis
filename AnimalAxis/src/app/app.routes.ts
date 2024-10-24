import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterPetComponent } from './components/pet/register-pet/register-pet.component';
import { DetailsPetComponent } from './components/pet/details-pet/details-pet.component';
import { SearchPetComponent } from './components/pet/search-pet/search-pet.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';
import { RegisterNascimentoComponent } from './components/nascimento/register-nascimento/register-nascimento.component';
import { SearchNascimentoComponent } from './components/nascimento/search-nascimento/search-nascimento.component';

export const routes: Routes = [ {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'pet/register', component: RegisterPetComponent, canActivate: [AuthGuard]},
    { path: 'pet/details/:id', component: DetailsPetComponent, canActivate: [AuthGuard]},
    { path: 'pet/search', component: SearchPetComponent, canActivate: [AuthGuard]},
    { path: 'register', component: RegisterComponent},
    { path: 'pet/details', component: DetailsPetComponent, canActivate: [AuthGuard]},
    { path: 'pet/register/:id', component: RegisterPetComponent, canActivate: [AuthGuard]},
    { path: 'nascimento/register', component: RegisterNascimentoComponent, canActivate: [AuthGuard]},
    { path: 'nascimento/search', component: SearchNascimentoComponent, canActivate: [AuthGuard]},
    { path: 'nascimento/register/:id', component: RegisterNascimentoComponent, canActivate: [AuthGuard]},

    
 ];
