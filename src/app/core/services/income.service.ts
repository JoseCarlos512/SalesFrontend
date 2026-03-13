import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Income } from '../models/income.model';

@Injectable({ providedIn: 'root' })
export class IncomeService {
  private readonly url = `${environment.apiUrl}/incomes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Income[]> {
    return this.http.get<Income[]>(this.url);
  }

  getById(id: number): Observable<Income> {
    return this.http.get<Income>(`${this.url}/${id}`);
  }

  create(income: Partial<Income>): Observable<Income> {
    return this.http.post<Income>(this.url, income);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
