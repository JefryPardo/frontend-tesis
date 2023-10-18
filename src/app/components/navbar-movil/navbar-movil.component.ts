import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-movil',
  templateUrl: './navbar-movil.component.html',
  styleUrls: ['./navbar-movil.component.scss']
})
export class NavbarMovilComponent {

  items = [
    { text: 'Cotizaciones', active: false, icon: 'pi pi-id-card' },
    { text: 'Ganancia', active: false, icon: 'pi pi-percentage' },
    { text: 'Catalogo', active: true, icon: 'pi pi-book' },
    { text: 'Favoritos', active: false, icon: 'pi pi-star' },
    { text: 'Perfil', active: false, icon: 'pi pi-user' }
  ];

  activateItem(selectedItem:any) {
    this.items.forEach(item => (item.active = false));
    selectedItem.active = true;
  }
}
