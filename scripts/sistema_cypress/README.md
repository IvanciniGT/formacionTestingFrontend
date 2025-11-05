# Esos dos comandos de arriba solo al crear el proyecto

    # Lo primero crear un proyecto node:
    # npm init -y

    # Acto seguido, instalar las dependencias necesarias:
    # npm install cypress
    # npm install cypress-xpath

    # Modificado el package.json para añadir los script de cypress:
    "scripts": {
        "test-dev": "cypress open",
        "test": "cypress run"
    }

# Si lo descargo de git, lo único que debo ejecutar es:

npm install

# Para ejecutar las pruebas, añade el siguiente script en el package.json:

npm run test
npm run test-dev


