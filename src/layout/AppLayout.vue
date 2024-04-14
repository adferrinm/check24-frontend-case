<script setup>
import AppTopBar from "./AppTopBar";
import AppSideBar from "./AppSideBar";
import TariffTable from "../components/TariffTable";
import TariffComparator from "../components/TariffComparator";

import { useDataStore } from "../store";

const dataStore = useDataStore();
</script>

<template>
  <div>
    <div class="topbar">
      <AppTopBar />
    </div>
    <div class="grid content p-2">
      <AppSideBar />
      <div class="col-10">
        <TariffTable />
        <div class="flex flex-row justify-content-end mb-3">
          <Button
            style="background-color: #084085"
            :disabled="dataStore.selectedProducts.length !== 2"
            @click="dataStore.compareProducts()"
            >{{
              dataStore.isDisplayDifferences
                ? "Display All"
                : "Display Only Differences"
            }}</Button
          >
        </div>
        <TariffComparator />
      </div>
    </div>
  </div>
</template>

<style>
</style>

