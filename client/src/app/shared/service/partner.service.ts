import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Event } from 'src/app/shared/model/event';
import { Observable ,of  } from 'rxjs';
import { catchError, map ,tap } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  event : Array<Event> = [];

  constructor(private httpClient: HttpClient) { }

  createAccount(partner) {

    return this.httpClient.post('http://localhost:3000/signup', partner , {observe: 'response'});
  }

  auth(partner) {
    return this.httpClient.post('http://localhost:3000/signin', partner , {observe: 'response'});
  }

  getPartnerByID(id): Observable<any> {
    let url = `http://localhost:3000/partner/${id}`;
    return this.httpClient.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  updateProfile(id, data): Observable<any> {
    let url = `http://localhost:3000/updatePartner/${id}`;
    return this.httpClient.patch(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )

}
  //////*******/ /*Events */****//////
 
  addEvents(event) {

    return this.httpClient.post('http://localhost:3000/addEvent', event , {observe: 'response'});
  }
  getEvents () {
    return this.httpClient.get('http://localhost:3000/events' );
  }
  deleteEvent(id: any): Observable<any> {
    let url = `http://localhost:3000/removeEvent/${id}`;
    return this.httpClient.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  
  }
  getEventByID(id): Observable<any> {
    let url = `http://localhost:3000/event/${id}`;
    return this.httpClient.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  
    updateEvent(id, data): Observable<any> {
      let url = `http://localhost:3000/updateEvent/${id}`;
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
