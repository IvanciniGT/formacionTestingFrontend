
Al trabajar con python, igual que con otros lenguajes, necesitamos descargar librerias, dependencias.
En nuestro caso, Selenium es una de ellas.
Lo que hacemos en python es crear un entorno virtual: Virtual Environment (venv).
En ese entorno es en el que tendremos las librerias que vayamos deseando instalar.
Así en otro proyecto podemos crear otro entorno virtual con otras librerias o versiones distintas de las mismas.

# Crear el entorno virtual donde descargar las librerías
$ python3 -m venv venv   # ( Si no funciona: $ python -m venv venv )

# Activar el entorno virtual
$ source venv/bin/activate   # ( Mac / Linux)
$ .\venv\Scripts\activate    # ( Windows )

# Instalar las librerías necesarias
(venv) $ pip install -r requirements.txt

# Ejecutar las pruebas
(venv) $ python login/login_test.py

# Desactivar el entorno virtual
(venv) $ deactivate


MODELO DE IA:

- Claude de Anthropic: Hoy en día los mejores que hay para desarrollo de software.
- GPTs de OpenAI: De propósito general     |
- GEMINI de Google: De propósito general   | Funcionan bien para generación de código... pero años luz de los de Anthropic.


# Prompts para Modelos de IA

DA EXACTAMENTE IGUAL EL PROMPT QUE LE PONGAIS A LA IA... No vale para mierda!

Las IAs nos han vendido que es muy importante darles un buen prompt... Tenéis cientos de videos en youtube... en linkedin... etc etc etc.... NO VALE PARA NADA!

Las IAs hay 2 formas de pasarles información:
- MALA: El prompt
- BUENA: El CONTEXTO

Echa un ojo a mi fichero... Estoy generando contexto, quiero que la IA entienda lo que estoy haciendo... y cómo lo estoy haciendo... 
LO UNICO QUE HAGO CON ESO ES GENERAR CONTEXTO... y luego le paso un prompt sencillo. 