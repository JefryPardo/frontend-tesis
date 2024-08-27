import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  estadoAutentificacion: boolean;

  constructor(
    private router: Router,
    private jwtService: JwtService,
  ) {}

  //boolean
  // Promise <boolean>
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise <boolean> {

    // return true;
    return new Promise((resolve, reject) => {

      if (state.url == '/login') {
        
        let token = localStorage.getItem('token');
        if (!token) {

            localStorage.clear();
            resolve(true);
        }
        
        else if (token && this.jwtService.isTokenExpired(token)) {
          
          localStorage.clear();
          resolve(true);
        }
        
        else if(token && !this.jwtService.isTokenExpired(token)) {
          
          resolve(false);
        }
      }else {
        
        let token = localStorage.getItem('token');
        if (token && this.jwtService.isTokenExpired(token)) {

          localStorage.clear();
          this.router.navigate(['/login']);
          resolve(false);

        } else if (token && !this.jwtService.isTokenExpired(token)) {

          resolve(true);
        } else if (!token) {

          localStorage.clear();
          this.router.navigate(['/login']);
          resolve(false);
        }
      }
    });
  }
}