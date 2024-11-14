import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = environment.apiUrl;

  private readonly httpClient = inject(HttpClient);

  public categories = signal<Category[]>([]);

  public getCategories(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(`${this.apiUrl}/categories`)
      .pipe(tap(categories => this.categories.set(categories)));
  }
}
