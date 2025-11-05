# Unittest es la librería de automatización de pruebas que vamos a usar con python
# Recordad que Selenium NO ES una librería de testing, es una librería para automatizar navegadores web

# Para hacer pruebas, necesito una librería de testing, y unittest es la que viene por defecto con python
import unittest

class HelloWorldTest(unittest.TestCase):

    def test_hello_world(self):
        # Esta es una prueba muy simple que siempre pasa
        texto1 = "Bye, World!"
        texto2 = "Hello, World!"
        self.assertEqual(texto1, texto2) # Aserción: comprueba que texto1 es igual a texto2

# Eso sería un fichero de pruebas, con 1 prueba dentro
# Para ejecutar las pruebas, usamos el siguiente bloque
if __name__ == '__main__':
    unittest.main()  # Esto ejecuta todas las pruebas definidas en este fichero 

