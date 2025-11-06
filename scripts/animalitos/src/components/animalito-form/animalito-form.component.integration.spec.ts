// Importaciones:
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnimalitoFormComponent } from './animalito-form.component';
import { AnimalitoViewModel } from '../../models/animalito.view.model';
import { DebugElement } from '@angular/core';
import { AnimalitosService, AnimalitosServiceImpl } from '../../services/animalitos.service';
import { provideHttpClient } from '@angular/common/http';

// Es una prueba donde trabajamos con el servicio de verdad... y además, el servicio de verdad conectado por http de verdad a un backend.
// Necesitamos poner en marcha el backend (json-server) antes de ejecutar estas pruebas.
// Estas son pruebas de integración (integration tests).


// Si quisieramos hacer pruebas unitarias, necesitariamos mockear el servicio AnimalitosService
// De ese servicio usamos 2 métodos: createAnimalito y updateAnimalito
// Esas 2 funciones son las que deberíamos mockear
// Crearíamos los datos de prueba, y le indicamos al mock que esperamos
// Que el método que toque de esos (en base a si teníamos un animalito o no - creación/edición-)
// en invocado... y quee cuando sea invocado, que devuelva un observable con los datos de prueba
describe('AnimalitoFormComponent', () => {
    const datosAnimalito: AnimalitoViewModel = {
        id: 1,
        nombre: 'Firulais',
        especie: 'Perro',
        edad: 3,
        raza: 'Labrador',
        descripcion: 'Un perro amigable y juguetón.'
    };

    let component: AnimalitoFormComponent;
    let fixture: ComponentFixture<AnimalitoFormComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [AnimalitoFormComponent],
        providers: [provideHttpClient(),  { provide: AnimalitosService, useClass: AnimalitosServiceImpl }]
    }).compileComponents();

    TestBed.inject(AnimalitosServiceImpl);
    fixture = TestBed.createComponent(AnimalitoFormComponent); // <app-animalito-list-entry>
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;    // Me da acceso al árbol DOM del componente
    component.animalito = datosAnimalito;   // <app-animalito-list-entry [animalito]="datosAnimalito">
    fixture.detectChanges();                // Dispara la detección de cambios para actualizar la vista
    });

    it('should display animalito data correctly', () => {
        const nombreInput: HTMLInputElement       = debugElement.query(By.css('#nombre')).nativeElement;
        const especieInput: HTMLInputElement      = debugElement.query(By.css('#especie')).nativeElement;
        const edadInput: HTMLInputElement         = debugElement.query(By.css('#edad')).nativeElement;
        const razaInput: HTMLInputElement         = debugElement.query(By.css('#raza')).nativeElement;
        const descripcionTextarea: HTMLTextAreaElement = debugElement.query(By.css('#descripcion')).nativeElement;

        expect(nombreInput.value).toBe(datosAnimalito.nombre);
        expect(especieInput.value).toBe(datosAnimalito.especie);
        expect(edadInput.value).toBe(datosAnimalito.edad.toString());
        expect(razaInput.value).toBe(datosAnimalito.raza);
        expect(descripcionTextarea.value).toBe(datosAnimalito.descripcion || '');
    });

    // Envío
    // Ver los datos iniciales
    // Cancelar con los 2 botones
    // Meter datos inválidos y ver que no deja enviar.. y que sale error en la consola

    it('should emit saved event when Save button is clicked', async () => {
        
        // Cambiamos el nombre:
        component.formData.nombre = 'NuevoNombre';
        component.formData.edad = 4;
        component.formData.especie = 'Gato';
        component.formData.raza = 'NuevoRaza';
        component.formData.descripcion = 'Nueva descripcion';
        // Forzamos la detección de cambios para actualizar el formulario
        fixture.detectChanges();

        // Configurar la promesa para capturar el evento
        let eventEmitted = false;
        
        const savedEventPromise = new Promise<AnimalitoViewModel>((resolve, reject) => {
            component.saved.subscribe({
                next: (animalito: AnimalitoViewModel) => {
                    eventEmitted = true;
                    resolve(animalito);
                },
                error: reject
            });

            // Timeout más corto para debug
            setTimeout(() => {
                if (!eventEmitted) {
                    console.log('Form data:', component.formData);
                    console.log('Is saving:', component.saving);
                    console.log('Form valid:', component.formData.nombre && component.formData.especie && component.formData.raza);
                    reject(new Error('Timeout: saved event not emitted'));
                }
            }, 10000);
        });

        // Llamar directamente al método onSubmit para debug
        const submitButton: HTMLElement = debugElement.query(By.css('.animalito-form-container .form-actions button.btn-primary')).nativeElement;
        submitButton.click();
        
        // expectAsync espera a que la promesa se resuelva
        // Usamos jasmine.objectContaining para ser más flexible con el tipo del ID
        await expectAsync(savedEventPromise).toBeResolvedTo(jasmine.objectContaining({
            nombre: 'NuevoNombre',
            especie: 'Gato',
            edad: 4,
            raza: 'NuevoRaza',
            descripcion: 'Nueva descripcion'
        }));
    });

    it('should emit deleted event when Cancel button is clicked', () => {
        spyOn(component.cancelled, 'emit');

        const cancelButton: HTMLElement = debugElement.query(By.css('.animalito-form-container .form-header button.btn-cancel')).nativeElement;
        cancelButton.click(); 
        expect(component.cancelled.emit).toHaveBeenCalledWith();
    });


    it('should emit deleted event when The Other Cancel button is clicked', () => {
        spyOn(component.cancelled, 'emit');

        const cancelButton: HTMLElement = debugElement.query(By.css('.animalito-form-container .form-actions button.btn-secondary')).nativeElement;
        cancelButton.click(); 
        expect(component.cancelled.emit).toHaveBeenCalledWith();
    });
});