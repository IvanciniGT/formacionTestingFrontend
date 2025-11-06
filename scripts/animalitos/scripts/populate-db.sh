#!/bin/bash

# 🐾 Script para poblar la base de datos de Animalitos
# Asegúrate de que JSON Server esté corriendo en http://localhost:3000

echo "🐾 Iniciando población de la base de datos de Animalitos..."
echo "📡 Verificando conexión con JSON Server..."

# Verificar que JSON Server esté corriendo
if ! curl -s http://localhost:3000/animalitos > /dev/null; then
    echo "❌ Error: JSON Server no está corriendo en puerto 3000"
    echo "💡 Ejecuta: npm run fake-backend"
    exit 1
fi

echo "✅ JSON Server detectado, procediendo con la población..."

# Limpiar datos existentes (opcional)
read -p "🗑️  ¿Quieres limpiar todos los animalitos existentes? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧹 Limpiando datos existentes..."
    # Obtener todos los IDs y eliminarlos
    curl -s http://localhost:3000/animalitos | jq -r '.[].id' | while read id; do
        curl -s -X DELETE "http://localhost:3000/animalitos/$id"
    done
    echo "✅ Base de datos limpiada"
fi

echo "🐕 Creando animalitos de ejemplo..."

# Función para crear un animalito
create_animalito() {
    local nombre="$1"
    local especie="$2"
    local edad="$3"
    local raza="$4"
    local descripcion="$5"
    
    echo "  ➕ Creando: $nombre ($especie)"
    
    curl -s -X POST http://localhost:3000/animalitos \
        -H "Content-Type: application/json" \
        -d "{
            \"nombre\": \"$nombre\",
            \"especie\": \"$especie\",
            \"edad\": $edad,
            \"raza\": \"$raza\",
            \"descripcion\": \"$descripcion\"
        }" > /dev/null
    
    if [ $? -eq 0 ]; then
        echo "  ✅ $nombre creado exitosamente"
    else
        echo "  ❌ Error creando $nombre"
    fi
}

# Crear animalitos variados
echo "🐕 Creando perros..."
create_animalito "Firulais" "Perro" 3 "Labrador" "Un perro amigable y juguetón que ama las pelotas"
create_animalito "Rex" "Perro" 5 "Pastor Alemán" "Perro guardián leal y protector de la familia"
create_animalito "Luna" "Perro" 2 "Golden Retriever" "Perra cariñosa que ama nadar en el lago"

echo "🐱 Creando gatos..."
create_animalito "Misu" "Gato" 4 "Siamés" "Gato curioso y muy vocal, le gusta subirse a lugares altos"
create_animalito "Whiskers" "Gato" 1 "Persa" "Gatito elegante con pelo largo y sedoso"
create_animalito "Shadow" "Gato" 6 "Maine Coon" "Gato grande y peludo con personalidad gentil"

echo "🐠 Creando peces..."
create_animalito "Nemo" "Pez" 1 "Pez Payaso" "Pez colorido y activo que nada en círculos"
create_animalito "Burbuja" "Pez" 2 "Goldfish" "Pez dorado que hace burbujas constantemente"
create_animalito "Alga" "Pez" 1 "Betta" "Pez beta con colores brillantes y aletas largas"

echo "🐦 Creando pájaros..."
create_animalito "Piolín" "Pájaro" 3 "Canario" "Canario amarillo que canta melodías hermosas"
create_animalito "Lucas" "Pájaro" 8 "Loro" "Loro parlanchín que imita todo lo que escucha"
create_animalito "Tweet" "Pájaro" 1 "Periquito" "Periquito joven y muy sociable"

echo "🐹 Creando pequeños..."
create_animalito "Chispa" "Hamster" 1 "Hamster Dorado" "Hamster energético que corre en su rueda toda la noche"
create_animalito "Pelusa" "Conejo" 2 "Holandés" "Conejo blanco y negro muy suave y cariñoso"

echo "🐢 Creando reptiles..."
create_animalito "Ninja" "Tortuga" 15 "Tortuga de Orejas Rojas" "Tortuga veterana que se mueve con sabiduría"

echo ""
echo "🎉 ¡Población completada!"
echo "📊 Verificando resultados..."

# Mostrar resumen
total=$(curl -s http://localhost:3000/animalitos | jq length)
echo "✅ Total de animalitos en la base de datos: $total"

echo ""
echo "🌐 Puedes ver todos los animalitos en:"
echo "   👀 Frontend: http://localhost:4200"
echo "   🔗 API: http://localhost:3000/animalitos"
echo ""
echo "💡 Comandos útiles:"
echo "   📋 Ver todos: curl http://localhost:3000/animalitos | jq"
echo "   🔍 Ver uno: curl http://localhost:3000/animalitos/1 | jq"
echo "   🗑️  Eliminar: curl -X DELETE http://localhost:3000/animalitos/ID"
echo ""
echo "🐾 ¡Disfruta jugando con tus animalitos!"