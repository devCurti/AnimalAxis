import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pet } from '../models/pet';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private apiUrl = `${environment.apiUrl}/pets`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho
    });
  }

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getPetsMachos(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/machos`, { headers: this.getHeaders() });
  }

  getPetsFemeas(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/femeas`, { headers: this.getHeaders() });
  }

  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet, { headers: this.getHeaders() });
  }

  editPet(id:number, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, pet, { headers: this.getHeaders() });
  }

  getPetById(petId: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${petId}`, { headers: this.getHeaders() });
  }

  filter(filterObject: any): Observable<Pet[]> {
    return this.http.post<Pet[]>(`${this.apiUrl}/filter`, filterObject, {
      headers: this.getHeaders()
    });
  }
  
}

