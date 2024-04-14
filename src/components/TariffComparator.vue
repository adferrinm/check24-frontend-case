<script setup>
import TariffPanel from "../components/TariffPanel";
import { useDataStore } from "../store";

const dataStore = useDataStore();
</script>

<template>
  <div class="grid">
    <div
      v-for="(product, index) in dataStore.selectedProducts"
      :key="index"
      class="col-6"
    >
      <TariffPanel :data="product" />
    </div>
  </div>
</template>

<style></style>