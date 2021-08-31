import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from 'src/interfaces/Category';
import { handleError } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Array<Category>> {
    return this.http
      .get<Array<Category>>(`${environment.serverConnection}/categories`)
      .pipe(catchError(handleError));
  }
}
