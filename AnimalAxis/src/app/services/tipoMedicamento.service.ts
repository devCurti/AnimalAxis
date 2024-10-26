import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tipoMedicamento } from '../models/tipoMedicamento';

@Injectable({
  providedIn: 'root'
})
export class TipoMedicamentoService {
  private apiUrl = `${environment.apiUrl}/tipoMedicamentos`;

  constructor(private http: HttpClient) {}

  getTipoMedicamentos(): Observable<tipoMedicamento[]> {
    return this.http.get<tipoMedicamento[]>(this.apiUrl);
  }

  getTipoMedicamentosId(id: number): Observable<tipoMedicamento> {
    return this.http.get<tipoMedicamento>(`${this.apiUrl}/${id}`);
  }
}
