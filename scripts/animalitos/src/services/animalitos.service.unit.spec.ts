import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AnimalitosServiceImpl } from './animalitos.service';
import { Animalito } from '../models/animalito';
import { AnimalitoViewModel } from '../models/animalito.view.model';
import { AnimalitosMapper } from '../mappers/animalitos.mapper';

describe('AnimalitosService', () => {
  let service: AnimalitosServiceImpl;
  let httpMock: HttpTestingController;

  // Test data
  const mockAnimalitos: Animalito[] = [
    new Animalito(1, 'Firulais', 'Perro', 3, 'Labrador', 'Un perro amigable y juguetón.'),
    new Animalito(2, 'Misu', 'Gato', 2, 'Siames', 'Un gato curioso y cariñoso.'),
    new Animalito(3, 'Nemo', 'Pez', 1, 'Payaso', 'Un pez colorido y activo.')
  ];

  const expectedViewModels: AnimalitoViewModel[] = mockAnimalitos.map(AnimalitosMapper.toViewModel);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnimalitosServiceImpl,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    
    service = TestBed.inject(AnimalitosServiceImpl);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('UNIT TESTS - getAnimalitos()', () => {
    it('should be created', () => {
      expect(service).toBeTruthy(); // Esto me prueba que en el constructor de la clase no hay errores
    });

    it('should return animalitos as view models when API call is successful', (done) => {
      // GIVEN - Mock data is available
      
      // WHEN - Call getAnimalitos
      service.getAnimalitos().subscribe({
        next: (result) => {
          // THEN - Should return mapped view models
          expect(result).toEqual(expectedViewModels);
          expect(result.length).toBe(3);
          expect(result[0]).toBeInstanceOf(AnimalitoViewModel);
          expect(result[0].nombre).toBe('Firulais');
          expect(result[0].especie).toBe('Perro');
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(AnimalitosServiceImpl.API_URL);
      expect(req.request.method).toBe('GET');
      req.flush(mockAnimalitos);
    });

    it('should return empty array when API returns empty array', (done) => {
      // GIVEN - Empty array from API
      
      // WHEN - Call getAnimalitos
      service.getAnimalitos().subscribe({
        next: (result) => {
          // THEN - Should return empty array
          expect(result).toEqual([]);
          expect(result.length).toBe(0);
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(AnimalitosServiceImpl.API_URL);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should handle HTTP error gracefully', (done) => {
      // GIVEN - API will return error
      const errorMessage = 'Server error';
      
      // WHEN - Call getAnimalitos
      service.getAnimalitos().subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          // THEN - Should propagate the error
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
          done();
        }
      });

      const req = httpMock.expectOne(AnimalitosServiceImpl.API_URL);
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });

    it('should handle network error gracefully', (done) => {
      // GIVEN - Network error will occur
      
      // WHEN - Call getAnimalitos
      service.getAnimalitos().subscribe({
        next: () => done.fail('Should not succeed'),
        error: (error) => {
          // THEN - Should handle network error
          expect(error.error).toBeInstanceOf(ProgressEvent);
          done();
        }
      });

      const req = httpMock.expectOne(AnimalitosServiceImpl.API_URL);
      expect(req.request.method).toBe('GET');
      req.error(new ProgressEvent('Network error'));
    });

    it('should make GET request to correct URL', () => {
      // GIVEN - Service is ready
      
      // WHEN - Call getAnimalitos
      service.getAnimalitos().subscribe();

      // THEN - Should make GET request to correct URL
      const req = httpMock.expectOne(AnimalitosServiceImpl.API_URL);
      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe('http://localhost:3000/animalitos');
      
      req.flush(mockAnimalitos);
    });

    it('should apply mapper transformation correctly', (done) => {
      // GIVEN - Mock data with specific structure
      const apiResponse = [
        { id: 99, nombre: 'TestAnimal', especie: 'TestSpecies', edad: 5, raza: 'TestBreed', descripcion: 'Test description' }
      ];
      
      // WHEN - Call getAnimalitos
      service.getAnimalitos().subscribe({
        next: (result) => {
          // THEN - Should have applied mapper transformation
          expect(result[0]).toBeInstanceOf(AnimalitoViewModel);
          expect(result[0].id).toBe(99);
          expect(result[0].nombre).toBe('TestAnimal');
          expect(result[0].especie).toBe('TestSpecies');
          expect(result[0].edad).toBe(5);
          expect(result[0].raza).toBe('TestBreed');
          expect(result[0].descripcion).toBe('Test description');
          done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(AnimalitosServiceImpl.API_URL);
      expect(req.request.method).toBe('GET');
      req.flush(apiResponse);
    });
  });


});