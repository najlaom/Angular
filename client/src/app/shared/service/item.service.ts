import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  addarticle(article) {

    return this.httpClient.post('http://localhost:3000/item/create-item', article , {observe: 'response'});
  }
  getarticle () {
    return this.httpClient.get('http://localhost:3000/items' );
  }
  deletearticle(id): Observable<any> {
    let url = `http://localhost:3000/removeItem/${id}`;
    return this.httpClient.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
  getarticleByID(id): Observable<any> {
    let url = `http://localhost:3000/item/${id}`;
    return this.httpClient.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updatearticle(id, data): Observable<any> {
    let url = `http://localhost:3000/updateItem/${id}`;
    return this.httpClient.patch(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )

}
  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
