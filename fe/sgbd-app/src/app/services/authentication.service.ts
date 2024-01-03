import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { LoginRequest } from 'src/app/models/login-request';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl: string = environment.apiUrl;

  isUserAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { 
  }

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  async login(authenticationCredentials: LoginRequest): Promise<boolean> {
    let requestObservable = this.http.put<boolean>
      (`${this.apiUrl}/User/Login`, authenticationCredentials, this.httpOptions);
      this.isUserAuthenticatedSubject.value;
      return await lastValueFrom(requestObservable);
  }
  
  getUserAuthenticationStatus(): Observable<boolean> {
    return this.isUserAuthenticatedSubject.asObservable();
  }

  setIsUserAuthenticated(value: boolean){
    this.isUserAuthenticatedSubject.next(value)
  }

  async logout(){
    let requestObservable = this.http.put<boolean>
      (`${this.apiUrl}/User/Logout`, this.httpOptions);
    var result =  await lastValueFrom(requestObservable);

    this.isUserAuthenticatedSubject.next(result);
    this.router.navigate(['']);
  }
  
  isLoggedIn(){
    return this.isUserAuthenticatedSubject.value
  }
}