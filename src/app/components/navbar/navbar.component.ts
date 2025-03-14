import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(){

  }

  logout() {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      localStorage.removeItem('userSession');
      window.location.reload();
    }
  }
}
