// Importaciones:
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnimalitoDetailComponent } from './animalito-detail.component';
import { AnimalitoViewModel } from '../../models/animalito.view.model';
import { DebugElement } from '@angular/core';


describe('AnimalitoDetailComponent', () => {
    const datosAnimalito: AnimalitoViewModel = {
        id: 17,
        nombre: 'Firulais',
        especie: 'perro',
        edad: 3,
        raza: 'mestizo',
        descripcion: 'Un perro muy juguetón'
    };

    let component: AnimalitoDetailComponent;
    let fixture: ComponentFixture<AnimalitoDetailComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [AnimalitoDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalitoDetailComponent); // <app-animalito-list-entry>
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;    // Me da acceso al árbol DOM del componente
    component.animalito = datosAnimalito;   // <app-animalito-list-entry [animalito]="datosAnimalito">
    fixture.detectChanges();                // Dispara la detección de cambios para actualizar la vista
    });

    it('should display animalito data correctly', () => {
        const nombreElement: HTMLElement       = debugElement.query(By.css('.animalito-detail-container .animalito-detail-card h1')).nativeElement;
        const descripcionElement: HTMLElement  = debugElement.query(By.css('.animalito-detail-container .info-section .description')).nativeElement;
        const idElement: HTMLElement           = debugElement.query(By.css('.animalito-detail-container .info-section .id')).nativeElement;

        const valueElements      = debugElement.queryAll(By.css('.animalito-detail-container .info-section .value'));

        expect(descripcionElement.textContent).toContain(datosAnimalito.descripcion);
        expect(idElement.textContent).toContain(datosAnimalito.id);
        expect(nombreElement.textContent).toContain(datosAnimalito.nombre);

        // En esa lista, que haya 1 elemento con cada uno de los valores esperados
        const listaDeElemeentosQueContienenEspecie = valueElements.filter(el => el.nativeElement.textContent.includes(datosAnimalito.especie));
        const listaDeElemeentosQueContienenRaza    = valueElements.filter(el => el.nativeElement.textContent.includes(datosAnimalito.raza));
        const listaDeElemeentosQueContienenEdad    = valueElements.filter(el => el.nativeElement.textContent.includes(datosAnimalito.edad.toString()));
        
        expect(listaDeElemeentosQueContienenEspecie.length).toBe(1);
        expect(listaDeElemeentosQueContienenRaza.length).toBe(1);
        expect(listaDeElemeentosQueContienenEdad.length).toBe(1);

        // ESTO ES FRAGIL! Si cambian la estructura del HTML, o los estilos CSS, puede fallar
        // Lo suyo, de nuevo sería haber creado este archivo antes del código.. Y en el haber puesto IDs 
        // De forma que desarrollo al implementar use esas IDs para referenciar los elementos en los tests.

    });

    it('should emit backRequested event when clicked', () => {
        spyOn(component.backRequested, 'emit'); // Espía el método emit del EventEmitter backRequested
        
        const cardElement: HTMLElement = debugElement.query(By.css('.animalito-detail-container .detail-header .btn-back')).nativeElement;
        cardElement.click(); // Simula un clic en la tarjeta del animalito
        expect(component.backRequested.emit).toHaveBeenCalledWith();
    });

    it('should emit editRequested event when Edit button is clicked', () => {
        spyOn(component.editRequested, 'emit'); // Espía el método emit del EventEmitter editRequested

        const editButton: HTMLElement = debugElement.query(By.css('.animalito-detail-container .detail-header .btn-edit')).nativeElement;
        editButton.click(); // Simula un clic en el botón Editar
        expect(component.editRequested.emit).toHaveBeenCalledWith(datosAnimalito);
    });

});
