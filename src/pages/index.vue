<template>
  <div>
    <Counter data-hydrate="Counter" data-hydrate-event="load"></Counter>
    <Counter data-hydrate="Counter" data-hydrate-event="click"></Counter>
    <Counter data-hydrate="Counter" data-hydrate-event="mouseover"></Counter>
  </div>
</template>

<script lang="ts" setup>
import Counter from '../islands/counter.vue';
</script>

<style>

</style>