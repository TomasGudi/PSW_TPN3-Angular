import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngFor, pipes, etc. en componentes standalone

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  img: string;
  precio: number;
}

@Component({
  selector: 'app-punto2',
  standalone: true, // Marcamos como standalone
  imports: [CommonModule], // Importamos CommonModule
  templateUrl: './punto2.component.html',
  styleUrl: './punto2.component.css'
})
export class Punto2Component {
  productosDestacados: Producto[] = [
    {
      id: 101,
      nombre: 'Notebook Asus Vivobook 15',
      descripcion: 'Intel Core i5, 8GB RAM, 512GB SSD, Pantalla 15.6" FHD. Ideal para trabajo y estudio.',
      img: 'assets/images/productos/producto1.jpg',
      precio: 750000.99
    },
    {
      id: 102,
      nombre: 'Monitor LG 24" IPS',
      descripcion: 'Full HD (1920x1080), 75Hz, Diseño sin bordes. Colores vibrantes y amplios ángulos de visión.',
      img: 'assets/images/productos/producto2.jpg', 
      precio: 185000
    },
    {
      id: 103,
      nombre: 'Teclado Mecánico Redragon K552',
      descripcion: 'Switches Outemu Blue, Retroiluminación RGB, Compacto TKL. Excelente respuesta táctil.',
      img: 'assets/images/productos/producto3.jpg', 
      precio: 55000
    },
    {
      id: 104,
      nombre: 'Mouse Gamer Logitech G203',
      descripcion: 'Sensor 8000 DPI, Iluminación RGB Lightsync, 6 botones programables. Precisión y comodidad.',
      img: 'assets/images/productos/producto4.jpg', 
      precio: 35750
    }
  ];

  carrito: Producto[] = [];

  constructor() {}

  agregarAlCarrito(producto: Producto): void {
    if (!this.estaEnCarrito(producto.id)) {
      this.carrito.push(producto);
    }
  }

  estaEnCarrito(productoId: number): boolean {
    return this.carrito.some(p => p.id === productoId);
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.precio, 0);
  }

 }
