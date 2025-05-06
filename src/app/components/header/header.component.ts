import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importamos RouterModule

@Component({
  selector: 'app-header',
  standalone: true, // Marcamos como standalone
  imports: [RouterModule], // Añadimos RouterModule para directivas como routerLink
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
}
