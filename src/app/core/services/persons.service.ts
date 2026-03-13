import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Person } from '../models/person.model';

@Injectable({ providedIn: 'root' })
export class PersonsService {
  private readonly url = `${environment.apiUrl}/persons`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.url);
  }

  getById(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.url}/${id}`);
  }

  create(person: Partial<Person>): Observable<Person> {
    return this.http.post<Person>(this.url, person);
  }

  update(id: number, person: Partial<Person>): Observable<Person> {
    return this.http.put<Person>(`${this.url}/${id}`, person);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
