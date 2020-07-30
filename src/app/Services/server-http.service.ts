import { Injectable } from "@angular/core";
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";
import { throwError } from "rxjs/internal/observable/throwError";
import { Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Users } from "../models/Users";
@Injectable({
  providedIn: "root",
})
export class ServerHttpService {
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      // Authorization: 'my-auth-token',
      // Authorization: 'Basic ' + btoa('username:password'),
    }),
  };
  private REST_API_BankToken = "https://api.stripe.com/v1/tokens";
  private REST_API_SERVER = "https://5f0eb150faef3500160b87ab.mockapi.io/api";
  private REST_API_SERVER_COVID = "https://api.covid19api.com";
  constructor(private httpClient: HttpClient) {}

  public getBankToken(object) {
    const url = `${this.REST_API_BankToken}` + object ;
    return this.httpClient.get<any>(url)
    .pipe(catchError(this.handleError));
  }

  public getDataCovid(): Observable<any> {
    const url = `${this.REST_API_SERVER_COVID}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getDataCovidCountry(): Observable<any> {
    const url = `${this.REST_API_SERVER_COVID}/summary`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getusers(): Observable<any> {
    // const url = `${this.REST_API_SERVER}/students`;
    const url = `${this.REST_API_SERVER}/users`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  public getUser(id: number) {
    const url = `${this.REST_API_SERVER}/users/` + id;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public adduser(data: Users) {
    const url = `${this.REST_API_SERVER}/users`;
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  public deleteUser(id: number) {
    const url = `${this.REST_API_SERVER}/users/` + id;
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
  }
  public updateUser(data: Users) {
    const url = `${this.REST_API_SERVER}/users/` + data.id;
    return this.httpClient
      .put<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
