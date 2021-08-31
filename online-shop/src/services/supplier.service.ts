import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { handleError } from './helpers';
import { Supplier } from 'src/interfaces/Supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<Array<Supplier>> {
    return this.http
      .get<Array<Supplier>>(`${environment.serverConnection}/suppliers`)
      .pipe(catchError(handleError));
  }
}
