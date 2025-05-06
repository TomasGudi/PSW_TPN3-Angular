import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule si usas directivas como *ngIf, *ngFor, o pipes como 'date'

@Component({
  selector: 'app-footer',
  standalone: true, // Marcamos como standalone
  imports: [CommonModule], // Añadimos CommonModule a los imports del componente standalone
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  anioActual: number = new Date().getFullYear();
}
