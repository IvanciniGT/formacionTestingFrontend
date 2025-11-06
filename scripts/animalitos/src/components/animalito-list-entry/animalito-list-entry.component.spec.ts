// Importaciones:
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnimalitoListEntryComponent } from './animalito-list-entry.component';
import { AnimalitoViewModel } from '../../models/animalito.view.model';
import { DebugElement } from '@angular/core';


describe('AnimalitoListEntryComponent', () => {
    // Quiero que plantéis las pruebas que podemos hacer a este ComponentRef.
    // Unitarias.
    // Este componente depende de alguien? Necesita dee alguien? Usa funciones de otros componentes o servicios?
    // Este componente no depende de nadie=>
    // Puedo hacerle pruebas unitarias directamente sobre él, sin necesidad de mockear nada.
    // Además, por definición no puedo hacerle pruebas de integración, porque no depende de nadie.
    // Y sus pruebas de sistema = Pruebas unitaria 

    const datosAnimalito: AnimalitoViewModel = {
        id: 17,
        nombre: 'Firulais',
        especie: 'perro',
        edad: 3,
        raza: 'mestizo',
        descripcion: 'Un perro muy juguetón'
    };

    let component: AnimalitoListEntryComponent;
    let fixture: ComponentFixture<AnimalitoListEntryComponent>;
    // ComponentFixture es una clase genérica que recibe como parámetro de tipo
    // el tipo del componente que quiero probar.
    // Esa clase me da acceso al componente y a su plantilla.
    // Es como el contenedor del componente en las pruebas.
    // Es como un div en el que está mi componente, y me permite acceder a él y a su template.
    let debugElement: DebugElement;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [AnimalitoListEntryComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalitoListEntryComponent); // <app-animalito-list-entry>
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;    // Me da acceso al árbol DOM del componente
    component.animalito = datosAnimalito;   // <app-animalito-list-entry [animalito]="datosAnimalito">
    fixture.detectChanges();                // Dispara la detección de cambios para actualizar la vista
    });

    it('should display animalito data correctly', () => {
    // PRUEBA 1: al usar esta marca html (Este component), pasándole los datos del animalito,
    //           se deben ver reflejados en la plantilla, dentro de los elementos correspondientes.
    // DADO      Tengo un componente de AnimalitoListEntryComponent, y le paso los datos de un animalito:
    //           id: 17, Firulais, perro, 3 años, raza mestizo, descripción "Un perro muy juguetón".
    // CUANDO.   Lo cargo en pantalla
    // ENTONCES. Debo ver en la plantilla los datos del animalito reflejados en los elementos correspondientes:
    //           En un campo p.nombre, el nombre "Firulais".
    //           En un campo p.especie, la especie "perro".
    //           En un campo p.edad, la edad "3 años".
    //           En un campo p.raza, la raza "mestizo".
        const nombreElement: HTMLElement  = debugElement.query(By.css('.animalito-card .animalito-info h3')).nativeElement;
        const especieElement: HTMLElement = debugElement.query(By.css('.animalito-card .animalito-info .especie')).nativeElement;
        const edadElement: HTMLElement    = debugElement.query(By.css('.animalito-card .animalito-info .edad')).nativeElement;
        const razaElement: HTMLElement    = debugElement.query(By.css('.animalito-card .animalito-info .raza')).nativeElement;

        expect(nombreElement.textContent).toContain(datosAnimalito.nombre);
        expect(especieElement.textContent).toContain(datosAnimalito.especie);
        expect(edadElement.textContent).toContain(datosAnimalito.edad);
        expect(razaElement.textContent).toContain(datosAnimalito.raza);

    });

    // Ya debemos poder ejecutar esta prueba:
    // ng test --include src/components/animalito-list-entry/animalito-list-entry.component.spec.ts

// Esta prueba ya es Oportuna? Timely? YA NO! Pa' qué..
// Si el componente ya está montado.
// Estoy probando el componente que tengo delante... que veo con mis ojos..
// Y la prueba se vuelve ABSURDA!
// Cuando habría tenido sentido definir la prueba? Antes de crear el componente!
// En la prueba DEFINO el comportamiento que espero del componente
// Y entonces, escribo un código que haga que el componente se comporte así, como define la prueba.
// Eso tiene sentido. Y ahí la prueba es oportuna.
// Y esto es lo que aplicamos cuando seguimos TDD: Test Driven Development
// El único motivo para hacer esta prueba ahora sería que se convirtiera en una prueba de regresión.
// Es decir, que si voy a estar 2 años modificando el componente, y quiero asegurarme de que
// este comportamiento que tengo ahora mismo se mantenga en el futuro, entonces SÍ tiene sentido hacer la prueba ahora.

// PREGUNTA: Por qué leches el desarrollador (COPILOT) incluyó esos campos en el panel y no otros?
//           Porque le salió de los huevos! Igual lo habría hecho mi desarrollador humano.
// PREGUNTA: Esta es una decisión que compete al desarrollador del componente? NO.. ni de coña!
//           Es del tester? NO.. ni de coña!
// De quién es? De los requisitos.. que son consensuados entre analistas, clientes, ux
// el tester (QA) verifica que esos requisitos no tienen problema: Nos son ambiguos, son comprobables.
// Esa es la responsabilidad del tester.
// Y el desarrollador PICA!

// Alguien, cercano al usuario es quién debe tomar esta decisión..
// En base a qué se decide que unos datos deben salir en un listado? Los que quiera?
// Los que me ayuden a identificar al elemento sobre el que quiero realizar una determinada acción.

// SoC: Separation of Concerns: Separación de preocupaciones.
// Lo enunció un desarrollador llamado David Parnas en 1970.
// o que dice es: Cuando estoy haciendo una mierda, me centro en esa mierda... y me olvido de las demás.

// Aplicado a esto.
// Yo soy el creado de este componente AnimalitoListEntryComponent.
// Me la trae al peiro dónde se usan mis componentes.
// Incluso si soy yo quien va a usarlo en otro componente más grande (AnimalitoListComponent).
// Mi mente está ahora en este componente.. y no debo pensar en nada más!
    it('should emit selected event when clicked', () => {
        // PRUEBA 2: al usar esta marca html (Este component), pasándole los datos del animalito,
        //           cuando se hace clic en el componente, se debe emitir un evento "selected" con los datos del animalito.
        // DADO      Tengo un componente de AnimalitoListEntryComponent, y le paso los datos de un animalito:
        //           id: 17, Firulais, perro, 3 años, raza mestizo, descripción "Un perro muy juguetón".
        // CUANDO.   Lo cargo en pantalla y se hace clic en el componente.
        // ENTONCES. Se debe emitir un evento "selected" con los datos del animalito:
        //           nombre "Firulais".
        //           especie "perro".
        //           edad "3 años".
        //           raza "mestizo".
        //           id 17.
        //           descripción "Un perro muy juguetón".
        spyOn(component.selected, 'emit'); // Espía el método emit del EventEmitter selected
        
        const cardElement: HTMLElement = debugElement.query(By.css('.animalito-card')).nativeElement;
        cardElement.click(); // Simula un clic en la tarjeta del animalito
        expect(component.selected.emit).toHaveBeenCalledWith(datosAnimalito);
    });

    it('should emit edited event when Edit button is clicked', () => {
        // PRUEBA 3: al usar esta marca html (Este component), pasándole los datos del animalito,   
        //           cuando se hace clic en el botón Editar, se debe emitir un evento "edited" con los datos del animalito.
        // DADO      Tengo un componente de AnimalitoListEntryComponent, y le paso los datos de un animalito:
        //           id: 17, Firulais, perro, 3 años, raza mestizo, descripción "Un perro muy juguetón".
        // CUANDO.   Lo cargo en pantalla y se hace clic en el botón Editar.
        // ENTONCES. Se debe emitir un evento "edited" con los datos del animalito:
        //           nombre "Firulais".
        //           especie "perro".
        //           edad "3 años".
        //           raza "mestizo".
        //           id 17.
        //           descripción "Un perro muy juguetón".
        spyOn(component.edited, 'emit'); // Espía el método emit del EventEmitter edited
        
        const editButton: HTMLElement = debugElement.query(By.css('.animalito-card .animalito-actions button.btn-edit')).nativeElement;
        editButton.click(); // Simula un clic en el botón Editar
        expect(component.edited.emit).toHaveBeenCalledWith(datosAnimalito);
    });

    it('should emit deleted event when Delete button is clicked and confirmed', () => {
        // PRUEBA 4: al usar esta marca html (Este component), pasándole los datos del animalito,
        //           cuando se hace clic en el botón Eliminar, se debe emitir un evento "deleted" con los datos del animalito.
        // DADO      Tengo un componente de AnimalitoListEntryComponent, y le paso los datos de un animalito:
        //           id: 17, Firulais, perro, 3 años, raza mestizo, descripción "Un perro muy juguetón".
        // CUANDO.   Lo cargo en pantalla y se hace clic en el botón Eliminar.
        // ENTONCES. Se debe emitir un evento "deleted" con los datos del animalito:
        //           nombre "Firulais".
        //           especie "perro".
        //           edad "3 años".
        //           raza "mestizo".
        //           id 17.
        //           descripción "Un perro muy juguetón".
        spyOn(component.deleted, 'emit'); // Espía el método emit del EventEmitter deleted
        spyOn(window, 'confirm').and.returnValue(true); // Simula la confirmación del diálogo

        const deleteButton: HTMLElement = debugElement.query(By.css('.animalito-card .animalito-actions button.btn-delete')).nativeElement;
        deleteButton.click(); // Simula un clic en el botón Eliminar
        expect(component.deleted.emit).toHaveBeenCalledWith(datosAnimalito);
    });
});