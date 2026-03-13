import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Sale, BillingResponse } from '../models/sale.model';

@Injectable({ providedIn: 'root' })
export class SalesService {
  private readonly url = `${environment.apiUrl}/sales`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.url);
  }

  getById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.url}/${id}`);
  }

  create(sale: Partial<Sale>): Observable<Sale> {
    return this.http.post<Sale>(this.url, sale);
  }

  update(id: number, sale: Partial<Sale>): Observable<Sale> {
    return this.http.put<Sale>(`${this.url}/${id}`, sale);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  sendToSunat(saleId: number): Observable<BillingResponse> {
    return this.http.post<BillingResponse>(`${environment.apiUrl}/billing/${saleId}`, {});
  }
}
