
Ayer:
- Cypress ~ Selenium
  Algunas ventajas... y algunos inconvenientes.
  En general herramientas muy parecidas.
   - End to End testing
- Vamos a comenzar con pruebas unitarias y de integración
- Comenzamos a montar una app tal y como se montaría en un proyecto real
  - Servicios
  - Componentes <--- Web componentes (SPA)
  - Modelos
  - Mappers
  - etc.

En nuestro caso, optamos por Angular, pero podría ser React, Vue, Svelte, etc.

- Montamos un proyecto de backend falso. JSON Server: BBDD en un fichero cutre JSON.
  Y nos ofrece un crud completo.
  Hasta no tener el backend real, la mejor opción. 

- Comenzamos a montar el frontal:
  - Modelos (Tipos de datos):
     - Animalito (representan lo que viene del backend)
     - AnimalitoViewModel (representan lo que manejo en frontal)
     A día de hoy serán iguales. Con el paso del tiempo, pueden diverger. 
  - Mappers (convertir de un tipo a otro)
    Funciones que me permiten convertir de Animalito a AnimalitoViewModel y viceversa.
    Si cambia el tipo de dato del backend, solo tengo que cambiar el mapper.
    Actúan de muralla de contención ante cambios en el backend.
  - Servicios (comunicación con backend) : AnimalitosService
    - API / Interfaz: AnimalitosService
    - Implementación: AnimalitosServiceImpl
      Esa implementación tenía una serie de responsabilidades:
      - Comunicación con backend (HttpClient)
      - Conversión de datos (mappers) a la estructura que manejo en el frontal (ViewModel)
    Eso lo montamos... aunque, realmente sus responsabilidades eran otras:
      - ~~Comunicación con backend ~~ Solicitar una comunicación con backend (la comunicación realmente la hace HttpClient)
    Quisimos probarlo. 
        Podríamos no haberlo hecho... tal y como se hacía 30 años atrás en el desarrollo de software. 
        Con los años nos hemos dado cuenta que eso no es buena idea.
    Nos preguntamos... que tipo de pruebas puedo hacer?


        AnimalitosServiceImpl ---> HttpClient ---> Backend ----> BBDD
                                       ^
                                   Quién gestiona la comunicación por Http!

        Puedo y quiero hacer pruebas de sistema?
            - Quiero: por descontado
            - Puedo.. claro... en cuantito tenga el backend real.
        Sigo con otra cosa? Ni de broma... quiero asegurarme que esto funciona: CONFIANZA +1... Quiero saber que voy bien... Quiero dar pasos en firme.

        Qué otro tipo de pruebas puedo realizar? 
        - Unitarias
        - Integración

        Mi prueba siempre va a ser del mismo tipo:
        - Quiero los datos de los animalitos: getAnimalitos() -> List[AnimalitoViewModel] 
          Y otras así.
        El tema es qué piezas junto cuando hago esa prueba (en qué contexto la hago):
         - Sistema:
                AnimalitosServiceImpl ---> HttpClient ---> Backend real ----> BBDD
         - Unitaria:
                AnimalitosServiceImpl ||      -> Me da igual lo que haya...
         - Integración:
                AnimalitosServiceImpl ---> HttpClient ---> ||   Cualquier backend... en el que confíe / PROBADO
                    JSON-SERVER (Fake del backend real) La funcionalidad justita
                    Va a tener solo 4 datos de cartón piedra.
                
La prueba unitaria la hicimos sin problema. Cómo: 
- Lo que hicimos ayer fue usar una implementación de mentira del HttpClient.
  Esa implementación la regala Angular en el paquete de testing: HttpTestingController
  Esa no hace comunicaciones reales por http.
  En su lugar nos permite devolver 4 datos preconfigurados cuando se supone que debería hacer una llamada http.
  Así sé que esa parte no falla... y me centro een lo que yo quiero: la lógica del servicio .



Existen muchos tipos de dobles de prueba: Test Doubles
- Mocks
- Stubs
- Fakes
- Spies
- Dummies
En cada caso, nos interesa una cosa diferente.

> AnimalitoDetailComponent: Es un panel html que muestra por pantalla los detalles de un animalito.

      AnimalitoDetailComponent  >>>>>>>>>>>>>>>>>>>>>>>>>>   AnimalitosService > Backend ->... -> BBDD
                           getAnimalitoById(id): AnimalitoViewModel

      Para hacer una prueba unitaria al AnimalitoDetailComponent, podría crear un AnimalitosService de mentira.

      ```ts
        export class AnimalitosServiceDummy extends AnimalitosService {
             getAnimalitos(): Observable<AnimalitoViewModel[]>{
                return null;
             }
             createAnimalito(animalito: Animalito): Observable<AnimalitoViewModel>{
                return null
             }
             deleteAnimalito(id: number):void{
                return null
             }
             updateAnimalito(animalito: Animalito): Observable<AnimalitoViewModel>{
                return null;
             }
             getAnimalitoById(id: number): Observable<AnimalitoViewModel>{
                return null;
             }
      }
      ```

- Dummy es una clase que implementa la interfaz pero deevuelve lo más básico posible:
   - Una función que no deba devolver nada, no hace nada.
   - Una función que deba devolver un objeto, devuelve null. 
   - Una función que deba devolver un entero, devuelve 0.
   - Una función que deba devolver un booleano, devuelve false.
   En ocasiones los dummies nos son suficientes. No siempre. 


      ```ts
        export class AnimalitosServiceStub extends AnimalitosService {
             getAnimalitos(): Observable<AnimalitoViewModel[]>{
                return null;
             }
             createAnimalito(animalito: Animalito): Observable<AnimalitoViewModel>{
                return null
             }
             deleteAnimalito(id: number): void{
                return null
             }
             updateAnimalito(animalito: Animalito): Observable<AnimalitoViewModel>{
                return null;
             }
             getAnimalitoById(id: number): Observable<AnimalitoViewModel>{
                return Observable.of({
                   id: 1,
                   nombre: 'Firulais',
                   especie: 'Perro',
                   edad: 3,
                   descripcion: 'Un perro muy amigable'
                });
             }
      }
      ```

- Stub es una clase que implementa la interfaz pero devuelve datos fijos.. preenlatados
Si uso el AnimalitosServiceStub en la prueba unitaria del AnimalitoDetailComponent, qué espero ven en pantalla 
cuando se represente el componente? A firulais, Perro, 3, Un perro muy amigable.
Hay posibilidad de que salga otra cosa? NO
Si salen los datos de Firulais  -> Implica que:
 - Nuestro componente está llamando al servicio y captando la respuesta
 - Nuestro componente está representando bien los datos en pantalla.
 Es decir, que cumple con sus responsabilidades. El componentes está bien. 

Imaginemos que el componente tiene un botón de borrar.

      ```ts
        export class AnimalitosServiceDummy extends AnimalitosService {
             getAnimalitos(): Observable<AnimalitoViewModel[]>{
                return null;
             }
             createAnimalito(animalito: Animalito): Observable<AnimalitoViewModel>{
                return null
             }
             deleteAnimalito(id: number):void{
                return null
             }
             updateAnimalito(animalito: Animalito): Observable<AnimalitoViewModel>{
                return null;
             }
             getAnimalitoById(id: number): Observable<AnimalitoViewModel>{
                return null;
             }
      }
      ```

Si es así me valdría con pasar el dummy al componente gráfico para la prueba? Parecería que si.. pero no!
Con esto el código compilaría y podría ejecutarlo.
Ahora bien... la pregunta es: Podría yo comprobar si efectivamente el componente está pidiendo al servicio que borre el animalito cuando se pulsa el botón? Podría asegurar que se ha invocado a la función deleteAnimalito del servicio?

```html
<div class="animalito-detail">
  ...
  <button (click)="onDeleteClick()">Borrar</button>
</div>

function onDeleteClick(){
   this.animalitosService.deleteAnimalito(this.animalito.id);
}
```

Esta es la implementación que DEBERIAMOS tener en el componente.
El componente cuando see hace clic en el botón, DEBE LLAMAR  al servicio para que borre el animalito... this.animalitosService.deleteAnimalito(this.animalito.id);

Tenemos forma de saber si realmente eso ha ocurrido, cuando ejecutamos el componente? Con un dummy NO.

Pero... podríamos usar un SPY (espía)


      ```ts
        export class AnimalitosServiceSpy extends AnimalitosService {

            animalitoBorradoId: number | null = null;

             getAnimalitos(): Observable<AnimalitoViewModel[]>{
                return null;
             }
             createAnimalito(animalito: Animalito): Observable<AnimalitoViewModel>{
                return null
             }
             deleteAnimalito(id: number):void{
                this.animalitoBorradoId = id;
             }
             updateAnimalito(animalito: Animalito): Observable<AnimalitoViewModel>{
                return null;
             }
             getAnimalitoById(id: number): Observable<AnimalitoViewModel>{
                return null;
             }
             queAnimalitoTeHanPedidoBorrar(): number | null {
                return this.animalitoBorradoId;
             }
      }
      ```

Al hacer la prueba, después de apretar clic, podría ahora pregunatrle al espía, oye:
```ts
const animalitoId = animalitosServiceSpy.queAnimalitoTeHanPedidoBorrar()
expect(animalitoId).toBe(1); // Si estoy trabajando con Firulais
```

Si ese valor está vacío que significaría? Si ese animalitoId es null, eso significaría que NO SE HA LLAMADO A LA FUNCIÓN deleteAnimalito del servicio. Por lo tanto, el componente no estaría comportándose como debería.

Un Mock es un stub + spy.

El HttpTestingController que usamos ayer es un mock del HttpClient.

Al usarlo, decimos:
```ts
httpTestingController.expectOne('url del backend');
// Además, espero que te hayan llamado por método DELETE
expect(req.request.method).toBe('DELETE');
// Y además, espeero que te pasen el dato 1 (Firulais)
expect(req.request.body).toBe(1);
// Ponte en marcha con esa configuración
req.flush({});
```




<button onClick="onDeleteClick()">Borrar</button>