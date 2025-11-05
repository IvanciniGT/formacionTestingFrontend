# Selenium

- Python
- Javascript

---

# Selenium 

Lo puedo ejecutar con varios lenguajes: Python, Java, C#, Ruby, JavaScript, etc.
Solo me sirve para pruebas de sistema (end to end).

# Cypress (JS)

Limitación: solo funciona con JS
No solo sirve para pruebas end to end, también para pruebas de integración y unitarias.

Por ahora vamos a trabajar con Cypress para pruebas end to end (sistema).
Mañana haremos pruebas de integración y unitarias... con cypress, pero también con otros frameworks.

Angular <- Jasmine, Karma, Sinon

NO SIEMPRE puedo hacer pruebas unitarias o de integración. Solo cuando la arquitectura de desarrollo lo permite.
Si no cumplimos con el principio de inversión de dependencias, no podremos hacer pruebas unitarias o de integración.


## Cypress vs Selenium

    | Característica          | Selenium                     | Cypress                      |
    |-------------------------|------------------------------|------------------------------|
    | Lenguajes soportados    | Varios (Python, Java, etc.)  | Solo JavaScript              |
    | Facilidad de uso        | Más complejo                 | Más sencillo                 |
    | Posibilidad de grid     | Sí                           | No                           |
    | Tipos de pruebas        | Solo end to end              | e2e, integración, unitarias  |
    | Entorno developer       | NO                           | DEBUG ONLINE                 |
    | XPATH                   | Sí                           | No (cypress-xpath plugin)    |

Selenium abre el navegador que yo tenga configurado en local... con mi perfil de usuario.
Cypress abre un navegador "limpio", sin extensiones, sin cookies, sin perfiles de usuario.

# Proyecto Angular

---

Selenium GRID (Cuando tengamos un rato tonto!)


---

# Modelo antiguo de la web

     USUARIO > NAVEGADOR > http request > SERVIDOR
                         < http response    +html
                (html)       
              Renderizado

# Modelo moderno de la web

     USUARIO > NAVEGADOR > http request > SERVIDOR
                         < http response    +json
                (json)       
              ejecutar programas JS
              que genera desde el json
              el html dinámicamente


Además, esto se completa con el concepto de SPA (Single Page Application)
El navegador solo va a trabajar con un documento HTML, y lo que hace es
irlo mutando dinámicamente con JS.
Va quitándole elementos HTML y poniéndole otros.

En las primeras versiones de este modelo teníamos frameworks: Angular + React
que ofrecían funcionalidades desarrolladas en JS para hacer este trabajo

En un momento dado sale un nuevo estandar del Web: Web Components

Un componente web es una marca HTML que yo defino.. que le explico al navegador como debe:
- Renderizar
- Comportarse
 
  Lo que definimos es la representación dee ese elemento (HTML+CSS)
  y su comportamiento (JS)


  <usuario id="1234"></usuario> 

Esta marca en HTML NO EXISTE como parte del estandar HTML del W3C.
Pero... gracias al estandar de Web Components, yo puedo definir esa marca.

    <usuario id="1234"></usuario>

    +---------+-----------------------------+
    |         |                             |
    |  O   O  | Nombre: Menchu              |
    |    X    | Apellido: García            |
    | ______  | Email: menchu@miempresa.com |
    |         |                  [Mensaje]  |
    +---------+-----------------------------+

Los datos de Menchu no los estamos pasando en la marca... lo que pasamos es un id
Pero quiero que el navegador, cuando encuentre esta marca, llame por http a un servidor de mi empresa:
    http://miempresa.com/api/v1/usuarios/1234
Y lea un json que el servidor le va a devolver:

    {
      "nombre": "Menchu",
      "apellido": "García",
      "email": "menchu@miempresa.com",
      "foto": "http://miempresa.com/fotos/1234.jpg"
    }

Y con ese json, el navegador va a renderizar el HTML que he puesto arriba:

    <div class="usuario">
      <img src="http://miempresa.com/fotos/1234.jpg" />
      <h2>Menchu </h2>
      <p>Apellido: García</p>
      <p>Email: menchu@miempresa.com</p>
    </div>

Y con su propio css:

    .usuario {
      border: 1px solid black;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .usuario img {
      border-radius: 50%;
      width: 100px;
      height: 100px;
    }
    .usuario h2 {
      margin: 10px 0 5px 0;
    }
    .usuario p {
      margin: 2px 0;
    }

Además, queremos lógica:
Al apretar en el botón "Mensaje", que se abra un formulario de contacto.
Que al rellenar ese formulario y apretar "Enviar", se mande un email a menchu@miempresa.com
con los datos del formulario.

Desde este momento, con yo solo poner la marca HTML <usuario id="1234"></usuario>
el navegador es capaz de hacer todo esto.
Y lo puedo reutilizar a lo largo de toda mi app.. incluso de todas mis apps.

Igual que defino este componente puedo definir:
- Formulario alta de un expediente
- Tabla de listados de expedientes
- Gráfico de barras con estadísticas de unas cosas que gestiona mi app

Todo lo convertimos en componentes web reutilizables.

ASI TRABAJAMOS A DIA DE HOY.,
Los navegadores hoy en día, desde la aparición del estandar de Web Components, son capaces nativamente de aprender/interpretar estos componentes web.
Antiguamente como decía, la creación de estos componentes web la hacían frameworks como Angular o React.

Lo que pasa es que los navegadores exponen esta funcionalidad mediante una API de JS.
Con php... Java... C#... no puedo usar esta API de JS.
El lenguaje hoy en día para el desarrollo de frontales es JS.

Angular, React, y otros nuevos que han ido apareciendo en el camino (Vue, Svelte, etc.)
hoy en día ya no gestionan la creación de componentes web... eso lo hacen los navegadores.
Estos frameworks o librerías lo que hacen es facilitar el trabajo de desarrollo con JS.
Me dan una estructura y una base más o menos sistematizada para desarrollar aplicaciones web complejas con estos componentes web que vamos creando.

Si tengo una app montada de esta forma, con componentes web, voy a poder hacer pruebas unitarias de esos componentes web.
No son ya pruebas de sistema de mi app completa... son pruebas unitarias de cada componente web.
Pruebas unitarias.
Incluso, podré conectar estos componentes con servicios en frontal.. y podré entonces hacer pruebas de integración entre ellos.
Podrá luego juntar estos servicios de frontal con servicios de backend (APIs REST, GraphQL, etc.) y hacer pruebas de integración entre ambos.
O juntarlo todo.. y hacer mis pruebas de sistema end to end.

Aquí si tengo la capacidad de hacer pruebas unitarias, de integración y de sistema.

Si no trabajo con componentes web... si trabajo con páginas HTML generadas a nivel de servidor (php, Java, C#)
NO HAY FORMA de hacer pruebas unitarias o de integración en el frontal.

Voy a usar Angular para crear un proyectito muy simple.

---

Para trabajar con angular necesitamos tener angular instalado en la máquina... En realidad una utilidad que ifrece angular llamada el Angular CLI. Esta utilidad es la que nos ayuda a:
- Crear un proyecto angular
- Levantar un servidor de desarrollo
- Crear componentes, servicios, etc.
- Hacer el build de producción

Esto se instala muy fácil con npm (Node Package Manager)

    npm install -g @angular/cli         # Que se instale globalmente en mi máquina


---

CRUD Básico de Mascotas con Angular

Servidor en backend:
    /api/v1/mascotas
        GET    -> Listado de mascotas
        POST   -> Crear una mascota
    /api/v1/mascotas/{id}
        GET    -> Detalle de una mascota
        PUT    -> Modificar una mascota
        DELETE -> Eliminar una mascota

A nivel de frontal queremos:
- Listado de mascotas
- Que al pulsar sobre una de ellas vea su detalle
- Que pueda crear una nueva mascota

Nosotros estamos ahora en el frontal... y no nos vamos a preocupar del backend.

Lo que vamos a hacer es simular que tenemos un backend operativo: FAKE

Para ello, podemos usar una librería que se llama json-server.

    $ npm install -g @angular/cli
    $ npm install -g json-server
    $ npm install -g concurrently
     # Nos permite ejecutar varios programas a la vez. 
     # En nuestro caso, el servidor de desarrollo de angular y el json-server (simulando backend)

Lo único que necesitamos es crear un archivo JSON con unos cuantos datos de ejemplo.


---

Proyecto Angular + JSON Server

Va a tener varias partes:
- Modelos: Clases para albergar los datos con los que vamos a trabajar: Mascotas
           Haremos una clase para representar los datos que nos manda el backend (Mascota)
           Y otra clase para representar los datos que vamos a mostrar en el frontal (MascotaViewModel)
           Esas 2 clases deben ser hoy en día idénticas... pero en el futuro van a diferir.
- Mapeadores: Clases que se encargan de convertir entre los modelos del backend y los modelos del frontal
           AnimalitosMapper
           - Mascota -> MascotaViewModel
           - MascotaViewModel -> Mascota
- Servicios: Clases que se encargan de llamar al backend para obtener los datos
- Toda la comunicación con el backend se hará a través de los servicios
           MascotasService
           - getAll(): Mascota[]
           - getById(id): Mascota
           - create(mascota): void
           - update(mascota): void
           - delete(id): void
           Estas funciones de esta clase son las que se encargan de hacer las llamadas HTTP al backend
           Tomar el JSON de vuelta y convertirlo en objetos de la clase MascotaViewModel haciendo uso del mapeador
- Componentes Web:
    - AnimalesListComponent: Componente que muestra el listado de mascotas
         - AnimalitosListEntryComponent: Componente que muestra una mascota en el listado
    - AnimalitosDetailComponent: Componente que muestra el detalle de una mascota
    - AnimalitosFormComponent: Componente que muestra un formulario para crear o editar una mascota
    - AppComponent: Componente raíz de la aplicación. Es el que contiene la estructura general de la app
         Este englobará el resto de componentes que hemos creado

En nuestro caso, vamos a usar Typescript... es lo que se usa en Angular.
TypeScript es un lenguaje de programación, independiente de JS.
JS tiene un pequeño GIGANTESCO PROBLEMA: Es un lenguaje de tipado dinámico.

     El tipado dinámico es cómodo para cositas pequeñas, cursos, juguetes... proyectos mios y de mi primo.
     Para un proyecto grande, con varias personas NO SIRVE = INUTIL!

    ```js
     function generarInforme(titulo,datos) {
         // ...
     }
     ```

     ```ts
        function generarInforme(titulo: string, datos: InformeDatos): Informe {
            // ...
        }
     ```

     El problema es que los navegadores NO ENTIENDEN TypeScript, lo que ejecutan es JS.
     Lo que hacemos es escribo código TS y ese código lo convierto a JS mediante un proceso similar a la compilación.

     Compilación es cuando convertimos código de un lenguaje de un cierto nivel de abstracción a otro lenguaje de un nivel de abstracción inferior.
     Cuando convertimos código de un lenguaje de un determinado nivel de abstracción a otro lenguaje de un nivel de abstracción similar, se llama Transpilación.

     Transpilar nuestro código TS a JS lo hace el Angular CLI por nosotros.

Creamos el proyecto de Angular:
$ ng new animalitos


---

# Tenemos el servicio de animalitos

   AnimalitosService -----> Backend (json-server)
                                        fake
                                        Algo que a priori se comporta como un backend real
                                        Aunque no ofrece toda la funcionalidad de un backend real
                                        (No hay una BBDD real detrás, ni lógica de negocio compleja, etc.)
                                        Solo metemos persistencia básica de datos en un archivo JSON

                                        De hecho si completaramos algo más de funcionalidad en el fake... acabaría siendo el backend real.

Ahí tenemos 2 componentes de nuestra app:
- AnimalitosService: Servicio que se encarga de llamar al backend para obtener los datos
- Backend

En nuestro caso, qué queremos hacer?
- Pruebas Unitarias?         Sería una prueba del servicio AnimalitosService AISLADO del backend.

    AnimalitosService |-> Backend REAL --> BBDD REAL

    Claro... realmente el animalitosService necesita un backend. Pero no voy a poner uno que se llame realmente por HTTP.
    Lo que voy a hacer es intercerptar la comunicación HTTP que el servicio de animalitos trata de hacer con el backend.. Y cuando vea que esa comunicación HTTP se va a hacer, en lugar de dejar que se haga realmente, voy a hacer que se simule que se hace y se devuelvan 4 datos fijos!

- Pruebas de Integración?
- Pruebas de Sistema (end to end)? No las podemos hacer ahora mismo... pero no las puedo hacer no porque no haya pantallas, sino porque no hay un backend real con su BBDD... y sus cosas. En el futuro las podre hacer.. Y QUERRÉ HACERLAS ! Para eso necesito que los tios que están haciendo el backend terminen su trabajo, para que haya un SISTEMA que probar.

  AnimalitosService -> Backend REAL --> BBDD REAL

    Eso sería un Prueba de Sistema (end to end) (a este nivel)
    Otra prueba de sistema será :
  
  ComponentesHTMLFrontal -> AnimalitosService -> Backend REAL --> BBDD REAL

    Eso sería otra Prueba de Sistema (end to end) 
    Los componentes con los que trabaje sean todos los componentes de la app, desde el nivel que estoy hacia abajo.
    Y que sean componentes reales, no de carton piedra (como por ejemplo es el json-server)

    Cuando trabajamos con postman, solemos hacer pruebas de sistema del backend
    
    ->  Backend REAL --> BBDD REAL.. y más cosas que tuviera

Muchas veces, la diferencia entre una prueba unitaria, de integración o de sistema solo es cuestión de perspectiva!

Soy el fabricante de una dinamo para bicicletas.
  Me encargo de coger un núcleo de hierro, ponerle unas bobinas de cobre, un imán, etc.
  Sacarle unos cables poner una bombilla.

  Para mi, una prueba unitaria que sería? Una prueba sobre un componente aislado de mi sistema (dinamo)
   - Por ejemplo, probar a ver si cuando a la bombilla le llega corriente, se enciende.
     Espero que el pendejo que me haya vendido la bombilla me haya vendido una que funciona!
  Para mi... fabricante de la dinamo, el probar la dinamo entera, con su bomilla, su todo ahí funcionando sería una prueba de sistema (end to end)

Soy el fabricante de bicicletas.
  Y encargo una dinamo. Me la mandan...
  La pruebo... Para mí que tipo de prueba es? Simplemente cojo la dinamo, la monto en un bastidor (4 hierros) con su bombilla (el pack completo que me mandan) Y hago que la dinamo gire muy rápido a ver si la bombilla se enciende.
  
  UNITARIA!
  

Si soy el desarrollador del backend, probar el backend con postman para mi es una prueba de sistema (end to end)

Porque el backend es mi entregable.. es mi sistema!

Para el que monta la app en su conjunto, el backend es un componente más... al que podrá hacer una prueba unitaria.
O de integración con el resto de componentes de la app.

---

Es responsabilidad de mi animalitos service el hacer la petición http al backend? NO

Solo pedimos a un ClienteHTTP que haga la petición.
El ClienteHTTP es el que sabe hacer peticiones HTTP... abre puertos, manda cabezeras, etc.
Yo solo le pido al cliente HTTP que haga la petición. ESA ES MI RESPONSABILIDAD.

Otra responsabilidad mia cual sería? (qué más debe hacer/hace nuestra función)
  Transformar los datos que manda el backend (al menos los que me devuelve el cliente http) en la estructura/formato que yo quiero en el frontal.

```ts
    getAnimalitos(): Observable<AnimalitoViewModel[]> {
        return this.http.get<Animalito[]>(AnimalitosServiceImpl.API_URL).pipe(
            map(animalitos => animalitos.map(AnimalitosMapper.toViewModel))
        );
    }
```

Qué cliente HTTP Estamos usando? HttpClient de Angular
Y ese tio, el HttpClient, el cabrón hace peticiones HTTP de verdad.
En el momento que hagamos una petición HTTP de verdad, ya sería una prueba unitaria? NO
Ya estaríamos comunicándonos con un backend ... sería al menos una prueba de integración.

Lo que podemos hacer es al crear el AnimalitosService, (en su constructor) no pasarle el HttpClient real... sino una clase con los mismos métodos que el HttpClient:
- get
- post
- put
- delete

Pero con una implementación de pega.

Nuestra clase, tendrá un método get:

```ts
    get<T>(url: string): Observable<T> {
        const animallitosDePegote: Animalito[] = [
            { id: 1, nombre: 'Firulais', tipo: 'Perro', edad: 3 },
            { id: 2, nombre: 'Misu', tipo: 'Gato', edad: 2 },
        ];
        return animallitosDePegote ;
    }
    // Esta función está realmente haciendo una petición HTTP? NO
    // Está devolviendo datos fijos de pega (STUB)
    // Hemos stubeado el método get del HttpClient
```
// Pregunta, ese método puede fallar al ser invocado? IMPOSIBLE = Confío plenamente en ese método ( Igual que confíaba en los 4 hierros mal soldaos donde sujetaba el sillín o en el sensor de presión del sistema de frenos para hacer la prueba)

Por tanto, caso que la prueba vaya mal, el problema no estará en el HttpClient (que es un STUB que siempre funciona) sino en mi AnimalitosService. <- UNITARIA !

> Otra...

Cojo el cliente HTTP de verdad de la buena!
Y le pongo a trabajar con el json-server (fake backend)
Confío en el json-server? SI, por eso lo uso.
Hay posibilidades de que falle? NO
Solo hace 4 operaciones de mierda... más que probadas ya por cientos de desarrolladores.
No hay BBDD de verdad que puedan estar caídas, ni lógica de negocio compleja que pueda fallar, no hay firewalls, ni redes, ni ná de ná que pueda fallar.

Por lo tanto, Si mi Servicio de animalitos funciona, que lo he probado aislado de todo.
Y confío plenamente en que el jsonserver funciona.
Si cuando los junto no funcionan (la prueba falla) el problema está en la COMUNICACIÓN entre ambos.
Quizás uno da los datos en UTF-8 y el otro los espera en ASCII.
O uno cierra las pinzas pero no tanto como para apretar la llanta del otro!

Funcionan bien por separado.. pero juntos NO!

¿Qué tipo de prueba es esa? INTEGRACIÓN! = COMUNICACIÓN ENTRE 2 COMPONENTES QUE FUNCIONAN BIEN POR SEPARADO

Quizás es que el json-server espera una cabera X-Auth-Token y mi servicio de animalitos no se la está poniendo.
Hay un problema en la comunicación entre ambos.
Lo que estoy probando es el protocolo http entre ellos y como hacen uso de ese protocolo (COMUNICACION)


Los frameworks, todos, me ofrecen ya utilidades para hacer todo este tipo de pruebas.
Yo no voy a montar un cliente HTTP de pega. Angular igual que me da el HttpClient real, me da un HttpClient de pega para hacer pruebas unitarias. Si ya está inventao.