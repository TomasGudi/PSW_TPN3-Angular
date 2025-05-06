import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Para directivas y pipes
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Para formularios reactivos
import { BoletoService, Boleto } from '../../servicios/boleto.service'; // Importamos la interfaz Boleto desde el servicio
import { Subscription } from 'rxjs';

// Opcional: Si vas a usar angular-datatables
// import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-punto4',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Para ngModel si usas Template-driven forms (no recomendado aquí)
    ReactiveFormsModule, // Para Reactive Forms
    // DataTablesModule // Descomenta si instalas y usas angular-datatables
  ],
  templateUrl: './punto4.component.html',
  styleUrls: ['./punto4.component.css'], // Cambiado a styleUrls
  providers: [DatePipe] // Para usar DatePipe en el componente si es necesario
})
export class Punto4Component implements OnInit, OnDestroy {
  boletoForm: FormGroup;
  precioFinalCalculado: number | null = null;
  boletosVendidos: Boleto[] = [];
  private boletosSubscription!: Subscription;

  categoriasTurista = [
    { id: 1, nombre: 'Menor (35% desc.)' },
    { id: 2, nombre: 'Adulto (Sin desc.)' },
    { id: 3, nombre: 'Jubilado (50% desc.)' }
  ];

  resumenVentas = {
    menor: { cantidad: 0, total: 0 },
    adulto: { cantidad: 0, total: 0 },
    jubilado: { cantidad: 0, total: 0 },
    general: { cantidad: 0, total: 0 }
  };

  constructor(
    private fb: FormBuilder,
    private boletoService: BoletoService,
    private datePipe: DatePipe // Inyecta DatePipe
  ) {
    this.boletoForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
      precioOriginal: [null, [Validators.required, Validators.min(0.01)]],
      categoriaTurista: [null, Validators.required],
      fechaCompra: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required], // Fecha actual por defecto
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.boletosSubscription = this.boletoService.boletos$.subscribe(boletos => {
      this.boletosVendidos = boletos;
      this.calcularResumenVentas();
    });

    // Escuchar cambios en precioOriginal o categoriaTurista para recalcular
    this.boletoForm.get('precioOriginal')?.valueChanges.subscribe(() => this.calcularPrecioFinal());
    this.boletoForm.get('categoriaTurista')?.valueChanges.subscribe(() => this.calcularPrecioFinal());
  }

  calcularPrecioFinal(): void {
    const precioOriginal = this.boletoForm.get('precioOriginal')?.value;
    const categoriaId = this.boletoForm.get('categoriaTurista')?.value;

    if (precioOriginal != null && categoriaId != null) {
      let descuento = 0;
      if (categoriaId == 1) { // Menor
        descuento = 0.35;
      } else if (categoriaId == 3) { // Jubilado
        descuento = 0.50;
      }
      this.precioFinalCalculado = precioOriginal * (1 - descuento);
    } else {
      this.precioFinalCalculado = null;
    }
  }

  registrarVenta(): void {
    if (this.boletoForm.valid && this.precioFinalCalculado !== null) {
      const formValue = this.boletoForm.value;
      const nuevoBoleto: Boleto = {
        dni: formValue.dni,
        precioOriginal: formValue.precioOriginal,
        categoriaTurista: Number(formValue.categoriaTurista), // Aseguramos que sea un número
        fechaCompra: new Date(formValue.fechaCompra), // Asegurar que sea un objeto Date
        email: formValue.email,
        precioFinal: this.precioFinalCalculado,
        // El id será asignado por el servicio
      };
      this.boletoService.agregarBoleto(nuevoBoleto);
      this.boletoForm.reset({ fechaCompra: this.datePipe.transform(new Date(), 'yyyy-MM-dd') }); // Resetea el form
      this.precioFinalCalculado = null;
    } else {
      this.boletoForm.markAllAsTouched(); // Marcar campos como tocados para mostrar errores
    }
  }

  calcularResumenVentas(): void {
    // Reiniciamos los contadores y totales
    this.resumenVentas = {
      menor: { cantidad: 0, total: 0 },
      adulto: { cantidad: 0, total: 0 },
      jubilado: { cantidad: 0, total: 0 },
      general: { cantidad: 0, total: 0 }
    };

    this.boletosVendidos.forEach(boleto => {
      this.resumenVentas.general.cantidad++;
      // Usamos precioFinal, que ya tiene el descuento aplicado
      this.resumenVentas.general.total += boleto.precioFinal || 0;

      if (boleto.categoriaTurista === 1) { // Menor
        this.resumenVentas.menor.cantidad++;
        this.resumenVentas.menor.total += boleto.precioFinal || 0;
      } else if (boleto.categoriaTurista === 2) { // Adulto
        this.resumenVentas.adulto.cantidad++;
        this.resumenVentas.adulto.total += boleto.precioFinal || 0;
      } else if (boleto.categoriaTurista === 3) { // Jubilado
        this.resumenVentas.jubilado.cantidad++;
        this.resumenVentas.jubilado.total += boleto.precioFinal || 0;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.boletosSubscription) {
      this.boletosSubscription.unsubscribe();
    }
  }
}
