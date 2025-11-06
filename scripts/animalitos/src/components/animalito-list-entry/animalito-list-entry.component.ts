import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalitoViewModel } from '../../models/animalito.view.model';

@Component({
  selector: 'app-animalito-list-entry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animalito-list-entry.component.html',
  styleUrl: './animalito-list-entry.component.css'
})
export class AnimalitoListEntryComponent {
  @Input() animalito!: AnimalitoViewModel;
  @Output() selected = new EventEmitter<AnimalitoViewModel>();
  @Output() edited = new EventEmitter<AnimalitoViewModel>();
  @Output() deleted = new EventEmitter<AnimalitoViewModel>();

  onSelect() {
    this.selected.emit(this.animalito);
  }

  onEdit(event: Event) {
    event.stopPropagation();
    this.edited.emit(this.animalito);
  }

  onDelete(event: Event) {
    event.stopPropagation();
    if (confirm(`¿Estás seguro de eliminar a ${this.animalito.nombre}?`)) {
      this.deleted.emit(this.animalito);
    }
  }
}

/*

<app-animalito-list-entry animalito="DATOS" selected="FUNCION JS" edited="FUNCION JS" deleted="FUNCION JS"></app-animalito-list-entry>

*/