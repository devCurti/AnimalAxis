import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { BehaviorSubject } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  private isAuthenticated: boolean = false;
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private auth: Auth, private router: Router, private http: HttpClient) {
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUser(){
    return this.user$;
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.userId,
          email: response.email
        }));
      })
    );
  }

  register(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/register`, usuario);
  }

  async verifyAuth() {
    const token = localStorage.getItem('token');

    await this.http.get<Usuario>(`${this.apiUrl}/verifyAuth`, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    }).pipe(
        catchError(error => {
            this.router.navigate(['/login']);
            return of(null);
        })
    ).subscribe(x => {
        console.log('Autenticado!');
    });
}
}
