import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimalitoViewModel } from '../../models/animalito.view.model';
import { Animalito } from '../../models/animalito';
import { AnimalitosService } from '../../services/animalitos.service';

interface FormData {
  nombre: string;
  especie: string;
  edad: number;
  raza: string;
  descripcion: string;
}

@Component({
  selector: 'app-animalito-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './animalito-form.component.html',
  styleUrl: './animalito-form.component.css'
})
export class AnimalitoFormComponent implements OnInit, OnChanges {
  @Input() animalito: AnimalitoViewModel | null = null;
  @Output() saved = new EventEmitter<AnimalitoViewModel>();
  @Output() cancelled = new EventEmitter<void>();

  especies = ['Perro', 'Gato', 'Pez', 'Pájaro', 'Hamster', 'Conejo', 'Tortuga'];
  
  isEditing = false;
  saving = false;
  error = '';

  formData: FormData = {
    nombre: '',
    especie: '',
    edad: 0,
    raza: '',
    descripcion: ''
  };

  constructor(private animalitosService: AnimalitosService) {}

  ngOnInit() {
    this.resetForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['animalito']) {
      this.resetForm();
    }
  }

  private resetForm() {
    if (this.animalito) {
      this.isEditing = true;
      this.formData = {
        nombre: this.animalito.nombre,
        especie: this.animalito.especie,
        edad: this.animalito.edad,
        raza: this.animalito.raza,
        descripcion: this.animalito.descripcion || ''
      };
    } else {
      this.isEditing = false;
      this.formData = {
        nombre: '',
        especie: '',
        edad: 0,
        raza: '',
        descripcion: ''
      };
    }
    this.error = '';
  }

  onSubmit() {
    if (this.saving) return;

    this.saving = true;
    this.error = '';

    const animalito = new Animalito(
      this.isEditing ? this.animalito!.id : 0,
      this.formData.nombre.trim(),
      this.formData.especie,
      this.formData.edad,
      this.formData.raza.trim(),
      this.formData.descripcion.trim()
    );

    const operation = this.isEditing
      ? this.animalitosService.updateAnimalito(animalito)
      : this.animalitosService.createAnimalito(animalito);

    operation.subscribe({
      next: (savedAnimalito) => {
        this.saving = false;
        this.saved.emit(savedAnimalito);
      },
      error: (error) => {
        this.saving = false;
        this.error = this.isEditing
          ? 'Error al actualizar el animalito. Verifica que el servidor esté funcionando.'
          : 'Error al crear el animalito. Verifica que el servidor esté funcionando.';
        console.error('Error saving animalito:', error);
      }
    });
  }

  onCancel() {
    this.cancelled.emit();
  }
}