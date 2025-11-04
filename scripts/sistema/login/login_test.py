# Importar las librerías necesarias 
import os
import time
## Importar unittest para las pruebas
import unittest
## Importar Selenium y las herramientas necesarias para manejar Chrome
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Defino una clase que contendrá todas las pruebas relacionadas con el login
class LoginTest(unittest.TestCase):

    # Constantes que uso en mi testing
    USUARIO_CORRECTO = "John Doe"
    CONTRASENA_CORRECTA = "ThisIsNotAPassword"
    URL_LOGIN = "https://katalon-demo-cura.herokuapp.com/profile.php#login"
    URL_LOGIN_NO_EXITOSO = "https://katalon-demo-cura.herokuapp.com/profile.php#login"
    URL_LOGIN_EXITOSO = "https://katalon-demo-cura.herokuapp.com/#appointment"
    MENSAJE_ERROR_LOGIN = "Login failed! Please ensure the username and password are valid."

    ID_CAMPO_USUARIO = "txt-username"
    ID_CAMPO_CONTRASENA = "txt-password"
    XPATH_BOTON_LOGIN = "//*[@id='btn-login']"
    XPATH_MENSAJE_ERROR = f"//p[contains(text(), '{MENSAJE_ERROR_LOGIN}')]"

    TIEMPO_ESPERA = 5  # segundos

    ANCHO_PANTALLA = 1024
    ALTO_PANTALLA = 768

    CARPETA_CAPTURAS = "./capturas"

    # En nuestro caso, que querremos hacer más pruebas, en todas ellas, necesitaremos abrir el navegador.. Y cuando acaben cerrarlo
    # Y todas esas pruebas comienzan en la misma página web de login

    # La librería unittest nos permite definir funciones especiales que se ejecutan antes y después de cada prueba
    # En realidad cualquier librería de pruebas en cualquier lenguaje de programación tiene esta funcionalidad

    def setUp(self): # Lo que ponga aquí dentro se ejecuta antes de cada prueba
        # Asegurarme que la carpeta de capturas existe
        if not os.path.exists(self.CARPETA_CAPTURAS):
            os.makedirs(self.CARPETA_CAPTURAS)
        # Instalación del chromedriver
        service = Service(ChromeDriverManager().install())
        # Arrancar el navegador Chrome
        self.driver = webdriver.Chrome(service=service)
        # Voy a navegar a la página de login
        self.driver.get(self.URL_LOGIN)
        # Colocar la pantalla en un determinado tamaño
        self.driver.set_window_size(self.ANCHO_PANTALLA, self.ALTO_PANTALLA)

    def tearDown(self): # Lo que ponga aquí dentro se ejecuta después de cada prueba
        # Aquí podría hacer una captura de pantalla para ver el estado final de la prueba
        # El nombre del fichero debería ser el de la prueba que se acaba de ejecutar
        self.driver.save_screenshot(f"{self.CARPETA_CAPTURAS}/screenshot_{self._testMethodName}_despues_login.png")
        # Cierra el navegador
        self.driver.quit()


    def click_en_boton_login(self): # Lo que ponga aquí dentro se ejecuta después de cada prueba
        self.driver.save_screenshot(f"{self.CARPETA_CAPTURAS}/screenshot_{self._testMethodName}_antes_login.png")
        self.driver.find_element("xpath", self.XPATH_BOTON_LOGIN).click()
        # Espera implicita para que cargue la siguiente página
        self.driver.implicitly_wait(self.TIEMPO_ESPERA)

    # Cada función será una prueba diferente
    def test_login_con_datos_correctos(self):
        # CUANDO
        # Meto en el formulario de login el usuario en el input cuyo id es "usuario"
        self.driver.find_element("id", self.ID_CAMPO_USUARIO).send_keys(self.USUARIO_CORRECTO)
        # Meto en el formulario de login la contraseña en el input cuyo id es "password"
        self.driver.find_element("id", self.ID_CAMPO_CONTRASENA).send_keys(self.CONTRASENA_CORRECTA)
        # Hacer click en el botón de login
        self.click_en_boton_login()

        # ENTONCES
        # Quiero asegurarme que no aparece ningún mensaje de error
        # "Login failed! Please ensure the username and password are valid."... XPATH (párrafo que contenga el texto)
        self.assertEqual(0, len(self.driver.find_elements("xpath", self.XPATH_MENSAJE_ERROR)))  # No debería haber mensajes de error
        # Tengo que llegar a una página principal: https://katalon-demo-cura.herokuapp.com/#appointment
        self.assertEqual(self.URL_LOGIN_EXITOSO, self.driver.current_url)


    def test_login_con_datos_vacios(self):
        # CUANDO
        # Hacer click en el botón de login
        self.click_en_boton_login()

        # ENTONCES
        # Quiero asegurarme que no aparece ningún mensaje de error
        # "Login failed! Please ensure the username and password are valid."... XPATH (párrafo que contenga el texto)
        self.assertEqual(1, len(self.driver.find_elements("xpath", self.XPATH_MENSAJE_ERROR)))  # No debería haber mensajes de error
        # Tengo que llegar a una página principal: https://katalon-demo-cura.herokuapp.com/#appointment
        self.assertEqual(self.URL_LOGIN_NO_EXITOSO, self.driver.current_url)


    def test_login_con_password_vacios(self):
        # CUANDO
        # Meto en el formulario de login el usuario en el input cuyo id es "usuario"
        self.driver.find_element("id", self.ID_CAMPO_USUARIO).send_keys(self.USUARIO_CORRECTO)
        # Hacer click en el botón de login
        self.click_en_boton_login()

        # ENTONCES
        # Quiero asegurarme que no aparece ningún mensaje de error
        # "Login failed! Please ensure the username and password are valid."... XPATH (párrafo que contenga el texto)
        self.assertEqual(1, len(self.driver.find_elements("xpath", self.XPATH_MENSAJE_ERROR)))  # No debería haber mensajes de error
        # Tengo que llegar a una página principal: https://katalon-demo-cura.herokuapp.com/#appointment
        self.assertEqual(self.URL_LOGIN_NO_EXITOSO, self.driver.current_url)


    def test_login_con_usuario_vacios(self):
        
        # CUANDO
        # Meto en el formulario de login la contraseña en el input cuyo id es "password"
        self.driver.find_element("id", self.ID_CAMPO_CONTRASENA).send_keys
        # Hacer click en el botón de login
        self.click_en_boton_login()

        # ENTONCES
        # Quiero asegurarme que no aparece ningún mensaje de error
        # "Login failed! Please ensure the username and password are valid."... XPATH (párrafo que contenga el texto)
        self.assertEqual(1, len(self.driver.find_elements("xpath", self.XPATH_MENSAJE_ERROR)))  # No debería haber mensajes de error
        # Tengo que llegar a una página principal: https://katalon-demo-cura.herokuapp.com/#appointment
        self.assertEqual(self.URL_LOGIN_NO_EXITOSO, self.driver.current_url)

    def test_login_con_usuario_incorrecto(self):
        
        # CUANDO
        # Meto en el formulario de login el usuario en el input cuyo id es "usuario"
        self.driver.find_element("id", self.ID_CAMPO_USUARIO).send_keys(self.USUARIO_CORRECTO + "X")
        # Meto en el formulario de login la contraseña en el input cuyo id es "password"
        self.driver.find_element("id", self.ID_CAMPO_CONTRASENA).send_keys(self.CONTRASENA_CORRECTA)
        # Hacer click en el botón de login
        self.click_en_boton_login()

        # ENTONCES
        # Quiero asegurarme que no aparece ningún mensaje de error
        # "Login failed! Please ensure the username and password are valid."... XPATH (párrafo que contenga el texto)
        self.assertEqual(1, len(self.driver.find_elements("xpath", self.XPATH_MENSAJE_ERROR)))  # No debería haber mensajes de error
        # Tengo que llegar a una página principal: https://katalon-demo-cura.herokuapp.com/#appointment
        self.assertEqual(self.URL_LOGIN_NO_EXITOSO, self.driver.current_url)


    def test_login_con_password_incorrecto(self):
        # CUANDO
        # Meto en el formulario de login el usuario en el input cuyo id es "usuario"
        self.driver.find_element("id", self.ID_CAMPO_USUARIO).send_keys(self.USUARIO_CORRECTO )
        # Meto en el formulario de login la contraseña en el input cuyo id es "password"
        self.driver.find_element("id", self.ID_CAMPO_CONTRASENA).send_keys(self.CONTRASENA_CORRECTA + "X")
        # Hacer click en el botón de login
        self.click_en_boton_login()

        # ENTONCES
        # Quiero asegurarme que no aparece ningún mensaje de error
        # "Login failed! Please ensure the username and password are valid."... XPATH (párrafo que contenga el texto)
        self.assertEqual(1, len(self.driver.find_elements("xpath", self.XPATH_MENSAJE_ERROR)))  # No debería haber mensajes de error
        # Tengo que llegar a una página principal: https://katalon-demo-cura.herokuapp.com/#appointment
        self.assertEqual(self.URL_LOGIN_NO_EXITOSO, self.driver.current_url)



if __name__ == '__main__':
    unittest.main() 

