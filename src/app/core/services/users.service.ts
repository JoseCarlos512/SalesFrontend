import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserList, UserDetail } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly url = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<UserList[]> {
    return this.http.get<UserList[]>(this.url);
  }

  getById(id: number): Observable<UserDetail> {
    return this.http.get<UserDetail>(`${this.url}/${id}`);
  }

  create(user: { usuario: string; password: string; idRol: number }): Observable<UserDetail> {
    return this.http.post<UserDetail>(this.url, user);
  }

  update(id: number, user: { usuario: string; idRol: number }): Observable<UserDetail> {
    return this.http.put<UserDetail>(`${this.url}/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
