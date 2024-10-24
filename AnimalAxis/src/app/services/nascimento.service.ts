import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Nascimento } from '../models/nascimento';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NascimentoService {

  private apiUrl = `${environment.apiUrl}/Nascimentos`;
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  constructor(private http: HttpClient) {}

  getNascimentos(): Observable<Nascimento[]> {
    return this.http.get<Nascimento[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  addNascimento(cor: Nascimento): Observable<Nascimento> {
    return this.http.post<Nascimento>(this.apiUrl, cor, { headers: this.getHeaders() });
  }

  getNascimentoById(id: number): Observable<Nascimento> {
    return this.http.get<Nascimento>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  editNascimento(id:number, nascimento: Nascimento): Observable<Nascimento> {
    return this.http.put<Nascimento>(`${this.apiUrl}/${id}`, nascimento, { headers: this.getHeaders() });
  }

  deleteNascimento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
}

}
