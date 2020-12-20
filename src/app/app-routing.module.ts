import { DepartementsComponent } from './departements/departements.component';
import { SallesComponent } from './salles/salles.component';
import { CoursComponent } from './cours/cours.component';
import { EnseignantsComponent } from './enseignants/enseignants.component';
import { UniversiteComponent } from './universite/universite.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"Etudiants",component:EtudiantsComponent},
 
  {path:'Universite', component:UniversiteComponent},
  {path:'Enseignants', component:EnseignantsComponent},
  {path:'Cours', component:CoursComponent},
  {path:'Salles', component:SallesComponent},
  {path:'Departements', component:DepartementsComponent},
  {path:'',component:HomeComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
