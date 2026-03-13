import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Provider } from '../models/person.model';

@Injectable({ providedIn: 'root' })
export class ProvidersService {
  private readonly url = `${environment.apiUrl}/providers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.url);
  }

  getById(id: number): Observable<Provider> {
    return this.http.get<Provider>(`${this.url}/${id}`);
  }

  create(provider: Partial<Provider>): Observable<Provider> {
    return this.http.post<Provider>(this.url, provider);
  }

  update(id: number, provider: Partial<Provider>): Observable<Provider> {
    return this.http.put<Provider>(`${this.url}/${id}`, provider);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
