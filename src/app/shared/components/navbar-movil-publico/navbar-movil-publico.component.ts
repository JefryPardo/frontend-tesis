import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Scroll } from '@angular/router';

@Component({
  selector: 'app-navbar-movil-publico',
  templateUrl: './navbar-movil-publico.component.html',
  styleUrls: ['./navbar-movil-publico.component.scss']
})
export class NavbarMovilPublicoComponent implements OnInit {

  items = [
    { text: 'Catalogo', active: true,   icon: 'pi pi-book', ruta: 'auth/home' },
    { text: 'Perfil',   active: false,  icon: 'pi pi-user', ruta: 'auth/login' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {

    this.router.events.subscribe((event) => {
      
      if (event instanceof Scroll) {
        
        let currentRoute = event.routerEvent.url;

        if(currentRoute.includes('auth/register')) currentRoute = 'auth/login';

        let estado: boolean = false;
        this.items.forEach((item) => {

          if(currentRoute.includes(item.ruta)) {

            item.active = true;
            estado = true;
          }else {
            
            item.active = false;
          }

        });

        if(!estado) {

          this.items.forEach((item) => {

            if('auth/home'.includes(item.ruta)) {
  
              item.active = true;
              estado = true;
            }else {
              
              item.active = false;
            }
  
          });
        }
      }
    });
  }

  activateItem(selectedItem:any) {
    this.items.forEach(item => (item.active = false));
    selectedItem.active = true;
  }
}
