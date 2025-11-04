
# Testing

## Vocabulario

- Causa raíz        El motivo principal por el que el humano comete un error.
- Error             Los humanos cometen errores.
- Defecto           Como consecuencia podemos introducir defectos en el software.
- Fallo             Es la manifestación externa de un defecto. Desviación del comportamiento esperado.

## Para qué sirve el testing

- Asegurar el cumplimiento de los requisitos.
- Encontrar defectos (bien directamente o bien a través de fallos) antes del producto llegue al cliente.
- Ver qué tal va el proyecto
- Mejorar la calidad del producto
- Aprender de ese producto y conseguir más know-how para futuros proyectos.
- ...

## Tipos de pruebas

Varias taxonomías:

## Según el objeto de prueba

- Funcionales
- No funcionales
 -  De rendimiento
 -  De usabilidad
 -  De seguridad
 -  De carga
 -  De estrés

## Según el conocimiento previo del sistema

- Caja negra        Cuando no se conoce nada del sistema o no uso ese conocimiento.
- Caja blanca       Cuando se tiene conocimiento del sistema y se utiliza para diseñar las pruebas.

## En base al alcance (scope)

- Unitarias             Pruebas que se centran en un componente AISLADO del sistema.
                        Para aislar un componente nos puede hacer falta usar TestDoubles (mocks, stubs, fakes, spies, dummies).
- De integración        Pruebas que se centran en la COMUNICACION entre 2 componentes del sistema.
- De sistema            Pruebas que se centran en el COMPORTAMIENTO  del sistema en su conjunto.
   - De aceptación      Un subconjunto de las sistema.. que el cliente usa para decidir si acepta o no el sistema.

---

# Pruebas en frontales

El frontal se ejecuta dentro de un navegador web.
Necesitamos poder controlar ese navegador para poder hacer pruebas automáticas.
Y para ello podemos usar WebDriver (Eso es un estandar del W3C).
Casi todos los navegadores tienen un WebDriver asociado, que el fabricante nos proporciona:
- Chome -> ChromeDriver
- Firefox -> GeckoDriver
- Edge -> EdgeDriver
- Safari -> SafariDriver

Nosotros cuando hacemos pruebas, no usamos directamente esos drivers (aunque los necesitamos).
Habitualmente lo que hacemos es usar una herramienta que es la que interactúa con esos drivers.

    Script de prueba -> Herramienta para pruebas -> WebDriver -> Navegador
                          (Selenium Webdriver)

Para comenzar haremos pruebas de sistema (end-to-end) usando Selenium.

# Selenium

- Selenium IDE              Está ya caduco (Katalon Recorder) nos sirve para jugar... y empezara preparar alguna prueba. También para aprender.
- Selenium WebDriver        Una librería (disponible en varios lenguajes) que nos permite hablar con un WebDriver.
- Selenium Grid             Nos permite montar una granja de dispositivos con distintas versiones de SO, Navegadores... 
                            para hacer pruebas sobre todos ellos. Muchas veces no me interesa montar mi propio grid, sino usar un servicio en la nube (SauceLabs, BrowserStack...)

# Tenemos que tener en cuenta que:

Lo que vamos a hacer son programas (de prueba) pero programas.

En un proyecto ya no tendremos solamente los programas propios del proyecto, sino también tendremos programas que probarán esos programas del proyecto.
Estos otros programas (nuestros programas de prueba) también tienen que ser mantenidos, versionados, documentados... En definitiva, someterlos al mismo control de calidad que el resto del software del proyecto.

Ya no somos testers. Somos programadores que escribimos programas de prueba.
Esos programas van a ser muy sencillitos... No son grandes aplicaciones. Son scripts, que deben devolver si todo ha ido bien o no.

# A la hora de crear esos programas (especialmente al usar Selenium) tenemos que tener en cuenta varias cosas:

Selenium es una herramienta de pruebas? NO... es una herramienta que permite automatizar trabajos en un navegador.

Esto implica que la prueba en si misma la haremos usando un framework de testing (JUnit, PyTest, Mocha, Jest...).

- Python       -           pytest
- JS           -           mocha, jest, jasmine


Esos frameworks nos ofrecen 2 cosas:
- La posibilidad de ejecutar/crear programas de prueba.
- La posibilidad de verificar si se han cumplido o no las expectativas (assertions).
- De hecho hay también librerías que podemos usar que simplemente nos ofrecen assertions (Chai, AssertJ...) 

# Al crear una prueba, debemos asegurar que cumple con los principios FIRST

Fast                Las pruebas deben ser rápidas de ejecutar.
Independent         Las pruebas no deben depender unas de otras.
Repeatable          Las pruebas deben poder ejecutarse múltiples veces y siempre dar el mismo resultado.
Self-validating     Las pruebas deben ser capaces de validar por si mismas si han pasado o no
Timely              Las pruebas deben ser escritas en el momento adecuado (normalmente antes que el código que prueban).


# Al escribir una prueba la estructuraremos en 3 partes:

Contexto:                           Dado            Given
Lo que quiero probar(acción)        Cuando          When
Lo que espero que ocurra            Entonces        Then    <<<<<<     Esto es lo que definimos como las ASSERTIONs


---

# Pruebas sobre frontales web

Son un poco especiales. Veamos cómo describimos una prueba.

## Pruebas para el formulario de login

### Escenario 1: Happy path: Usuario y contraseña correctos

Dado
    Que tenemos un usuario y una contraseña correctos
    Y que tengo el navegador abierto en la página: https://katalon-demo-cura.herokuapp.com/profile.php#login
Cuando
    Meto en el formulario de login el usuario en el input dedicado a este fin
    y Meto en el formulario de login la contraseña en el input dedicado a este fin
    Le doy al botón de login
Entonces
    Tengo que llegar a una página principal: https://katalon-demo-cura.herokuapp.com/#appointment
    Este mensaje no debe aparecer: Login failed! Please ensure the username and password are valid.

### Escenario 2: Usuario correcto y contraseña incorrecta

### Escenario 3: Usuario incorrecto y contraseña incorrecta

### Escenario 4: Usuario incorrecto y contraseña correcta

### Escenario 5: Usuario vacío y contraseña correcta

### Escenario 6: Usuario correcto y contraseña vacía

### Escenario 7: Usuario vacío y contraseña vacía


## Identificación de elementos en nuestra página Web:

Meto en el formulario de login el usuario en el input dedicado a este fin   <<<< Cómo identifico programaticamente ese input?

Le doy al botón de login                                                    <<<< ¿Cómo identifico programaticamente ese botón?

Hay varias opciones que nos ofrece Selenium para identificar elementos en una página web:
Una cosa es el HTML que se carga. Otra cosa es el DOM del navegador.

Lo ideal es que los elementos tengan un id único (por ejemplo <input id="username" ...>).
Por desgracia en muchos casos no será así.

> CAMINO 1:

Los testers (QA) han desarrollado las pruebas antes que los desarrolladores el código.

    Dado
        Que tenemos un usuario y una contraseña correctos
        Y que tengo el navegador abierto en la página: https://katalon-demo-cura.herokuapp.com/profile.php#login
    Cuando
        Meto en el formulario de login el usuario en el input cuyo id es "usuario"      <<<<< Esta prueba no es solo prueba = requisitos!
        y Meto en el formulario de login la contraseña en el input cuyo id es "password"
        Le doy al botón de login cuyo id es "login"
    Entonces
        Tengo que llegar a una página principal: https://katalon-demo-cura.herokuapp.com/#appointment
        Este mensaje no debe aparecer: "Login failed! Please ensure the username and password are valid" en un campo cuyo id es "login_error"


> CAMINO 2:

Los desarrolladores han creado la web antes de que los testers hayan desarrollado las pruebas.
En este caso, los desarrolladores habrán puesto los ids que ellos han considerado oportunos.... si es que los han puesto.
Si lo han puesto, guay!
Si no los han puesto = RUINA !
  Podré hacer la prueba... y hay muchas probabilidades de que en el futuro esa prueba deje de servir... y tengamos que meterle mano de nuevo al programa de prueba.
En este caso el desarrollador está definiendo un requisito... sin dejarlo metido más que en el código.

Esa responsabilidad NUNCA debería caer sobre los desarrolladores. Mal asunto. Entre otras cosas porque el desarrollador no va a dejar eso documentado en ningún sitio... y no hay nada ni nadie que obligue a que eso no se pueda cambiar en el futuro.

En cualquier caso, puede ser que el desarrollador no haya puesto ids a los elementos.... y aquí más peligroso si cabe.. Más probabilidades de cagarla tendremos = NUESTRO SCRIPT DE PRUEBAS SERÁ MAS FRÁGIL!

De alguna forma tenemos que identificar el elemento con el que me interesa interactuar.
Si no hay id... buscaré un texto... buscaré un tipo de elemento HTML (<button> que esté en un <form>.)

¿Qué nos ofrece Selenium para identificar elementos en una página web?
- Id
- CssSelector                   #txt-username
- Name
- XPATH                         //*[@id="txt-username"]
                                /html/body/section/div/div/div[2]/form/div[2]/div/input

## XPATH

Es la guay! Es la más potente de todas las formas, y la única que necesito aprender.
XPath es un estandar del W3C para identificar elementos en un documento XML.
Podemos hacer uso de XPATH para identificar elementos en un documento HTML.

```html
<html>
  <head>
    <title>Login Page</title>
  </head>
  <body>
    <h1>Welcome to the Login Page</h1>
    <div>
      <p>Please enter your credentials below:</p>
    <div>
      <form id="login_form">
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" />
        <label for="password">Password:</label>
        <input type="password" name="password" />
        <button id="login_button">Login</button>
        <button id="forgot_password_button">Forgot Password</button>
      </form>
    </div>
  </body>
```

Cómo podría yo identificar el input donde meter el usuario?
- Quiero el "input" cuyo atributo "name" vale "username":                //input[@name='username']
- Quiero el primer "input" de la página html                             //input[1]
- Quiero el elemento de tipo "input" que tenga como tipo "text"          //input[@type='text']
- Quiero el primer elemento de tipo "input" que aparezca después de un "label" que tenga el texto "Username:"
    //label[text()='Username:']/following-sibling::input[1] 
- Quiero el primer "input" que esté dentro de un "form" cuyo id sea "login_form"
    //form[@id='login_form']//input[1]
- Quiero el input con id "username" <<<< ES LEY ! Es un requisito que doy a desarrollo.
    //input[@id='username']

Siempre debemos elegir la opción menos frágil.
XPATH me da una sintaxis para escribir cualquiera de esas opciones.


Sintaxis de XPATH
- //                A cualquier nivel
- /                 en el siguiente nivel
- tagname           Nombre de la etiqueta HTML      input      div      form
- *                 Cualquier etiqueta HTML
- [ ]               cuyo ...
- [@atributo='valor']       cuyo atributo con ese valor        
- [text()='texto']          cuyo texto sea ese
- [contains(text(),'texto')]   cuyo texto contenga ese texto
- [2]               el segundo que cumpla lo anterior
- following-sibling::   que esté después de su hermano
- preceding-sibling::   que esté antes de su hermano


# Cómo va a ser cualquier script de prueba con Selenium

- Abro una pestaña del navegador
- Voy a la URL que me interesa
- Voy identificando elementos del DOM (usando XPATH)
- Y voy interactuando con ellos:
     - Escribir texto 
     - Hacer click
     - Colocar el ratón encima
     - Leer texto
     - Leer atributos
- Y así sobre todos los elementos que me interesen.
- Al final capturé los datos que quiera de la página:
    - La URL actual
    - Textos que aparecen en ciertos elementos
- Compruebo que esos datos son los que espero (ASSERTIONS)
- Cerrar el navegador

En algunos casos, podré adicionalmente hacer capturas de pantalla (screenshots) de la página web en ciertos momentos.