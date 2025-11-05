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