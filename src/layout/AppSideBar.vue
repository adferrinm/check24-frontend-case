<script setup>
import { ref } from "vue";
import { useFilterStore, useDataStore } from "../store";

const filterStore = useFilterStore();
const dataStore = useDataStore();

const clearFilters = () => {
  filterStore.$reset();
  dataStore.clearBetterAttributes();
};

const finalPrices = ref([
  { name: "All", code: "" },
  { name: "Active", code: "active" },
  { name: "Inactive", code: "inactive" },
]);
</script>

<template>
  <div class="col-2">
    <Panel header="Filters" class="filter-panel" toggleable>
      <template #header>
        <i class="pi pi-filter"></i>
      </template>
      <div class="grid mt-2">
        <div class="col-12 mt-3">
          <FloatLabel>
            <Dropdown
              v-model="filterStore.filters.finalPrice"
              :options="finalPrices"
              optionLabel="name"
              placeholder="Final Price"
              id="final-price"
              class="filters"
            />
            <label for="final-price">Has Final Price</label>
          </FloatLabel>
        </div>
        <div class="col-12 mt-3">
          <FloatLabel>
            <InputText
              v-model="filterStore.filters.modality"
              class="filters"
              id="modality"
            />
            <label for="modality">Modality</label>
          </FloatLabel>
        </div>
        <div class="col-12 mt-3">
          <FloatLabel>
            <InputNumber
              v-model="filterStore.filters.minPrice"
              inputId="min-price"
              id="span-min-price"
              class="filters"
              currency="EUR"
              mode="currency"
              :lazy="300"
            />
            <label for="span-min-price">Min Price</label>
          </FloatLabel>
        </div>
        <div class="col-12 mt-3">
          <FloatLabel>
            <InputNumber
              v-model="filterStore.filters.maxPrice"
              inputId="max-price"
              id="span-max-price"
              class="filters"
              currency="EUR"
              mode="currency"
            />
            <label for="span-max-price">Max Price</label>
          </FloatLabel>
        </div>
        <div class="col-12 mt-3 flex align-items-center">
          <Checkbox
            v-model="filterStore.filters.excess"
            inputId="excess"
            :binary="true"
            name="excess"
            value="Excess"
          />
          <label for="excess" class="ml-2"> Excess </label>
        </div>
        <div class="col-12 flex flex-row-reverse">
          <Button
            type="button"
            id="clear-button"
            icon="pi pi-filter-slash"
            severity="danger"
            label="Clear"
            @click="clearFilters()"
            outlined
          />
        </div></div
    ></Panel>
  </div>
</template>


