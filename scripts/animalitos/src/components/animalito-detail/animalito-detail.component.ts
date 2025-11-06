import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalitoViewModel } from '../../models/animalito.view.model';

@Component({
  selector: 'app-animalito-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animalito-detail.component.html',
  styleUrl: './animalito-detail.component.css'
})
export class AnimalitoDetailComponent implements OnChanges {
  @Input() animalito: AnimalitoViewModel | null = null;
  @Output() backRequested = new EventEmitter<void>();
  @Output() editRequested = new EventEmitter<AnimalitoViewModel>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['animalito'] && this.animalito) {
      console.log('Showing details for:', this.animalito.nombre);
    }
  }

  onBack() {
    this.backRequested.emit();
  }

  onEdit() {
    if (this.animalito) {
      this.editRequested.emit(this.animalito);
    }
  }

  getAnimalEmoji(especie: string): string {
    const emojis: { [key: string]: string } = {
      'Perro': '🐕',
      'Gato': '🐱',
      'Pez': '🐠',
      'Pájaro': '🐦',
      'Hamster': '🐹',
      'Conejo': '🐰',
      'Tortuga': '🐢',
      'default': '🐾'
    };

    return emojis[especie] || emojis['default'];
  }
}