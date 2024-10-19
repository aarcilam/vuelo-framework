<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <h1 class="text-4xl font-bold text-green-600 mb-4">Bienvenido a Vuelo Framework</h1>
    <p class="text-lg text-gray-700 mb-6">{{ message }}</p>
    <RouteView class="w-full max-w-4xl bg-white shadow-md rounded-lg p-6"></RouteView>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const messages = [
    "¡Bienvenidos a Vuelo Framework! Donde los bugs son solo pasajeros en tránsito.",
    "Con Vuelo, tus componentes no solo funcionan, ¡sino que también hacen acrobacias!",
    "¿Por qué Vuelo Framework? Porque incluso tu código merece unas vacaciones.",
    "Vuelo: Donde la única turbulencia es la de tu café.",
    "Usar Vuelo Framework es como tener un piloto automático para tu código.",
    "Con Vuelo, tus errores se convierten en 'nubes de oportunidad'.",
    "¿Vuelo Framework? Más como 'vuelo en primera clase' para tu desarrollo.",
    "En Vuelo, cada componente tiene alas. ¡Despegamos!",
    "Vuelo: Porque a veces el código necesita una escapada rápida.",
    "Con Vuelo, tus componentes no solo son ligeros, ¡son aerodinámicos!",
    "¡Usa Vuelo! Porque tu código merece ser elevado a otro nivel.",
    "En Vuelo, los problemas se desvanecen como maletas perdidas.",
    "¿Vuelo Framework? Más como 'Vuelo y no mires atrás'.",
    "Con Vuelo, cada despliegue es un aterrizaje suave.",
    "En Vuelo, la única 'carga útil' son tus ideas brillantes.",
    "¡Hola, Vuelo Framework! ¿Listo para un viaje sin escalas hacia la productividad?",
    "Con Vuelo, tus componentes nunca se quedan en tierra.",
    "¿Problemas de rendimiento? En Vuelo, solo llevamos equipaje de mano.",
    "Vuelo: La única vez que 'despegar' es una buena noticia para tu código.",
    "Con Vuelo, incluso el código más pesado se siente ligero."
];

const randomMessage = messages[Math.floor(Math.random() * messages.length)];
const message = ref(randomMessage);
</script>

<style scoped>
</style>
