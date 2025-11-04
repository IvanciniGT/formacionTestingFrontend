const fs = require('fs');
const path = require('path');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

const { describe, it, beforeEach, afterEach } = require('mocha');
// Lo que hace es instalar chromedriver
require('chromedriver');


describe('Login Test Suite', function() {

    const USUARIO_CORRECTO = "John Doe"
    const CONTRASENA_CORRECTA = "ThisIsNotAPassword"
    const URL_LOGIN = "https://katalon-demo-cura.herokuapp.com/profile.php#login"
    const URL_LOGIN_NO_EXITOSO = "https://katalon-demo-cura.herokuapp.com/profile.php#login"
    const URL_LOGIN_EXITOSO = "https://katalon-demo-cura.herokuapp.com/#appointment"
    const MENSAJE_ERROR_LOGIN = "Login failed! Please ensure the username and password are valid."

    const ID_CAMPO_USUARIO = "txt-username"
    const ID_CAMPO_CONTRASENA = "txt-password"
    const XPATH_BOTON_LOGIN = "//*[@id='btn-login']"
    const XPATH_MENSAJE_ERROR = "//p[contains(text(), '" + MENSAJE_ERROR_LOGIN + "')]"

    const TIEMPO_ESPERA = 5

    const ANCHO_PANTALLA = 1024
    const ALTO_PANTALLA = 768

    const CARPETA_CAPTURAS = "./capturas"
    let driver;

    beforeEach(async function() {
        // Crear carpeta para capturas si no existe
        if (!fs.existsSync(CARPETA_CAPTURAS)){
            fs.mkdirSync(CARPETA_CAPTURAS);
        }

        // Configurar el driver de Chrome
        let options = new chrome.Options();
        options.addArguments(`--window-size=${ANCHO_PANTALLA},${ALTO_PANTALLA}`);
        options.addArguments('--headless'); // Ejecutar en modo headless si es necesario

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        await driver.get(URL_LOGIN);
        // Ancho y alto
        await driver.manage().window().setRect({ width: ANCHO_PANTALLA, height: ALTO_PANTALLA });
    });

    afterEach(async function() {
        // Captura de pantalla en caso de fallo
        const nombreCaptura = path.join(CARPETA_CAPTURAS, `despues_login_${Date.now()}.png`);
        const imagen = await driver.takeScreenshot();
        fs.writeFileSync(nombreCaptura, imagen, 'base64');

        await driver.quit();
    });

    it('Login exitoso con credenciales correctas', async function() {
        // CUANDO
        // Meto en el formulario de login el usuario en el input cuyo id es "usuario"
        await driver.findElement(By.id(ID_CAMPO_USUARIO)).sendKeys(USUARIO_CORRECTO);
        // Meto en el formulario de login la contraseña en el input cuyo id es "password"
        await driver.findElement(By.id(ID_CAMPO_CONTRASENA)).sendKeys(CONTRASENA_CORRECTA);
        // Hacer click en el botón de login
        await driver.findElement(By.xpath(XPATH_BOTON_LOGIN)).click();

        // Captura de pantalla tras el login
        const nombreCaptura = path.join(CARPETA_CAPTURAS, `antes_login_${Date.now()}.png`);
        const imagen = await driver.takeScreenshot();
        fs.writeFileSync(nombreCaptura, imagen, 'base64');

        // ENTONCES
        // Quiero asegurarme que no aparece ningún mensaje de error
        // "Login failed! Please ensure the username and password are valid."... XPATH (párrafo que contenga el texto)
        const mensajesError = await driver.findElements(By.xpath(XPATH_MENSAJE_ERROR));
        expect(mensajesError.length).to.equal(0);  // No debería haber mensajes de error
        // Tengo que llegar a una página principal: https://katalon-demo-cura.herokuapp.com/#appointment
        const urlActual = await driver.getCurrentUrl();
        expect(urlActual).to.equal(URL_LOGIN_EXITOSO);
    });
});