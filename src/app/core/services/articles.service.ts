import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Article } from '../models/article.model';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  private readonly url = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url);
  }

  getById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.url}/${id}`);
  }

  create(article: Partial<Article>): Observable<Article> {
    return this.http.post<Article>(this.url, article);
  }

  update(id: number, article: Partial<Article>): Observable<Article> {
    return this.http.put<Article>(`${this.url}/${id}`, article);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
