// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// import { NgxPermissionsService } from 'ngx-permissions';
// import { JwtService } from 'src/app/services/jwt.service';
// import { environment } from 'src/environments/environment';

// @Injectable()
// export class AuthGuard implements CanActivate {
  
//   estadoAutentificacion: boolean;

//   constructor(
//     private jwtService: JwtService,
//     private permissionsService: NgxPermissionsService,
//     private router: Router,
//   ) {}

//   //boolean
//   // Promise <boolean>
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise <boolean> {

//     // return true;
//     return new Promise((resolve, reject) => {

//       if (state.url == '/login') {

        
//         let token = localStorage.getItem(environment.nombreToken);
//         if (token && this.jwtService.isTokenExpired(token)) {
          
//           localStorage.clear();
//           this.permissionsService.flushPermissions();
//           resolve(true);
//         }
        
//         else if(token && !this.jwtService.isTokenExpired(token)) {
          
          
//           this.permissionsService.flushPermissions();
//           let permisos: string[] = this.jwtService.decodeToken(token).rol.split(',');
//           this.permissionsService.loadPermissions(permisos);
//           let listaPermisos = this.permissionsService.getPermissions();
          
//           Object.keys(listaPermisos).forEach((key: any, index) => {
            
//             if (key == 206) {
              
//               this.router.navigate([`/terminal`]);
//             }
//           });

//           resolve(false);
//         } 
        
//         else if (!token) {

//           this.permissionsService.flushPermissions();
//           localStorage.clear();
//           resolve(true);
//         }
//       }else {
        
//         let token = localStorage.getItem(environment.nombreToken);
//         if (token && this.jwtService.isTokenExpired(token)) {

//           this.permissionsService.flushPermissions();
//           localStorage.clear();
//           this.router.navigate(['/login']);
//           resolve(false);
//         } else if (token && !this.jwtService.isTokenExpired(token)) {

//           this.permissionsService.flushPermissions();
//           let permisos: string[] = this.jwtService.decodeToken(token).rol.split(',');
//           this.permissionsService.loadPermissions(permisos);
//           resolve(true);
//         } else if (!token) {

//           this.permissionsService.flushPermissions();
//           localStorage.clear();
//           this.router.navigate(['/login']);
//           resolve(false);
//         }
//       }
//     });
//   }
// }