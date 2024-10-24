import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cor } from '../models/cor';

@Injectable({
  providedIn: 'root'
})
export class CorService {

  private apiUrl = `${environment.apiUrl}/cor`;

  constructor(private http: HttpClient) {}

  getCores(): Observable<Cor[]> {
    return this.http.get<Cor[]>(this.apiUrl);
  }

  addCor(cor: Cor): Observable<Cor> {
    return this.http.post<Cor>(this.apiUrl, cor);
  }

  getCorById(id: number): Observable<Cor> {
    return this.http.get<Cor>(`${this.apiUrl}/${id}`);
  }
}
