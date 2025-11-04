
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