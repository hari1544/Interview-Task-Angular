import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";

import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { catchError } from "rxjs/operators/catchError";

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }

    private formatErrors(error: any) {
        return new ErrorObservable(error.error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${environment.api_url}${path}`, { params }).pipe(catchError(this.formatErrors));
    }

    put(path: string, body: object = {}): Observable<any> {
        return this.http.put(`${environment.api_url}${path}`, body).pipe(catchError(this.formatErrors));
    }
    patch(path: string, body: object = {}): Observable<any> {
        return this.http.patch(`${environment.api_url}${path}`, body).pipe(catchError(this.formatErrors));
    }

    post(path: string, body: object = {}): Observable<any> {
        return this.http.post(`${environment.api_url}${path}`, body).pipe(catchError(this.formatErrors));
    }

    delete(path: string): Observable<any> {
        return this.http.delete(`${environment.api_url}${path}`).pipe(catchError(this.formatErrors));
    }
}
