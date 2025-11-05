from selenium import webdriver
# Me deja usar la librería Selenium
from selenium.webdriver.chrome.service import Service
# Me deja usar el Chrome desde selenium
from webdriver_manager.chrome import ChromeDriverManager
# Instalar el driver de Chrome: ChromeDriver

# 1. Configura el servicio usando ChromeDriverManager
#    Esto descargará el chromedriver si no existe o si está desactualizado
print("Instalando/verificando chromedriver...")
service = Service(ChromeDriverManager().install())

# 2. Inicia el navegador (driver) usando el servicio
driver = webdriver.Chrome(service=service)

# 3. ¡Ya puedes usar Selenium!
print("Abriendo Google...")
driver.get("https://www.google.com")

print(f"El título de la página es: {driver.title}")

# Cierra el navegador
driver.quit()

# python login/login_test.py # Ejecuta este script para probar que todo funciona correctamente