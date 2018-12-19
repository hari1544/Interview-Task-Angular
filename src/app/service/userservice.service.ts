import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import 'rxjs/add/operator/map';
import { mergeMap } from "rxjs/operators";

@Injectable()
export class UserserviceService {

  constructor(private http: HttpClient, private apiservice:ApiService) { }  

  register(userInfo):Observable<any> {
    console.log(userInfo);
    return this.apiservice.post('/btfusers', userInfo).map((response) => {
      console.log(response);
      return response;
    })
  }



  login(loginCredential): Observable<any> {
    return this.apiservice.post('/btfusers/login', loginCredential).map((response) => { 
      this.saveToken(response);      
        return response;
      }
    );
  }

  getUserInfo():Observable<any>{
    let userId = this.getUserId();
    return this.apiservice.get(`/btfusers/${userId}`).map((data) => {
      return data;
    });    
  }

  logout():Observable<any>{
    let token = this.getToken();
    return this.apiservice.post(`/btfusers/logout?access_token=${token}`).map((data) => {
      this.destroyToken();
      return data;
    });   
  }

  getToken(): string {
    return window.localStorage['token'];
  }

  getUserId(): string {
    return window.localStorage['userId'];
  }

  saveToken(token: string) {
    window.localStorage['userId'] = token['userId'];
    window.localStorage['token'] = token['id'];
  }
  destroyToken() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userId');
  }

  userNameValidation(userName): Observable<any> {
    return this.apiservice.get(`/btfusers?filter[where][username]=${userName}`).map(response => {
      return response;
    })
  }

  emailValidation(email): Observable<any> {
    return this.apiservice.get(`/btfusers?filter[where][email]=${email}`).map(response => {
      return response
    })
  }

}
