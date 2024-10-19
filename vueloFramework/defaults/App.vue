<template>
  <div>
    <h1>Bienvenido a Vuelo Framework</h1>
    <p>{{ message }}</p>
    <RouteView></RouteView>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const message = ref("Message from setup")
</script>