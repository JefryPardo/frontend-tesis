import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-movil-publico',
  templateUrl: './navbar-movil-publico.component.html',
  styleUrls: ['./navbar-movil-publico.component.scss']
})
export class NavbarMovilPublicoComponent {

  items = [
    { text: 'Catalogo', active: true, icon: 'pi pi-book' },
    { text: 'Perfil', active: false, icon: 'pi pi-user' }
  ];

  activateItem(selectedItem:any) {
    this.items.forEach(item => (item.active = false));
    selectedItem.active = true;
  }
}
