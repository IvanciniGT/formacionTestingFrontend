import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { AnimalitosServiceImpl } from './animalitos.service';
import { AnimalitoViewModel } from '../models/animalito.view.model';


//###
//### EJECUTAR CON :  npx concurrently "npm run fake-backend" "ng test --include src/components/animalito-form/animalito-form.component.spec.ts"
//###


describe('AnimalitosService - INTEGRATION TESTS', () => {
  let service: AnimalitosServiceImpl;
  let httpClient: HttpClient;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnimalitosServiceImpl,
        provideHttpClient()
      ]
    });
    
    service = TestBed.inject(AnimalitosServiceImpl);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach((done) => {
    // Clean up: Remove all test data after each test
    httpClient.get<any[]>('http://localhost:3000/animalitos').subscribe({
      next: (animalitos) => {
        if (animalitos.length === 0) {
          done();
          return;
        }
        
        let deletedCount = 0;
        for (const animalito of animalitos) {
          httpClient.delete(`http://localhost:3000/animalitos/${animalito.id}`).subscribe({
            next: () => {
              deletedCount++;
              if (deletedCount === animalitos.length) {
                done();
              }
            },
            error: () => {
              deletedCount++;
              if (deletedCount === animalitos.length) {
                done();
              }
            }
          });
        }
      },
      error: () => done() // If server not running, skip cleanup
    });
  });

  describe('Integration with JSON Server', () => {
    // This test requires json-server to be running
    // Run with: npm run test:integration
    it('should return empty array when no animalitos exist', (done) => {
      // GIVEN - JSON server is running with empty data
      
      // WHEN - Call getAnimalitos with real HTTP client
      service.getAnimalitos().subscribe({
        next: (result) => {
          // THEN - Should return empty array
          expect(result).toBeDefined();
          expect(result).toEqual([]);
          expect(result.length).toBe(0);
          
          console.log('✅ Integration test passed - Empty array retrieved correctly');
          done();
        },
        error: (error) => {
          // If JSON server is not running, skip this test
          if (error.status === 0 || error.message.includes('ECONNREFUSED')) {
            console.log('⚠️ JSON Server not running. Start it with: npm run fake-backend');
            pending('JSON Server not running. Use "npm run test:integration" to run with json-server.');
          } else {
            done.fail(`Integration test failed: ${error.message}`);
          }
        }
      });
    }, 15000); // Increased timeout for integration test

    it('should retrieve animalitos after creating one', (done) => {
      // GIVEN - JSON server is running and we create a test animalito
      const newAnimalito = {
        nombre: 'TestFirulais',
        especie: 'Perro',
        edad: 3,
        raza: 'Labrador',
        descripcion: 'Un perro de prueba.'
      };

      // First create an animalito
      httpClient.post('http://localhost:3000/animalitos', newAnimalito).subscribe({
        next: () => {
          // WHEN - Call getAnimalitos
          service.getAnimalitos().subscribe({
            next: (result) => {
              // THEN - Should return the created animalito
              expect(result).toBeDefined();
              expect(result.length).toBe(1);
              expect(result[0]).toBeInstanceOf(AnimalitoViewModel);
              
              // Verify structure
              expect(result[0].id).toBeDefined();
              expect(result[0].nombre).toBe('TestFirulais');
              expect(result[0].especie).toBe('Perro');
              expect(result[0].edad).toBe(3);
              expect(result[0].raza).toBe('Labrador');
              expect(result[0].descripcion).toBe('Un perro de prueba.');
              
              console.log('✅ Integration test passed - Retrieved created animalito');
              done();
            },
            error: (error) => done.fail(`Failed to retrieve: ${error.message}`)
          });
        },
        error: (error) => {
          if (error.status === 0 || error.message.includes('ECONNREFUSED')) {
            pending('JSON Server not running. Use "npm run test:integration" to run with json-server.');
          } else {
            done.fail(`Failed to create test data: ${error.message}`);
          }
        }
      });
    }, 15000);

    it('should verify mapper transformation with real HTTP calls', (done) => {
      // GIVEN - Create multiple test animalitos
      const animalitos = [
        { id: 1, nombre: 'Perro1', especie: 'Perro', edad: 2, raza: 'Labrador', descripcion: 'Test 1' },
        { id: 2, nombre: 'Gato1', especie: 'Gato', edad: 1, raza: 'Siames', descripcion: 'Test 2' }
      ];

      // Create first animalito
      httpClient.post('http://localhost:3000/animalitos', animalitos[0]).subscribe({
        next: () => {
          // Create second animalito  
          httpClient.post('http://localhost:3000/animalitos', animalitos[1]).subscribe({
            next: () => {
              // WHEN - Call getAnimalitos
              service.getAnimalitos().subscribe({
                next: (result) => {
                  // THEN - Verify transformation pipeline
                  expect(result).toBeDefined();
                  expect(result.length).toBe(2);
                  
                  // Verify data types after mapper transformation
                  for (const animalito of result) {
                    expect(typeof animalito.id).toBe('number');
                    expect(typeof animalito.nombre).toBe('string');
                    expect(typeof animalito.especie).toBe('string');
                    expect(typeof animalito.edad).toBe('number');
                    expect(typeof animalito.raza).toBe('string');
                    expect(typeof animalito.descripcion).toBe('string');
                    expect(animalito).toBeInstanceOf(AnimalitoViewModel);
                  }
                  
                  console.log('✅ Mapper integration test passed');
                  done();
                }
              });
            }
          });
        },
        error: (error) => {
          if (error.status === 0 || error.message.includes('ECONNREFUSED')) {
            pending('JSON Server not running. Use "npm run test:integration" to run with json-server.');
          } else {
            done.fail(`Integration test failed: ${error.message}`);
          }
        }
      });
    }, 15000);

    it('should handle real server connection errors', (done) => {
      // GIVEN - Make request to invalid port
      const badHttpClient = TestBed.inject(HttpClient);
      
      // WHEN - Call with bad URL
      badHttpClient.get('http://localhost:9999/animalitos').subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          // THEN - Should handle connection error
          expect(error.status).toBe(0); // Connection refused
          console.log('✅ Connection error handled correctly');
          done();
        }
      });
    }, 10000);
  });
});