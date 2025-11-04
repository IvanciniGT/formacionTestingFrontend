# Importar las librerías necesarias 
import os
import time
## Importar unittest para las pruebas
import unittest
## Importar Selenium y las herramientas necesarias para manejar Chrome
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Defino una clase que contendrá todas las pruebas relacionadas con las reservas/citas
class AppointmentTest(unittest.TestCase):

    # Constantes que uso en mi testing
    USUARIO_CORRECTO = "John Doe"
    CONTRASENA_CORRECTA = "ThisIsNotAPassword"
    URL_LOGIN = "https://katalon-demo-cura.herokuapp.com/profile.php#login"
    URL_APPOINTMENT = "https://katalon-demo-cura.herokuapp.com/#appointment"
    URL_APPOINTMENT_CONFIRMATION = "https://katalon-demo-cura.herokuapp.com/#appointment"

    # Elementos de la página de appointment
    ID_COMBO_FACILITY = "combo_facility"
    ID_CHK_HOSPITAL_READMISSION = "chk_hospotal_readmission"
    ID_RADIO_MEDICARE = "radio_program_medicare"
    ID_RADIO_MEDICAID = "radio_program_medicaid"
    ID_RADIO_NONE = "radio_program_none"
    ID_CAMPO_FECHA = "txt_visit_date"
    ID_CAMPO_COMENTARIO = "txt_comment"
    ID_BOTON_BOOK_APPOINTMENT = "btn-book-appointment"

    # Elementos del login (para llegar a appointment)
    ID_CAMPO_USUARIO = "txt-username"
    ID_CAMPO_CONTRASENA = "txt-password"
    XPATH_BOTON_LOGIN = "//*[@id='btn-login']"

    # Datos de prueba para appointment
    FACILITY_TOKYO = "Tokyo CURA Healthcare Center"
    FACILITY_HONGKONG = "Hongkong CURA Healthcare Center"
    FACILITY_SEOUL = "Seoul CURA Healthcare Center"
    FECHA_VALIDA = "31/12/2024"
    COMENTARIO_PRUEBA = "Esta es una cita de prueba automatizada"

    TIEMPO_ESPERA = 5  # segundos
    ANCHO_PANTALLA = 1024
    ALTO_PANTALLA = 768
    CARPETA_CAPTURAS = "./capturas"

    def setUp(self): # Lo que ponga aquí dentro se ejecuta antes de cada prueba
        # Asegurarme que la carpeta de capturas existe
        if not os.path.exists(self.CARPETA_CAPTURAS):
            os.makedirs(self.CARPETA_CAPTURAS)
        # Instalación del chromedriver
        service = Service(ChromeDriverManager().install())
        # Arrancar el navegador Chrome
        self.driver = webdriver.Chrome(service=service)
        # Colocar la pantalla en un determinado tamaño
        self.driver.set_window_size(self.ANCHO_PANTALLA, self.ALTO_PANTALLA)
        
        # GIVEN - Hacer login para llegar a la página de appointment
        self.driver.get(self.URL_LOGIN)
        self.driver.find_element("id", self.ID_CAMPO_USUARIO).send_keys(self.USUARIO_CORRECTO)
        self.driver.find_element("id", self.ID_CAMPO_CONTRASENA).send_keys(self.CONTRASENA_CORRECTA)
        self.driver.find_element("xpath", self.XPATH_BOTON_LOGIN).click()
        self.driver.implicitly_wait(self.TIEMPO_ESPERA)
        
        # Esperar un poco más para asegurar que la página carga
        time.sleep(2)
        
        # Verificar que llegamos a la página de appointment
        assert self.URL_APPOINTMENT in self.driver.current_url

    def tearDown(self): # Lo que ponga aquí dentro se ejecuta después de cada prueba
        # Captura de pantalla para ver el estado final de la prueba
        self.driver.save_screenshot(f"{self.CARPETA_CAPTURAS}/screenshot_{self._testMethodName}_despues_appointment.png")
        # Cierra el navegador
        self.driver.quit()

    def rellenar_formulario_appointment_y_enviar(self, facility=None, readmission=False, program=None, fecha=None, comentario=None):
        """Método helper para rellenar el formulario de appointment"""
        self.driver.save_screenshot(f"{self.CARPETA_CAPTURAS}/screenshot_{self._testMethodName}_antes_appointment.png")
        
        # Seleccionar facility si se proporciona
        if facility:
            self.driver.find_element("id", self.ID_COMBO_FACILITY).send_keys(facility)
        
        # Marcar hospital readmission si se requiere
        if readmission:
            self.driver.find_element("id", self.ID_CHK_HOSPITAL_READMISSION).click()
        
        # Seleccionar programa de healthcare si se proporciona
        if program == "medicare":
            self.driver.find_element("id", self.ID_RADIO_MEDICARE).click()
        elif program == "medicaid":
            self.driver.find_element("id", self.ID_RADIO_MEDICAID).click()
        elif program == "none":
            self.driver.find_element("id", self.ID_RADIO_NONE).click()
        
        # Introducir fecha si se proporciona
        if fecha:
            self.driver.find_element("id", self.ID_CAMPO_FECHA).send_keys(fecha)
        
        # Introducir comentario si se proporciona
        if comentario:
            self.driver.find_element("id", self.ID_CAMPO_COMENTARIO).send_keys(comentario)
        
        # Hacer click en Book Appointment
        self.driver.find_element("id", self.ID_BOTON_BOOK_APPOINTMENT).click()
        self.driver.implicitly_wait(self.TIEMPO_ESPERA)

    # Cada función será una prueba diferente
    def test_appointment_completa_exitosa(self):
        # CUANDO - Relleno todos los campos correctamente
        self.rellenar_formulario_appointment_y_enviar(
            facility=self.FACILITY_TOKYO,
            readmission=True,
            program="medicare",
            fecha=self.FECHA_VALIDA,
            comentario=self.COMENTARIO_PRUEBA
        )

        # ENTONCES - Debería permanecer en la página de appointment (con confirmación exitosa)
        self.assertEqual(self.URL_APPOINTMENT, self.driver.current_url)

    def test_appointment_sin_facility(self):
        # CUANDO - No selecciono facility pero relleno el resto
        self.rellenar_formulario_appointment_y_enviar(
            program="medicare",
            fecha=self.FECHA_VALIDA,
            comentario=self.COMENTARIO_PRUEBA
        )

        # ENTONCES - Debería permanecer en la página de appointment (validación fallida)
        self.assertEqual(self.URL_APPOINTMENT, self.driver.current_url)

    def test_appointment_sin_programa_healthcare(self):
        # CUANDO - No selecciono programa healthcare pero relleno el resto
        self.rellenar_formulario_appointment_y_enviar(
            facility=self.FACILITY_HONGKONG,
            fecha=self.FECHA_VALIDA,
            comentario=self.COMENTARIO_PRUEBA
        )

        # ENTONCES - Debería permanecer en la página de appointment (validación fallida)
        self.assertEqual(self.URL_APPOINTMENT, self.driver.current_url)

    def test_appointment_sin_fecha(self):
        # CUANDO - No introduzco fecha pero relleno el resto
        self.rellenar_formulario_appointment_y_enviar(
            facility=self.FACILITY_SEOUL,
            program="medicaid",
            comentario=self.COMENTARIO_PRUEBA
        )

        # ENTONCES - Debería permanecer en la página de appointment (validación fallida)
        self.assertEqual(self.URL_APPOINTMENT, self.driver.current_url)

    def test_appointment_minima_exitosa(self):
        # CUANDO - Solo relleno los campos obligatorios (sin readmission ni comentario)
        self.rellenar_formulario_appointment_y_enviar(
            facility=self.FACILITY_TOKYO,
            program="none",
            fecha=self.FECHA_VALIDA
        )

        # ENTONCES - Debería permanecer en la página de appointment (con confirmación exitosa)
        self.assertEqual(self.URL_APPOINTMENT, self.driver.current_url)

    def test_appointment_con_readmission_y_medicaid(self):
        # CUANDO - Selecciono hospital readmission y Medicaid
        self.rellenar_formulario_appointment_y_enviar(
            facility=self.FACILITY_HONGKONG,
            readmission=True,
            program="medicaid",
            fecha=self.FECHA_VALIDA,
            comentario="Paciente con readmisión hospitalaria previa"
        )

        # ENTONCES - Debería permanecer en la página de appointment (con confirmación exitosa)
        self.assertEqual(self.URL_APPOINTMENT, self.driver.current_url)

    def test_appointment_con_comentario_largo(self):
        # CUANDO - Introduzco un comentario muy largo
        comentario_largo = "Este es un comentario muy largo para probar los límites del campo de texto. " * 5
        self.rellenar_formulario_appointment_y_enviar(
            facility=self.FACILITY_SEOUL,
            program="medicare",
            fecha=self.FECHA_VALIDA,
            comentario=comentario_largo
        )

        # ENTONCES - Debería permanecer en la página de appointment (con confirmación exitosa)
        self.assertEqual(self.URL_APPOINTMENT, self.driver.current_url)


if __name__ == '__main__':
    unittest.main()