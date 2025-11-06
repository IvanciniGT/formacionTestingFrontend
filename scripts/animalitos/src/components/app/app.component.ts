import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalitoViewModel } from '../../models/animalito.view.model';
import { AnimalitoListComponent } from '../animalito-list/animalito-list.component';
import { AnimalitoDetailComponent } from '../animalito-detail/animalito-detail.component';
import { AnimalitoFormComponent } from '../animalito-form/animalito-form.component';
import { AnimalitosService, AnimalitosServiceImpl } from '../../services/animalitos.service';

type ViewMode = 'list' | 'detail' | 'form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AnimalitoListComponent,
    AnimalitoDetailComponent,
    AnimalitoFormComponent
  ],
  providers: [
    { provide: AnimalitosService, useClass: AnimalitosServiceImpl }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentView: ViewMode = 'list';
  selectedAnimalito: AnimalitoViewModel | null = null;
  editingAnimalito: AnimalitoViewModel | null = null;

  // Navegación hacia el detalle
  onAnimalitoSelected(animalito: AnimalitoViewModel) {
    this.selectedAnimalito = animalito;
    this.currentView = 'detail';
  }

  // Navegación hacia el formulario de creación
  onAddAnimalito() {
    this.editingAnimalito = null;
    this.currentView = 'form';
  }

  // Navegación hacia el formulario de edición
  onEditAnimalito(animalito: AnimalitoViewModel) {
    this.editingAnimalito = animalito;
    this.currentView = 'form';
  }

  // Volver al listado
  onBackToList() {
    this.currentView = 'list';
    this.selectedAnimalito = null;
    this.editingAnimalito = null;
  }

  // Después de guardar, volver al listado
  onAnimalitoSaved(animalito: AnimalitoViewModel) {
    console.log('Animalito guardado:', animalito);
    this.onBackToList();
  }

  // Cancelar formulario
  onFormCancelled() {
    this.onBackToList();
  }
}
