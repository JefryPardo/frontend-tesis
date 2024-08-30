import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-hub',
  templateUrl: './inicio-hub.component.html',
  styleUrls: ['./inicio-hub.component.scss']
})
export class InicioHubComponent {

  constructor(private router: Router){}

  cerrar() {

    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
