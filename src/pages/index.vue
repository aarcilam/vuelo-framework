<template>
  <div>
    <h1 class="text-2xl font-bold text-center text-green-500">Server Side Rendering no interactivo</h1>
    <Counter></Counter>
    <h1 class="text-2xl font-bold text-center text-green-500">Client Side Rendering interactivo</h1>
    <h1 class="text-2xl font-bold text-center text-green-500">Hydration con evento load</h1>
    <Counter data-hydrate="Counter" data-hydrate-event="load"></Counter>
    <h1 class="text-2xl font-bold text-center text-green-500">Hydration con evento click</h1>
    <Counter data-hydrate="Counter" data-hydrate-event="click"></Counter>
    <h1 class="text-2xl font-bold text-center text-green-500">Hydration con evento mouseover</h1>
    <Counter data-hydrate="Counter" data-hydrate-event="mouseover"></Counter>
  </div>
</template>

<script lang="ts" setup>
import Counter from '../islands/counter.vue';
</script>

<style>

</style>