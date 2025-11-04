# Importar las librerías necesarias 
import time
## Importar unittest para las pruebas
import unittest
## Importar Selenium y las herramientas necesarias para manejar Chrome
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Defino una clase que contendrá todas las pruebas relacionadas con el login
class LoginTest(unittest.TestCase):

    # Cada función será una prueba diferente
    def test_login_con_datos_correctos(self):
        # Instalación del chromedriver
        service = Service(ChromeDriverManager().install())

        # Arrancar el navegador Chrome
        driver = webdriver.Chrome(service=service)

        # Voy a navegar a la página de login
        driver.get("https://katalon-demo-cura.herokuapp.com/profile.php#login")

        # Rellenar el campo de usuario
        driver.find_element("id", "txt-username").send_keys("John Doe")
        # Rellenar el campo de contraseña
        driver.find_element("id", "txt-password").send_keys("ThisIsNotAPassword")
        # Hacer click en el botón de login
        driver.find_element("xpath", "//*[@id='btn-login']").click()

        # Vamos a esperar unos segundos
        # driver.implicitly_wait(5)  # Espera implícita de 5 segundos
        # Esto no está funcionando y es un error típico en Selenium... la espera
        # Vamos a forzar esa espera desde python
        time.sleep(5)  # Espera explícita de 5 segundos

        # Vamos a ver a qué página hemos llegado
        urlNuevaPagina = driver.current_url

        # Comprobar que la URL es la esperada tras un login exitoso
        self.assertEqual("https://katalon-demo-cura.herokuapp.com/#appointment", urlNuevaPagina)

        # Quiero asegurarme que no aparece ningún mensaje de error
        # "Login failed! Please ensure the username and password are valid."... XPATH (párrafo que contenga el texto)
        mensajesError = driver.find_elements("xpath", "//p[contains(text(), 'Login failed! Please ensure the username and password are valid.')]")
        self.assertEqual(0, len(mensajesError))  # No debería haber mensajes de error

        # Cierra el navegador
        driver.quit()



if __name__ == '__main__':
    unittest.main() 

