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