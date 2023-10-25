import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  helper: any;
  constructor() {
    this.helper = new JwtHelperService();
  }

  decodeToken(token: string) {
    return this.helper.decodeToken(token);
  }

  getTokenExpirationDate(token: string) {
    return this.helper.getTokenExpirationDate(token);
  }

  isTokenExpired(token: string) {
    return this.helper.isTokenExpired(token);
  }

  getHttpOptionsWithToken(token: string): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
}
