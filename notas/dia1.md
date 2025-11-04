# Metodologías ágiles?

## Principal característica de una metodología ágil?

Entregar el producto de forma incremental al cliente.

Son una evolución de las metodologías tradicionales (cascada-waterfall, v, espiral...). En ellas, el producto se entrega al cliente al final del proyecto, con el producto terminado completo.
Y entonces, y solo entonces venía la fiesta! Solo teníamos feedback del cliente al final del proyecto.
Y en el 100% de los casos, siempre había cosas que el cliente quería cambiar, mejorar, añadir, eliminar...
Y el problema es el impacto que aquello tenía en el proyecto, ya que al ser al final, el coste de esos cambios era muy alto.

Extraído del manifiesto ágil:

> El software funcionando es la **medida** principal de progreso.        > DEFINIR UN INDICADOR PARA UN CUADRO DE MANDO

   núcleo                                   atributo
   ------                             -----------------------
La medida principal de progreso es el "Software funcionando".
------------------------------- ----------------------------
sujeto                          predicado copulativo

La forma en la que vamos a medir qué tal va el proyecto es mediante el concepto "Software funcionando".

Software funcionando = Software que cumple con lo que se espera de él.
Quién dice eso?
    - ~~El cliente~~ Al cliente le debe llegar un producto que funcione... que sea 100% funcional.

    El cliente me ayuda con la definición de requisitos.
    El software funciona si las pruebas pasan OK.

> En las met. tradicionales, cómo sabía cómo iba el proyecto?

Hito 1. 10 de Diciembre: **R1, R2, R3**   > Punto de control interno, que puede llevar asociada entrega o no!

    Si el 10 de Diciembre no estaba el R3?
     - Ostias pa' to's la'os
     - Replanificación del hito: Nueva fecha del Hito1: 20 de Diciembre
     - Vamos tarde

Hito 2. 10 de Enero:     R4, R5, R6


----


Sprint 1. **10 de Diciembre**: R1, R2, R3 > Entrega en producción al cliente

    Si el 10 de Diciembre no está el R3?
     - Ostias pa' to's la'os
     - Se pasa a producción el R1 y R2. La fecha NO SE MUEVE.,. ni un minuto.
     - Vamos tarde
     - El R3 al siguiente sprint

    Para entregar en producción, qué es lo primero que necesito hacer? Pruebas a nivel de producción!
    Qué pruebo? R1, R2, R3!
    Instalación en el entorno de QA/PRUEBAS/INTEGREACIÓN/PRE
    Instalación en el entorno de PRODUCCIÓN

Sprint 2. 10 de Enero:     R4, R5, R6

    Para entregar en producción, qué es lo primero que necesito hacer? Pruebas a nivel de producción!
    Qué pruebo? R4, R5, R6! + R1, R2, R3! que he toca'o código y lo mismo he jodido algo!
    Instalación en el entorno de QA/PRUEBAS/INTEGREACIÓN/PRE
    Instalación en el entorno de PRODUCCIÓN

Las pruebas se multiplican al usar una metodología ágil. Me crecen como enanos!


Con una metodología tradicional, solo hacíamos pruebas al final del proyecto.
Y cuántas instalaciones hacíamos? 1, al final del proyecto.

Y ahora.. con este rollito de las met. ágiles... cuántas instalaciones hacemos? y cuántas pruebas?
Y la pregunta importante: De dónde sale la pasta para eso? Y los recursos? Y el tiempo? NI HAY TIEMPO, NI HAY RECURSOS , NI HAY PASTA !!!!!

Y eso solo tiene una solución: AUTOMATIZAR TODO LO AUTOMATIZABLE!
O automatizo o no hay manera de hacer esto.
Por eso queremos: AUTOMATIZAR LAS PRUEBAS, AUTOMATIZAR LAS INSTALACIONES, AUTOMATIZAR LA GENERACIÓN  DE LOS ENTORNOS...
Hasta la generación de un informe de pruebas se puede automatizar!


Hoy en día, un tester ya no prueba aplicaciones: Hace programas que prueban aplicaciones = AUTOMATIZAR PRUEBAS: Selenoium, postman, cucumber
Hoy en día, un sysadmin ya no administra sistemas: Hace programas que administran sistemas = AUTOMATIZA LA ADMINISTRACIÓN DE SISTEMAS: Kubernetes, ansible, terraform

Y los servidores de automatización son los que hacen todo esto posible: Jenkins, Gitlab CI/CD, Travis CI, Circle CI...Azure Devops, AWS DevOps...

---

# DEVOPS
Cultura, movimiento, filosofía... en pro de la automatización. Chicos, vamos a automatizar todo lo que podamos.. entre el DEV -> OPS

- Integración Continua          Tener Continuamente la última versión del código en el entorno de integración sometido a pruebas automáticas. 
                                 -> Informe de pruebas en tiempo real
- Entrega Continua              Poner automáticamente a disposición del cliente la última versión del producto que ha pasado las pruebas.
- Despliegue Continuo           Instalar automáticamente en producción la última versión del producto que ha pasado las pruebas.

Jenkins, Gitlab CI/CD, Travis CI, Circle CI..., Bamboo, TeamCity

---

Las culturas, las metodologías, las herramientas, los lenguajes, las arquitecturas, los patrones de diseño... todo eso evoluciona conjuntamente en el tiempo, para resolver los problemas que van surgiendo en ese momento del tiempo.

DEVOPS <> AGILE <> SpringBoot|Angular|.netCore <> ComponentesDesacoplados(Microservicios) <> Cloud, SOLID, Testing por fases.

---

# Testing

## Vocabulario en el mundo del testing

- Causa raíz        El motivo por el que el humano comete un error.
- Error             Los humanos cometemos errores (errar es humano). Las máquinas cometen errores? NO
- Defecto           Al cometer un error, los humanos podemos introducir un defecto en el producto. (bug)
- Fallo             La manifestación de un defecto al usar el producto. Desviación respecto del comportamiento esperado.

## Para que sirven las pruebas?

- Para asegurar el cumplimiento de unos requisitos.
- Para tratar de minimizar la cantidad de defectos que se entregan con nuestro producto.
  Hay pruebas que se especializan en identificar FALLOS (usan el producto para tratar de provocar un fallo).
  Desde el fallo, posteriormente trato de identificar el defecto (depuración o debugging).
  - Ayudarnos a realizar un rápido debugging... identificar rápidamente los defectos desde los fallos que se han producido.
  Hay otras pruebas que puedo hacer... pruebas especializadas en detectar defectos  (Revisión del código, Modelo de datos)
- Mejorar la calidad del producto (Facilitar el mantenimiento y evolución del producto)
- Para saber cómo va el proyecto
- Para aprender de mi producto y su comportamiento. Incrementar el know-how del equipo de desarrollo.
- Para haciendo un análisis de causas raíz, tomar acciones preventivas que ayuden a mitigar los futuros errores, con sus consecuentes defectos y fallos.
- ...

## Tipos de pruebas

Hay muchas formas de clasificar las pruebas... distintas taxonomías.

### En base al objeto de prueba

- Pruebas funcionales                   Las que trabajan sobre requisitos funcionales.
- Pruebas no funcionales                Las que trabajan sobre requisitos no funcionales (rendimiento, seguridad, usabilidad...)
   - De carga
   - De estrés
   - De rendimiento
   - De HA (alta disponibilidad)
   - De seguridad
   - De UX
   - ...

### En base al conocimiento que tengo del objeto de prueba

- Pruebas de caja blanca.       Cuando tengo y uso conocimiento del funcionamiento interno de lo que pruebo al diseñar la prueba
- Pruebas de caja negra         Cuanto no tengo o decido no usar el conocimiento interno de lo que prueba al diseñar la prueba

### En base al procedimiento de ejecución
                                                                                                                Qué identifican?
- Pruebas dinámicas              Las que necesitan poner en marcha(usar) el producto para su ejecución     ->     Fallos
- Pruebas estáticas              Las que NO necesitan poner en marcha(usar) el producto para su ejecución  ->     Defectos

### En base al alcance de la prueba (SCOPE)

- Pruebas unitarias              Se centra en una característica de un componente AISLADO del sistema.

    Soy BTWIN: Decathlon
    - Manillar
    - Cuadro
    - Sistema de frenos (SHIMANO)
         Podría probar el sistema de frenos sin tener todavía la bici montada? Sí, claro que sí! 
         Podría hacerle pruebas UNITARIAS: Es decir, pruebas al sistema de frenos aislado del resto de componentes.
         Por ejemplo, podría montar el sistema de frenos en un bastidor (4 hierros mal soldaos).
         Prueba:
            Contexto                Given (Dado)
                Tengo un bastidor y le amarró (atornillo) el sistema de frenos... y coloco un sensor de presión entre las pinzas
            Acción                  When (Cuando)
                Aprieto la palanca del freno ... ejecuto apretarPalanca();
            Resultado esperado      Then (Entonces)
                Que se cierren las pinzas de freno
                Que lo hagan aplicando una determinada cantidad de presión.... puedo medirlo? sobre el sensor.
    - Ruedas
    - Sillín
         Podría probar el sillín sin tener todavía la bici montada? Sí, claro que sí!
         Podría hacerle pruebas UNITARIAS: Es decir, pruebas al sillín aislado del resto de componentes.
         Por ejemplo, podría montar un bastidor (4 hierros mal soldaos) y montar el sillín en él.
         Qué pruebas podría hacerle?
            - Carga: Aguanta a un tio de 150Kgs?
            - De estrés: Aguanta las inclemencias del tiempo? Aguanta 1000 veces que una persona se siente y se levante sin que el cuero se deteriore?
            - De UX: Es cómodo cuando siento a un tio ahí durante 5 horas?
            Y todo eso son pruebas unitarias. 

        Pregunta... Si estas pruebas dan bien, tengo garantías de que la bici va a funcionar? NO 
        Pero qué gano? Para qué hago las pruebas? Confianza +1 -> Vamos bien!
        Cada paso que doy, lo doy en firme!
        Me hacen falta más pruebas.

- Pruebas de integración                Se centran en la COMUNICACIÓN entre 2 COMPONENTES:
       Sillín y el sistema de frenos? NO... no son 2 componentes que estén integrados entre si.
       Sistema de frenos y las ruedas? SI... el sistema de frenos actúa sobre
       Cómo hago la prueba:
         Por ejemplo, podría montar el sistema de frenos en un bastidor (4 hierros mal soldaos).
         Prueba:
            Contexto                Given (Dado)
                Tengo un bastidor y le amarró (atornillo) el sistema de frenos... coloco la rueda entre las pinzas y le pego un viaje a la rueda para que se ponga a girar, 
            Acción                  When (Cuando)
                Aprieto la palanca del freno ... ejecuto apretarPalanca();
            Resultado esperado      Then (Entonces)
                Que la rueda se detiene

            Y mira que no!
            Resulta que las pinzas cierran.. y cierran con fuerza... pero no cierran lo suficiente para tocar la llanta de la rueda... es muy estrecha para ese sistema de frenos = PROBLEMÓN!
         > Pregunta: Tengo un problema con el sistema de frenos? Es defectuoso? NO
         > Pregunta: Tengo un problema con la rueda? Es defectuosa? NO

         Tengo un problema con ambos al trabajar juntos. No se llevan bien. El sistema de frenos no es capaz de COMUNICAR la energía de rozamiento de las pinzas a la llanta!

    Pregunta... Si todas estas pruebas van bien... Me garantiza que la bici va a funcionar? NO
    Entonces, para que hago estas pruebas? Qué gano? Confianza +1 -> Vamos bien!
    Sigo dando pasos en firme!
    Pero... me hacen falta más pruebas.

- Pruebas de sistema (end2end)      Se centran en el COMPORTAMIENTO del sistema en su conjunto.
        Cojo una bici, pongo encima a un individuo, mochila en la espalda, bocadillo de choped y botella de agua.. y pa' Cuenta.. a hacer kms!!
        Y el tio vuelve a las 4 horas.. y dice.. ha ido bien!
        Pregunta... Si todas estas pruebas van bien... Me garantiza que la bici va a funcionar? SI
        Otra pregunta... entonces, para qué ostias he hecho las otras pruebas?
        Dicho de otra forma: Si hubiera hecho solo estas pruebas y van bien, necesitaría para algo hacer pruebas unitarias y de integración? NO... ya para qué? Si ya tengo una bici que funciona! (así lo hacíamos en sistemas monolíticos!)

        Esa pregunta tiene truco ... tiene 2 trucos:
        1. Y si van mal! Dónde está el problema? NPI... ponte a averiguarlo.. y a ver qué impacto tiene!
        2. Cuándo puedo hacer estas pruebas? Cuando ya tengo bici.. al final! Y hasta entonces? Qué tal vamos? NPI

        Significa esto que el cliente me acepta la bici? NO

  - Pruebas de aceptación: Las que hará el cliente, a ver si la bici le encaja o no!
    Pero lo que le doy es una bici que funciona! Otra cosa es que no le encaje.. Es muy grande para mi.. Es muy pequeña para mi.. Es muy cara para mi.. No me gusta el color...  

    Por cierto... y el sensor... y el bastidor ese que había por ahí... Qué hago con ellos, una vez acabado el proyecto? A la basura!
    Pero los tengo que considerar en el presupuesto.

    Estos elementos : Test Doubles (Sensor, bastidor).. y hay muchos tipos:
     - Mocks
     - Stubs
     - Fakes
     - Spies
     - Dummies

---
~~RNF001 - El sistema debe dar unos tiempos de respuesta aceptables!~~ RUINA ABSOLUTA !
~~RNF001 - El sistema debe ofrecer unos tiempos de respuesta inferiores a 500ms.~~RUINA MAS GRANDE Y CAMUFLADA !

RNF001 - El sistema, instalado en un entorno con TALES característica, cuando está sometido a TAL carga de trabajo, debe permitir hacer TAL operación con un Percentil 95 inferior a 500ms, cuando esa operación se hace al menos 500 veces.  AQUÍ YA EMPEZAMOS A ENTENDERNOS!

Hoy en día (SCRUM NO LO REQUIERE, aunque otras metodologías de gestión SI) lo habitual y lo recomendado y las buenas prácticas que seguimos en los proyectos es definir primero las pruebas, después escribir el código y por último ejecutar las pruebas, para asegurarnos que el código pasa las pruebas.

TDD: Metodología de DESARROLLO DE SOFTWARE: Test Driven Development: Desarrollo guiado por pruebas.
3 fases: ROJO - VERDE - REFACTOR
    Hago pruebas que no pasen (ROJO)
    Hago el código mínimo para que pasen (VERDE)
    Refactorizo el código (REFACTOR)
    Y empiezo otra vez!

BDD: Behavior Driven Development: Desarrollo guiado por el comportamiento.
    Evolución de TDD, donde las pruebas se escriben en un lenguaje cercano al lenguaje natural (Gherkin)
    Given - When - Then
ATDD: Acceptance Test Driven Development: Desarrollo guiado por pruebas de aceptación.
    Evolución de BDD, donde las pruebas se centran en las pruebas de aceptación.


No son excluyentes... TDD es el prime paso, pero puedo optar por BDD, que implica TDD, y luego ATDD, que implica BDD y TDD.

Esas pruebas, especialmente BDD se definen por los testers (QA) junto con el cliente y habitualmente(idealmente) con apoyo del equipo de desarrollo.
En un lenguaje humano (natural) : Gherkin -> Given - When - Then -> Cucumber (SmartBear: Swagger/OpenAPI, SoapUI)
 Son a la vez requisitos y pruebas. -> Se usan para la definición en metodologías como SCRUM del DEFINICIÓN DE HECHO (DoD: Definition of Done)

---

# GIT (>97% de los proyectos usan GIT hoy en día)

Es clave definir el flujo de trabajo (workflow) que vamos a usar en el proyecto.

    > Librería de operaciones matemáticas

    ------ main/master -------------------------------------------C4
                                                                 /    En este punto es cuando se deben pasar las pruebas de Sistema (end2end)
    ------ dev/desa ------------> C1 ------->  C2 ------------> C4
                                   \           / \            /
                                    \         / fast-forward (copiar commit entre ramas)
                                     \       /     \        /
      ------ operación Suma  -------- C1 -> C2      \      /  En este paso, de subir C4 a desa, se me deben exigir que supere las pruebas de Integración
                                        \            \    /
        ------ operación Resta --------  C1 ---> C3 --> C4
                                                    ^
                                                    Cuando me decido a integrar mi funcionalidad de resta en la rama desa, lo primero que debo asegurarme es que mi código funciona por si mismo (AISLADO) = PRUEBAS UNITARIAS = OK!

2 reglas de oro de la rama main?
- Nunca bajo pena de cortarle al ti@ las uñas hipercortas y meterle la mano en un vaso lleno de zumo puro de limón! se puede hacer un commit en esa rama!
  Eso es motivo de expulsión = DESPIDO!
- Lo que hay ahí dentro se considera apto para producción

2 reglas de oro de la rama dev/desa?
- Nunca se hace un commit en esa rama! TAMPOCO! (a no se ser que estemos trabajando en un proyecto yo y mi primo.. y sea pequeñito)
- Lo que hay ahí dentro se considera apto para la siguiente release

Qué es un COMMIT EN GIT? Un commit en git es una copia completa del proyecto en un momento dado del tiempo. Es igual a hacer botón derecho del ratón... en la carpeta principal del proyecto y Comprimir en un zip!


Y en git hay un concepto que se llama HOOKS.. que son scripts que puedo forzar a que se ejecuten en determinados momentos del flujo de trabajo.
Por ejemplo, al pasar de una rama Feature a la rama dev/desa, puedo forzar que se ejecuten las pruebas unitarias y de integración.. y si no pasan, que me rechace el merge en automático.

Y por ejemplo, al pasar de la rama dev/desa a la rama main/master, puedo forzar que se ejecuten las pruebas de sistema (end2end).. y si no pasan, que me rechace el merge en automático.

Y para que no haya trucos sucios... en paralelo con las pruebas que definimos, se calcula lo que se llama la COBERTURA DE PRUEBAS.
Hay herramientas especializadas para ello: JaCoCo (Java), Istanbul (JavaScript), Coverlet (.net core)...
Esas herramientas son capaces de determinar qué porcentaje del código fuente está siendo ejecutado por las pruebas.
Y si no se llega a un % definido (80% por ejemplo), se rechaza el merge automáticamente.
Y además habitualmente llamo a una herramienta como SonarQube (esto entra de serie hoy en día en todos los proyecto.. En ViewNext lo usáis intensivamente)
Esa herramienta hace un análisis de calidad del código, revisando que se siguen buenas prácticas de programación, patrones de diseño, principios SOLID, etc. SOLO SE LEE EL CÓDIGO (Pruebas estáticas) Y si sonarqube no da el visto bueno, se rechaza el merge automáticamente.

Esto es lo que se configura en un pipeline de integración continua (CI) en Jenkins, Gitlab CI/CD, Travis CI, Circle CI..., Bamboo, TeamCity...
Para emitir un informe de pruebas, que incluya cobertura de pruebas, análisis de calidad del código, etc.

Así es como trabajamos a día de hoy... No os estoy contando películas...

Parte del trabajo que hacemos en un desarrollo es en frontales web. Y hay herramientas que nos ayudan a hacer pruebas automatizadas de frontales web....
A distintos niveles: 
- Unitarias: Jest, Mocha, Jasmine, Karma, etc.
- Integración: Cypress, Puppeteer, TestCafe, etc.
- Sistema (end2end): Selenium, Cypress, Puppeteer, TestCafe, etc.

Imaginad que estoy desarrollando un formulario WEB... quiero robar que el formulario manda los datos al servidor? 
- De entrada... mal asunto sería hoy en día que un formulario mandase los datos al servidor directamente...
  Lo normal es que haya una capa intermedia: Servicio en frontal (Angular Service, React Service, etc) que se encarga de hacer la llamada al backend.
- Incluso, aunque hubiéramos seguido ese patrón, esa prueba no sería la primera que querría hacer... eso sería una prueba de sistema!


        Frontal                             Backend
        ------------------------        -----------------------------------------------------------------------
        Formulario ---> Servicio -----> Controlador REST ----> Servicio -----> Repositorio -----> Base de datos.
        
                                        @RestController        @Service        @Repository

Las pruebas unitarias y de integración son responsabilidad del DESARROLLADOR.
Cuidado que muchas veces a pruebas de sistema, las mal - llamamos pruebas de integración... y no es correcto.

Las pruebas de sistema son responsabilidad del TESTER (QA).
Las unitarias y de integración son responsabilidad del DESARROLLADOR.
No tienen acceso a ese código.. No pueden aislar componentes.
Para hacer una prueba unitaria o de integración, necesitamos aislar componentes.... y eso lo hacemos generando componentes de cartón piedra en los que confío.... EL BATIDOR, el SENSOR.


CUIDADO!

No toda arquitectura soporta pruebas unitarias e integración.
Dependiendo de cómo haya montado el sistema podré o no hacer pruebas unitarias e integración.

En un sistema monolítico, por definición es imposible hacer pruebas unitarias e integración. Porque los componentes están hardcodeados entre sí.
Y no puedo aislarlos.... dando el cambiazo a un componente por otro de cartón piedra (mock, stub, fake, spy, dummy).

Pruebas de sistema puedo hacer siempre.
---

# Otras clasificaciones o nomenclaturas:

- Pruebas de regresión: Básicamente cualquier prueba que repito por haber cambiado código
---

Cuando desarrollamos pruebas hay una serie de principios que debemos aplicar: FIRST

F - Fast                Las pruebas deben ser rápidas de ejecutar
I - Independent         Las pruebas deben ser independientes entre sí <<< Muy importante y muy difícil de conseguir!
R - Repeatable          Las pruebas deben ser repetibles en cualquier entorno y en cualquier momento
S - Self-validating     Las pruebas deben ser auto-validantes... es decir, comprobar todo lo que tienen que comprobar al ejecutar la prueba
T - Timely              Oportunas: Las pruebas deben desarrollarse cuando tiene sentido hacer esa prueba

---

> Un producto de software por definición es un producto sujeto a cambios y mantenimientos.


    CÓDIGO  <>  PRUEBAS  >  OK   -> Refactorización <> PRUEBAS > OK -> Libero!

    <------ 50% del trabajo ------> <------ 50% del trabajo -------> 
               8 horas                         8 horas 


---

# Testing Automatizado aplicado a frontales

- Sistema
-------------
- Integración \
- Unitarias   / Solamente si hemos diseñado el sistema con una arquitectura que nos permita hacer pruebas unitarias e integración.

# Sistema montado con PHP o JSP tradicional:

Dentro del fichero php, recibimos la petición, hago validaciones, hacemos la lógica de negocio, accedemos a la base de datos y generamos la vista (HTML) que devolvemos al cliente.

En este caso puedo hacer pruebas unitarias o de integración? NO..

Porque no hay forma de aislar componentes. No hay componentes.. tenemos todo junto.

Hay muchas arquitecturas de componentes desacoplados (Microservicios, Arquitectura Hexagonal, Arquitectura en capas, Arquitecturas limpias, etc) que nos permiten hacer pruebas unitarias e integración.

Para poder hacer pruebas unitarias y de integración mi arquitectura debe cumplir una serie de requisitos:
- Desacoplamiento de componentes
- Cumplir con el principio de inversión de dependencias (D de SOLID)
De esto hablaremos más adelante (Miércoles)

Mañana martes vamos a estar con pruebas de sistema.
Miércoles y Jueves estaremos con pruebas unitarias e integración, y arquitectura de software.

---

# Forma de montar el frontal web

2 estrategias grandes:
- Estrategia antigua: El html se generaba en el servidor (JSP, PHP, ASP clásico, Servlets ...) y se mandaba al cliente!
- Estrategia más moderna: El html se genera en el cliente vía JS (Angular, React, Vue, Blazor, etc)... El servidor solo envía datos (JSON, etc) al cliente... y es en el cliente en el que se genera el html... habiendo una separación muy clara entre lo que es el frontal (cliente) y el backend (servidor).

En función de esto, el tipo de pruebas que podamos hacer y las herramientas que usemos serán unas u otras.

---

# Las pruebas hemos dicho que deben cumplir con los principios FIRST

FIRST: 
F - Fast                Las pruebas deben ser rápidas de ejecutar
I - Independent         Las pruebas deben ser independientes entre sí <<< Muy importante y muy difícil de conseguir!
R - Repeatable          Las pruebas deben ser repetibles en cualquier entorno y en cualquier momento
S - Self-validating     Las pruebas deben ser auto-validantes... es decir, comprobar todo lo que tienen que comprobar al ejecutar la prueba
T - Timely              Oportunas: Las pruebas deben desarrollarse cuando tiene sentido hacer esa prueba

Pregunta... tengo un sistema que gestiona expedientes y quiero probar que puedo borrar un expediente.
Cómo planteamos esa prueba?
    DADO
        Que tengo una app de gestión de expedientes
        y esa aplicación tiene configurado un validador de identidades que a todo el mundo le dice que si.
         ESTOY PROBANDO AQUÍ EL LOGIN? NO... entonces para que quiero poner el sistema de login REAL... pon uno que diga que si a todo el mundo, y la prueba irá más rápida. STUB del componente de validación de identidades.
         Un STUB es un doble de pruebas que siempre devuelve una respuesta prefijada: En nuestro caso: PASE USTED!
        Que creo un expediente con unos datos X... y obtengo un ID para ese expediente
        y que entro al sistema con un usuario y contraseña válidos
        y que tienen permisos para borrar expedientes
    CUANDO
        intento borrar el expediente creado anteriormente (Aprieto el botón borrar expediente, encima de ese expediente)
    ENTONCES
        el sistema me debe informar que el expediente se ha borrado correctamente
        el expediente se debe haber borrado de la BBDD (TOTALMENTE si es una prueba de sistema!) end2end

        Imaginad un sistema en el que el cachondo del desarrollador haya hecho mal la query... y no borre de la bbdd... pero siempre me redirige a una pantalla que dice que se ha borrado correctamente... La prueba Sin comprobar si el expte está en la bbdd, se daría por buena! Es decir, tenbemos un sistema con un comportamiento incorrecto... y la prueba no lo detecta... La prueba lo da por válido! RUINA !
        AQUI ENTRA EL SELF VALIDATING: La prueba debe comprobar hasta sus últimas consecuencias que el sistema se comporta como se espera.

Diseñar pruebas es complejo... es un arte!
A la mínima diseño unas pruebas que sea capaz de superar con un sistema inválido... y eso es un desastre.

---

Vamos a hacer pruebas de sistema en frontales... Un frontal, donde corre? En un navegador...
Entonces, mi prueba debe poder cuanto menos controlar un navegador.

Es posible controlar automáticamente un navegador WEB (Chrome)? De hecho hay un estandar del W3C para ello: WebDriver.

Los navegadores de internet hoy en día cumplen con ese estándar. Ese estandar permite que programas terceros puedan controlar el navegador, mediante órdenes (peticiones HTTP) que se mandan a un puerto que abre el navegador.

Para poder hacer esto, necesitamos un controlador de navegador : WebDriver

Cada fabricante de navegadores de internet nos ofrece un WebDriver para su navegador:
- Chrome: ChromeDriver (eso es un programa que permite mandar órdenes al navegador Chrome... y extraer datos de él)
- Firefox: GeckoDriver
- Safari: SafariDriver
- Edge: EdgeDriver


    Programa  <> Selenium Webdriver <>  WebDriver                   <>  Navegador    <> Mi app web que quiero probar
                                         (dependiente del navegador)

     ^^^^^^

     Este es el programa que queremos montar nosotros. 
     Un programa que probará nuestra app... de forma automática... sin intervención humana.
     Es decir, el programa tiene que ser capaz de determinar si la app se comporta como se espera o no.... y devolver al final un TRUE o FALSE (OK o KO)

     Estos programas son bastante simples... son scripts.

     No todos los programas son iguales:
     - Aplicación
     - Driver
     - Biblioteca
     - Comando
     - Script    <<<<<<<<<<<.   Son programas que hacen una secuencia de acciones predefinidas y acaban devolviendo un OK o KO

En nuestro caso usaremos Selenium.
Selenium realmente son 3 cosas diferentes:
- Selenium IDE: RUINA ! Para aprender a usar Selenium el día 0 me vale. YA... ni el día 2 me vale.
- Selenium Webdriver: Biblioteca de programación (librería) que me permite desde muchos lenguajes hablar con un webdriver (ChromeDriver, GeckoDriver, etc)
  Esa librería la tenemos disponible para muchos lenguajes de programación:
    - Java
    - JavaScript
    - Python
    - C#
    - Ruby
    - etc
- Selenium Grid

Y al final lo que haremos será escribir un programa en nuestro lenguaje de programación favorito (Java, JavaScript, Python, C#, Ruby, etc) que use la librería Selenium Webdriver para hablar con el WebDriver del navegador que queramos usar (ChromeDriver, GeckoDriver, etc) y así controlar el navegador y probar nuestra app web de forma automática.

Para trabajar mañana, necesitamos elegir un lenguaje de programación.
Yo recomiendo sin dudas python! Es lo más simple y rápido para hacer pruebas automáticas con Selenium.

Vamos a hacer ejemplos con Python y JS.

Necesitamos para mañana: 
- python 
- node (es el equivalente a la JVM para JS... me permite correr programas JS fuera de un navegador) Es el antiguo motor de procesamiento de JS del navegador Cromium, que en un momento dado del tiempo, Google lo sacó (Arrancó) del navegador y lo convirtió en un programa independiente (Node.js)
  A partir de ese momento JS cambia... 100% y puede usarse para desarrollar cualquier tipo de aplicación... no solo aplicaciones web que corren en un navegador.

---

Tengo una app web... y quiero probarla... 
Sobre qué navegador la pruebo? 
- Chrome
- Edge
- Firefox
- Safari
- En qué versiones de esos navegadores? En la última? En las 5 últimas?
- Sobre que Sistema operativo? Sobre qué versión de SO
- Sobre que dispositivo? 
   - Móvil... En qué iphone? En qué dispositivo Android? Samsung galaxy S21 <> Samsung galaxy S10
   - Tablet
   - Escritorio / PC / Portatil


Cuántas combinaciones tengo? Entre un huevo y 3..
Tengo tiempo para poder hacer todas esas pruebas? Y recursos? Ni de coña!
Puedo automatizar.. eso está guay...
Tengo a mi disposición toda esa variedad de dispositivos y navegadores? NO

Y eso son los GRIDs de Selenium... Un grid de selenium es una granja de dispositivos sobre la que puedo lanzar mis pruebas automáticas.
En la empresa, me puedo montar mi propia granja... emulando 4/5 tipos de dispositivos y navegadores... y lanzar mis pruebas ahí.

Evidentemente no puedo comprar y mantener actualizados todos los dispositivos y navegadores que existen en el mercado.
Hay empresas que se dedican a ello.. y me alquilan esas granjas de dispositivos y navegadores... y puedo lanzar mis pruebas ahí.
A precios populares... y pagando por uso.

De normal, probamos nuestra app contra 1,2... 3 combinaciones... Eso si.. si quiero hacer pruebas en serio, antes de un paso a producción, debo probar en el mayor número de combinaciones posibles.

Para configurar un grid de selenium, la forma más sencilla es con Contenedores (DOCKER)

---


# Sistema... 

En pruebas de sistema me da igual todo eso. Podemos usar las mismas herramientas en ambos casos y despreocupamosos de la arquitectura interna del sistema.
SELENIUM.

