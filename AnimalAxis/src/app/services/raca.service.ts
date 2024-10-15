import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Raca } from '../models/raca';

@Injectable({
  providedIn: 'root'
})
export class RacaService {
  private apiUrl = `${environment.apiUrl}/racas`;

  constructor(private http: HttpClient) {}

  getRacas(): Observable<Raca[]> {
    return this.http.get<Raca[]>(this.apiUrl);
  }

  addRacas(raca: Raca): Observable<Raca> {
    console.log(raca)
    return this.http.post<Raca>(this.apiUrl, raca);
  }

  getRacaById(id: number): Observable<Raca> {
    return this.http.get<Raca>(`${this.apiUrl}/${id}`);
  }
}
