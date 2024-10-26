import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Medicamento } from '../models/medicamento';
import { RegistroReprodutivo } from '../models/registroReprodutivo';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroReprodutivoService {
  private apiUrl = `${environment.apiUrl}/RegistroReprodutivos`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getRegistroReprodutivos(): Observable<RegistroReprodutivo[]> {
    return this.http.get<RegistroReprodutivo[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  addRegistroReprodutivo(registroReprodutivo: RegistroReprodutivo): Observable<RegistroReprodutivo> {
    return this.http.post<RegistroReprodutivo>(this.apiUrl, registroReprodutivo, { headers: this.getHeaders() });
  }

  getRegistroReprodutivosById(id: number): Observable<RegistroReprodutivo> {
    return this.http.get<RegistroReprodutivo>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  editRegistroReprodutivos(id:number, registroReprodutivo: RegistroReprodutivo): Observable<RegistroReprodutivo> {
    return this.http.put<RegistroReprodutivo>(`${this.apiUrl}/${id}`, registroReprodutivo, { headers: this.getHeaders() });
  }

  deleteRegistroReprodutivos(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
}
}
