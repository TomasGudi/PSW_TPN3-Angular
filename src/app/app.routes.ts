import { Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { Punto1Component } from "./ejercicios/punto1/punto1.component";
import { Punto2Component } from "./ejercicios/punto2/punto2.component";
import { Punto3Component } from "./ejercicios/punto3/punto3.component";
import { Punto4Component } from "./ejercicios/punto4/punto4.component";


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'punto1', component: Punto1Component },
    { path: 'punto2', component: Punto2Component },
    { path: 'punto3', component: Punto3Component },
    { path: 'punto4', component: Punto4Component },
    { path: '**', pathMatch:'full',redirectTo:'home' }
   ];
   