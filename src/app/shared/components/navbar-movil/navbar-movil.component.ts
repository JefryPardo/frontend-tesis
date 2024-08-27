import { Component, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';

@Component({
  selector: 'app-navbar-movil',
  templateUrl: './navbar-movil.component.html',
  styleUrls: ['./navbar-movil.component.scss']
})
export class NavbarMovilComponent implements OnInit {

  items = [
    { text: 'Cotizaciones', active: false, icon: 'pi pi-id-card',     ruta: 'app/cotizacion'  },
    { text: 'Catalogo',     active: true,  icon: 'pi pi-book',        ruta: 'app/catalogo'    },
    { text: 'Perfil',       active: false, icon: 'pi pi-user',        ruta: 'app/perfil'      }
  ];

  constructor(private router: Router) {}

  ngOnInit() {

    this.router.events.subscribe((event) => {
      
      if (event instanceof Scroll) {
        
        let currentRoute = event.routerEvent.url;

        let estado: boolean = false;
        this.items.forEach((item) => {

          if(currentRoute.includes(item.ruta)) {

            item.active = true;
            estado = true;
          }else {
            
            item.active = false;
          }
        });
      }
    });
  }

  activateItem(selectedItem:any) {
    this.items.forEach(item => (item.active = false));
    selectedItem.active = true;
  }
}
