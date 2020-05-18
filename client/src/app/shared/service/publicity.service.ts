import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicityService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  addPublicities(publicity) {

    return this.httpClient.post('http://localhost:3000/addPublicity', publicity , {observe: 'response'});
  }

  getPublicities () {
    return this.httpClient.get('http://localhost:3000/publicities' );
  }

  updatePublicity(id, data): Observable<any> {
    let url = `http://localhost:3000/updatePublicity/${id}`;
    return this.httpClient.patch(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )

  }
  getPublicityById(id): Observable<any> {
    let url = `http://localhost:3000/publicity/${id}`;
    return this.httpClient.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
 // Delete publicity
 deletePublicity(id): Observable<any> {
  let url = `http://localhost:3000/removePublicity/${id}`;
  return this.httpClient.delete(url, { headers: this.headers }).pipe(
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
