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
describe('AnimalitoFormComponent', () => {
    const datosAnimalito: AnimalitoViewModel = {
        id: 17,
        nombre: 'Firulais',
        especie: 'perro',
        edad: 3,
        raza: 'mestizo',
        descripcion: 'Un perro muy juguetón'
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
        /*
        const nombreElement: HTMLElement  = debugElement.query(By.css('.animalito-card .animalito-info h3')).nativeElement;
        const especieElement: HTMLElement = debugElement.query(By.css('.animalito-card .animalito-info .especie')).nativeElement;
        const edadElement: HTMLElement    = debugElement.query(By.css('.animalito-card .animalito-info .edad')).nativeElement;
        const razaElement: HTMLElement    = debugElement.query(By.css('.animalito-card .animalito-info .raza')).nativeElement;

        expect(nombreElement.textContent).toContain(datosAnimalito.nombre);
        expect(especieElement.textContent).toContain(datosAnimalito.especie);
        expect(edadElement.textContent).toContain(datosAnimalito.edad);
        expect(razaElement.textContent).toContain(datosAnimalito.raza);
*/
    });

    it('should emit saved event when Save button is clicked', async () => {
        spyOn(component.saved, 'emit');

        // Cuando apretamos el boton de guardar, nuestro componente llama al servicio para guardar el animalito
        // Pero el servicio es invocado de forma asíncrona (hace una llamada HTTP)
        // El programa continua su ejecución.. y para cuando evaluamos el expect, el evento puede que no se haya emitido aún.
        // Ya que puede que el json server no haya respondido aún.
        const saveButton: HTMLElement = debugElement.query(By.css('.animalito-form-container .form-actions button.btn-primary')).nativeElement;
        saveButton.click(); 
        // Esta comprobación no funciona... no se puede escribir asi.
        // expect(component.saved.emit).toHaveBeenCalledWith(datosAnimalito);
        // Tenemos funciones especiales en los espías para trabajar con código asíncrono.
        expectAsync
        // expectAsync espera a que la promesa se resuelva
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