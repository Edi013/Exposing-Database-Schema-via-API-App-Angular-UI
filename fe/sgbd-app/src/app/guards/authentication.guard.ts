import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate{
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }
    canActivate(){
        if(this.authenticationService.isLoggedIn()){
          return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}

