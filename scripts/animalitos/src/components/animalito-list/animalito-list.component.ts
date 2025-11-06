import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalitoViewModel } from '../../models/animalito.view.model';
import { AnimalitosService } from '../../services/animalitos.service';
import { AnimalitoListEntryComponent } from '../animalito-list-entry/animalito-list-entry.component';

@Component({
  selector: 'app-animalito-list',
  standalone: true,
  imports: [CommonModule, AnimalitoListEntryComponent],
  templateUrl: './animalito-list.component.html',
  styleUrl: './animalito-list.component.css'
})
export class AnimalitoListComponent implements OnInit {
  @Output() selected = new EventEmitter<AnimalitoViewModel>();
  @Output() addRequested = new EventEmitter<void>();
  @Output() editRequested = new EventEmitter<AnimalitoViewModel>();

  animalitos: AnimalitoViewModel[] = [];
  loading = false;
  error: string | null = null;

  constructor(private animalitosService: AnimalitosService) {}

  ngOnInit() {
    this.loadAnimalitos();
  }

  loadAnimalitos() {
    this.loading = true;
    this.error = null;

    this.animalitosService.getAnimalitos().subscribe({
      next: (animalitos) => {
        this.animalitos = animalitos;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los animalitos. Verifica que el servidor esté funcionando.';
        this.loading = false;
        console.error('Error loading animalitos:', error);
      }
    });
  }

  onSelect(animalito: AnimalitoViewModel) {
    this.selected.emit(animalito);
  }

  onAdd() {
    this.addRequested.emit();
  }

  onEdit(animalito: AnimalitoViewModel) {
    this.editRequested.emit(animalito);
  }

  onDelete(animalito: AnimalitoViewModel) {
    this.loading = true;
    this.animalitosService.deleteAnimalito(animalito.id).subscribe({
      next: () => {
        this.loadAnimalitos(); // Recargar la lista después de eliminar
      },
      error: (error) => {
        this.error = 'Error al eliminar el animalito';
        this.loading = false;
        console.error('Error deleting animalito:', error);
      }
    });
  }
}