import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    console.log(token);

    const currentRoute = this.router.url;

    // Se o usuário estiver logado (token existe)
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }

  }

}
