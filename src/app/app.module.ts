import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { EnseignantsComponent } from './enseignants/enseignants.component';
import { CoursComponent } from './cours/cours.component';
import { SallesComponent } from './salles/salles.component';
import { DepartementsComponent } from './departements/departements.component';
import { UniversiteComponent } from './universite/universite.component';
import { FormBuilder, FormsModule} from '@angular/forms'
import {    HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EtudiantsComponent,
    EnseignantsComponent,
    CoursComponent,
    SallesComponent,
    DepartementsComponent,
    UniversiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
