import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  logout() {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      localStorage.removeItem('userSession');
      window.location.reload();
    }
  }
}
