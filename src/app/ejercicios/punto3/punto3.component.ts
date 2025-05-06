import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor, *ngIf, etc.

@Component({
  selector: 'app-punto3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto3.component.html',
  styleUrl: './punto3.component.css'
})
export class Punto3Component implements OnInit {
  palabrasSecretas: string[] = ['ANGULAR', 'TYPESCRIPT', 'COMPONENTE', 'SERVICIO', 'MODULO', 'ENRUTADOR'];
  categoria: string = "Conceptos de Programación Web";
  // palabrasSecretas: string[] = ['ELEFANTE', 'HIPOPOTAMO', 'ZEBRA', 'SALAMANDRA', 'TAPIR', 'PINGUINO'];
  // categoria: string = "Animales";
  palabraOculta: string = '';
  palabraMostrada: string[] = [];
  intentosMaximos: number = 6; // 0 errores hasta 6 errores (7 imágenes)
  intentosRestantes: number = 0;
  letrasIntentadas: string[] = [];
  letrasErroneas: string[] = [];
  juegoTerminado: boolean = false;
  mensajeFinal: string = '';
  imagenAhorcadoUrl: string = '';
  alfabeto: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor() {}

  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego(): void {
    this.palabraOculta = this.palabrasSecretas[Math.floor(Math.random() * this.palabrasSecretas.length)];
    this.palabraMostrada = Array(this.palabraOculta.length).fill('_');
    this.intentosRestantes = this.intentosMaximos;
    this.letrasIntentadas = [];
    this.letrasErroneas = [];
    this.juegoTerminado = false;
    this.mensajeFinal = '';
    this.actualizarImagenAhorcado();
    // Habilitar todos los botones de letras
    this.alfabeto.forEach(letra => {
      const btn = document.getElementById('btn-' + letra) as HTMLButtonElement | null;
      if (btn) {
        btn.disabled = false;
      }
    });
  }

  procesarLetra(letra: string): void {
    if (this.juegoTerminado || this.letrasIntentadas.includes(letra)) {
      return;
    }

    this.letrasIntentadas.push(letra);
    // Deshabilitar el botón de la letra presionada
    const btn = document.getElementById('btn-' + letra) as HTMLButtonElement | null;
    if (btn) {
      btn.disabled = true;
    }

    if (this.palabraOculta.includes(letra)) {
      for (let i = 0; i < this.palabraOculta.length; i++) {
        if (this.palabraOculta[i] === letra) {
          this.palabraMostrada[i] = letra;
        }
      }
      if (!this.palabraMostrada.includes('_')) {
        this.juegoTerminado = true;
        this.mensajeFinal = '¡Felicidades! ¡Has ganado!';
        this.mostrarModalFinal();
      }
    } else {
      this.letrasErroneas.push(letra);
      this.intentosRestantes--;
      this.actualizarImagenAhorcado();
      if (this.intentosRestantes <= 0) {
        this.juegoTerminado = true;
        this.mensajeFinal = `¡Has perdido! La palabra era: ${this.palabraOculta}`;
        this.palabraMostrada = this.palabraOculta.split(''); // Mostrar la palabra completa
        this.mostrarModalFinal();
      }
    }
  }

  actualizarImagenAhorcado(): void {
    const numeroErrores = this.intentosMaximos - this.intentosRestantes;
    if (numeroErrores < 7) {
    this.imagenAhorcadoUrl = `assets/images/ahorcado/ahorcado_${numeroErrores}.png`;
    }
  }

  mostrarModalFinal(): void {
    // Pequeño hack para asegurar que el modal se muestre después de que Angular actualice la vista
    setTimeout(() => {
      const modalElement = document.getElementById('resultadoModal');
      if (modalElement) {
        // @ts-ignore // Para evitar error de tipo con bootstrap
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }, 100);
  }

}
