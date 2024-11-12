import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegistroMedicamento } from '../models/registroMedicamento';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroMedicamentoService {
  private apiUrl = `${environment.apiUrl}/registroMedicamentos`;
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  constructor(private http: HttpClient) { }


  getRegistroMedicamento(): Observable<RegistroMedicamento[]> {
    return this.http.get<RegistroMedicamento[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getRegistroMedicamentosById(id: number): Observable<RegistroMedicamento> {
    return this.http.get<RegistroMedicamento>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  addRegistroMedicamento(registroMedicamento: RegistroMedicamento): Observable<RegistroMedicamento> {
    return this.http.post<RegistroMedicamento>(this.apiUrl, registroMedicamento, { headers: this.getHeaders() });
  }

  editNascimento(id:number, registroMedicamento: RegistroMedicamento): Observable<RegistroMedicamento> {
    return this.http.put<RegistroMedicamento>(`${this.apiUrl}/${id}`, registroMedicamento, { headers: this.getHeaders() });
  }

  deleteMedicamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }


  getRegistroMedicamentosByPetId(id: number): Observable<RegistroMedicamento> {
    return this.http.get<RegistroMedicamento>(`${this.apiUrl}/byPetId/${id}`, { headers: this.getHeaders() });
  }

}
