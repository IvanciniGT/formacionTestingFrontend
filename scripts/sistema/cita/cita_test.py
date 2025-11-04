# Importar las librerías necesarias 
import os
import time
## Importar unittest para las pruebas
import unittest
## Importar Selenium y las herramientas necesarias para manejar Chrome
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options as ChromeOptions

# Defino una clase que contendrá todas las pruebas relacionadas con el login
class LoginTest(unittest.TestCase):

    # Constantes que uso en mi testing
    USUARIO_CORRECTO = "John Doe"
    CONTRASENA_CORRECTA = "ThisIsNotAPassword"
    URL_LOGIN = "https://katalon-demo-cura.herokuapp.com/profile.php#login"

    ID_CAMPO_USUARIO = "txt-username"
    ID_CAMPO_CONTRASENA = "txt-password"
    XPATH_BOTON_LOGIN = "//*[@id='btn-login']"

    MENSAJE_RESERVA_CITA = "Make Appointment"
    XPATH_ELEMENTO_RESERVA_CITA = f"//h2[contains(text(), '{MENSAJE_RESERVA_CITA}')]"

    FACILITY_ID= "combo_facility"
    FACILITY = "Hongkong CURA Healthcare Center"
    DATE_ID = "txt_visit_date"
    COMMENT_ID = "txt_comment"
    COMMENT_VALUE = "Prueba automatizada de reserva de cita"
    READMISSION_ID = "chk_hospotal_readmission"
    PROGRAM_ID ="radio_program_medicaid"
    BOOK_APPOINTMENT_ID = "btn-book-appointment"


    APPOINTMENT_CONFIRMATION_TEXT = "Appointment Confirmation"
    APPOINTMENT_CONFIRMATION_XPATH = f"//h2[contains(text(), '{APPOINTMENT_CONFIRMATION_TEXT}')]"
    CONFIRMATION_FACILITY_ID = "facility"
    CONFIRMATION_READMISSION_ID = "hospital_readmission"
    CONFIRMATION_PROGRAM_ID = "program"
    CONFIRMATION_DATE_ID = "visit_date"
    CONFIRMATION_COMMENT_ID = "comment"
    PROGRAM_TEXT_MEDICAID = "Medicaid"


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
        # Arrancar el navegador Chrome
        # Ese navegador, realmente no querriamos verlo por pantalla. 
        # Querríamos que se ejecutase el navegador en modo headless.
        # El primer motivo es que va a ir más rápido.
        # Dónde queremos que se ejecute esta prueba? En mi máquina? En un servidor...
        # Y en un servidor hay un sistema de ventanas? Gráficas? Normalmente no.    
        # Por tanto, necesitamos que el navegador se ejecute en modo headless (Sin ventana)
        # Incluso así le puedo pedir que haga capturas de pantalla para ver lo que está haciendo

        options = ChromeOptions()
        options.add_argument("--headless=new")
        # Evitar que chrome use el servicio de gestion de credenciales
        preferencias = {
            "credentials_enable_service": False,
            "profile": {
                "password_manager_enabled": False
            }
        }
        options.add_experimental_option("prefs", preferencias)
        service = Service(ChromeDriverManager().install())

        self.driver = webdriver.Chrome(service=service, options=options)
        # Voy a navegar a la página de login
        self.driver.get(self.URL_LOGIN)
        # Colocar la pantalla en un determinado tamaño
        self.driver.set_window_size(self.ANCHO_PANTALLA, self.ALTO_PANTALLA)
        # Meto en el formulario de login el usuario en el input cuyo id es "usuario"
        self.driver.find_element("id", self.ID_CAMPO_USUARIO).send_keys(self.USUARIO_CORRECTO)
        # Meto en el formulario de login la contraseña en el input cuyo id es "password"
        self.driver.find_element("id", self.ID_CAMPO_CONTRASENA).send_keys(self.CONTRASENA_CORRECTA)
        # Hacer click en el botón de login
        self.click_en_boton_login()
        # Esperar a que se encuentre el elemento de la página de reserva de cita para asegurar que hemos llegado correctamente
        self.driver.find_element("xpath", self.XPATH_ELEMENTO_RESERVA_CITA)

    def tearDown(self): # Lo que ponga aquí dentro se ejecuta después de cada prueba
        # Aquí podría hacer una captura de pantalla para ver el estado final de la prueba
        # El nombre del fichero debería ser el de la prueba que se acaba de ejecutar
        self.driver.save_screenshot(f"{self.CARPETA_CAPTURAS}/screenshot_{self._testMethodName}_despues_cita.png")
        # Cierra el navegador
        self.driver.quit()


    def click_en_boton_login(self): # Lo que ponga aquí dentro se ejecuta después de cada prueba
        self.driver.save_screenshot(f"{self.CARPETA_CAPTURAS}/screenshot_{self._testMethodName}_antes_login.png")
        self.driver.find_element("xpath", self.XPATH_BOTON_LOGIN).click()
        # Espera implicita para que cargue la siguiente página
        self.driver.implicitly_wait(self.TIEMPO_ESPERA)

    # Cada función será una prueba diferente
    def test_reserva_con_datos_correctos(self):
        # DADO (que se establece en el setUp)
        # Cuando
        # Como fecha, voy a poner el día de mañana
        tomorrow = time.time() + 24*60*60
        date_value = time.strftime("%d/%m/%Y", time.localtime(tomorrow))
        # Buscar el campo facility:
        self.driver.find_element("id", self.FACILITY_ID).send_keys(self.FACILITY)
        # Readmission
        self.driver.find_element("id", self.READMISSION_ID).click()
        # Healthcare program
        self.driver.find_element("id", self.PROGRAM_ID).click()
        # Date
        self.driver.find_element("id", self.DATE_ID).send_keys(date_value)

        # Esperar unos segundos
        time.sleep(1)
        # Hacer click en la página
        self.driver.find_element("xpath", "//body").click()
        # Esperar unos segundos
        time.sleep(1)

        # Comment
        self.driver.find_element("id", self.COMMENT_ID).send_keys(self.COMMENT_VALUE)
        # Hacer click en el botón de Book Appointment
        self.driver.find_element("id", self.BOOK_APPOINTMENT_ID).click()

        # Sacar una captura de pantalla
        self.driver.save_screenshot(f"{self.CARPETA_CAPTURAS}/screenshot_{self._testMethodName}_al_clicar_cita.png")
        # ENTONCES - Debería llegar a la página de confirmación
        self.driver.find_element("xpath", self.APPOINTMENT_CONFIRMATION_XPATH)
        # Verificar el facility
        facility_confirmed = self.driver.find_element("id", self.CONFIRMATION_FACILITY_ID).text
        self.assertEqual(self.FACILITY, facility_confirmed)
        # Confirmamos el readmission
        readmission_confirmed = self.driver.find_element("id", self.CONFIRMATION_READMISSION_ID).text
        self.assertEqual("Yes", readmission_confirmed)
        # Confirmamos el programa
        program_confirmed = self.driver.find_element("id", self.CONFIRMATION_PROGRAM_ID).text
        self.assertEqual(self.PROGRAM_TEXT_MEDICAID, program_confirmed)
        # Confirmamos la fecha
        date_confirmed = self.driver.find_element("id", self.CONFIRMATION_DATE_ID).text
        self.assertEqual(date_value, date_confirmed)
        # Confirmamos el comentario
        comment_confirmed = self.driver.find_element("id", self.CONFIRMATION_COMMENT_ID).text
        self.assertEqual(self.COMMENT_VALUE, comment_confirmed)

if __name__ == '__main__':
    unittest.main() 
