import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Boleto { // Definición de la interfaz directamente aquí
  id?: number;
  dni: string;
  precioOriginal: number;
  precioFinal?: number;
  categoriaTurista: number; // 1: Menor, 2: Adulto, 3: Jubilado
  fechaCompra: Date;
  email: string;
}

@Injectable({
  providedIn: 'root' // Disponible en toda la aplicación
})
export class BoletoService {
  private boletos: Boleto[] = [];
  private _boletosSubject: BehaviorSubject<Boleto[]> = new BehaviorSubject<Boleto[]>([]);
  public readonly boletos$: Observable<Boleto[]> = this._boletosSubject.asObservable();
  private nextId: number = 1;

  constructor() {
    // Podrías cargar datos iniciales desde localStorage si quisieras persistencia
  }

  private actualizarBoletos(): void {
    this._boletosSubject.next([...this.boletos]);
  }

  agregarBoleto(boleto: Boleto): void {
    boleto.id = this.nextId++;
    this.boletos.push(boleto);
    this.actualizarBoletos();
  }

  obtenerBoletos(): Boleto[] {
    return [...this.boletos]; // Devuelve una copia para evitar mutaciones externas
  }

  // Opcional: Métodos para actualizar y eliminar si los necesitas más adelante
  /*
  actualizarBoleto(boletoActualizado: Boleto): void {
    const index = this.boletos.findIndex(b => b.id === boletoActualizado.id);
    if (index !== -1) {
      this.boletos[index] = boletoActualizado;
      this.actualizarBoletos();
    }
  }

  eliminarBoleto(id: number): void {
    this.boletos = this.boletos.filter(b => b.id !== id);
    this.actualizarBoletos();
  }
  */
}
