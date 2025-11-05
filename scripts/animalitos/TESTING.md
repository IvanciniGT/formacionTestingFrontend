# Testing del Servicio Animalitos

Este proyecto contiene un sistema completo de testing para el servicio AnimalitosService, incluyendo pruebas unitarias y de integración siguiendo los principios FIRST.

## 🏗️ Estructura de Testing

```
src/services/
├── animalitos.service.ts                    # Servicio principal
├── animalitos.service.spec.ts               # Tests UNITARIOS (con mocks)
└── animalitos.service.integration.spec.ts   # Tests INTEGRACIÓN (con JSON server)

backend/
├── datos_ejemplo.json                       # Datos para desarrollo
└── datos_testing.json                       # Base de datos limpia para testing
```

## 🧪 Tipos de Tests

### Tests Unitarios (`animalitos.service.spec.ts`)
- **Mock** del HttpClient usando `HttpTestingController`
- **Sin dependencias externas** (red, bases de datos)
- **Rápidos** y **aislados**
- Prueban la lógica del servicio y el mapper

### Tests de Integración (`animalitos.service.integration.spec.ts`)
- **HttpClient real** conectando al JSON server
- **Base de datos controlada** (empieza vacía)
- **Limpieza automática** después de cada test
- Prueban el flujo completo end-to-end

## 📜 Scripts Disponibles

### Tests Individuales
```bash
# Solo tests unitarios (rápidos, sin JSON server)
npm run test:unit

# Solo tests de integración (sin JSON server - se saltan)
npm run test:integration

# Tests de integración CON JSON server automático
npm run test:integration:full
```

### Tests Combinados
```bash
# Ejecutar unitarios + integración (sin server)
npm run test:service

# Ejecutar unitarios + integración completa (con server)
npm run test:service:full
```

### JSON Server
```bash
# JSON server para testing (BD vacía)
npm run json-server:test

# JSON server para desarrollo (con datos)
npm run json-server:dev

# Alias para desarrollo
npm run fake-backend
```

### Tests Generales
```bash
# Todos los tests del proyecto (modo watch)
npm test

# Todos los tests una sola vez
npm test -- --watch=false
```

## 🎯 Principios FIRST Aplicados

### ✅ **F - Fast (Rápido)**
- **Unitarios**: Sin red, solo mocks (~0.04s)
- **Integración**: Datos mínimos controlados

### ✅ **I - Independent (Independiente)**
- Cada test limpia la BD después (`afterEach`)
- Tests unitarios completamente aislados
- Base de datos testing separada

### ✅ **R - Repeatable (Repetible)**
- Tests unitarios: Siempre mismo resultado
- Tests integración: BD vacía + datos propios

### ✅ **S - Self-Validating (Auto-validante)**
- Aserciones claras con expect()
- Pass/Fail automático
- Mensajes descriptivos

### ✅ **T - Timely (Oportuno)**
- Un concepto por test
- Nomenclatura descriptiva
- Cobertura completa

## 🚀 Uso Recomendado

### Durante Desarrollo
```bash
# Ejecutar solo unitarios (muy rápido)
npm run test:unit
```

### Antes de Commit
```bash
# Ejecutar tests completos
npm run test:service:full
```

### CI/CD Pipeline
```bash
# Unitarios siempre
npm run test:unit

# Integración si hay JSON server disponible
npm run test:integration:full
```

## 📊 Cobertura de Tests

### Tests Unitarios (7 tests)
- ✅ Servicio se crea correctamente
- ✅ Retorna array de ViewModels cuando API es exitosa
- ✅ Retorna array vacío cuando API retorna vacío
- ✅ Maneja errores HTTP correctamente
- ✅ Maneja errores de red correctamente
- ✅ Hace GET request a URL correcta
- ✅ Aplica transformación del mapper correctamente

### Tests de Integración (4 tests)
- ✅ Retorna array vacío cuando no hay datos
- ✅ Retorna datos después de crear uno
- ✅ Verifica transformación del mapper con HTTP real
- ✅ Maneja errores de conexión reales

## 🔧 Configuración

### TestBed Moderno (Angular 15+)
```typescript
// Unitarios
providers: [
  AnimalitosServiceImpl,
  provideHttpClient(),
  provideHttpClientTesting()
]

// Integración  
providers: [
  AnimalitosServiceImpl,
  provideHttpClient()
]
```

### JSON Server
- Puerto: `3000`
- Testing: `backend/datos_testing.json` (vacío)
- Desarrollo: `backend/datos_ejemplo.json` (con datos)