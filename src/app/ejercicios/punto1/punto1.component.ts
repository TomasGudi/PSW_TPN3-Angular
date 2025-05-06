import { Component, OnInit } from '@angular/core';

interface Noticia {
  titulo: string;
  noticia: string;
  img: string;
}

@Component({
  selector: 'app-punto1',
  templateUrl: './punto1.component.html',
  styleUrls: ['./punto1.component.css']
})
export class Punto1Component implements OnInit {
  noticias: any[] = [ 
    {
      id: 1,
      titulo: 'Descubrimiento Espacial Asombroso',
      noticia: 'Un nuevo planeta similar a la Tierra ha sido descubierto en la galaxia vecina, abriendo nuevas posibilidades.',
      img: 'assets/images/noticias/espacio.jpg',
    },
    {
      id: 2,
      titulo: 'Avance en Inteligencia Artificial',
      noticia: 'Investigadores desarrollan un nuevo modelo de IA capaz de aprender con una eficiencia sin precedentes.',
      img: 'assets/images/noticias/ia-img.jpg', 
    },
    {
      id: 3,
      titulo: 'Campeonato Mundial de eSports',
      noticia: 'El equipo local se corona campeón en una final emocionante del torneo de eSports más grande del año.',
      img: 'assets/images/noticias/e-sport.jpg', 
    },
    {
      id: 4,
      titulo: 'Innovación en Energías Renovables',
      noticia: 'Se presenta una nueva tecnología que promete duplicar la eficiencia de los paneles solares.',
      img: 'assets/images/noticias/innovaciones-energia.jpg', 
    },
  ];
  noticiaActual: any;
  noticiaActualIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.noticias.length > 0) {
      this.noticiaActual = this.noticias[this.noticiaActualIndex];
    }
  }

  adelantarNoticia(): void {
    if (this.noticias.length > 0) {
      this.noticiaActualIndex = (this.noticiaActualIndex + 1) % this.noticias.length;
      this.noticiaActual = this.noticias[this.noticiaActualIndex];
    }
  }

  retrocederNoticia(): void {
    if (this.noticias.length > 0) {
      this.noticiaActualIndex = (this.noticiaActualIndex - 1 + this.noticias.length) % this.noticias.length;
      this.noticiaActual = this.noticias[this.noticiaActualIndex];
    }
  }
}