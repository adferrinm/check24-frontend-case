<script setup>
import { watch, onMounted } from "vue";
import { useDataStore, useFilterStore } from "../store";

const filterStore = useFilterStore();
const dataStore = useDataStore();

onMounted(() => {
  dataStore.fetchData();

  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"][aria-label="All items unselected"]'
  );
  if (checkboxes.length > 0) {
    checkboxes[0].remove();
  }
});

watch(dataStore.$state, () => {
  dataStore.shiftSelectedProducts();
});

watch(filterStore.$state, () => {
  dataStore.fetchData();
  dataStore.selectedProducts = [];
});

const rowClass = (data) => {
  return [{ "bg-red-100": data.final_price === 0 }];
};

const formatCurrency = (value) => {
  return value.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
};
</script>

<template>
  <div class="card">
    <DataTable
      paginator
      :rows="5"
      v-model:selection="dataStore.selectedProducts"
      :value="dataStore.data"
      dataKey="id"
      tableStyle="min-width: 50rem"
      :rowClass="rowClass"
      size="small"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column header="Logo">
        <template #body="slotProps">
          <img
            v-tooltip="slotProps.data.company"
            :src="slotProps.data.logo"
            class="w-8rem border-round"
          />
        </template>
      </Column>
      <Column field="modality.name" header="Modality"></Column>
      <Column header="Features">
        <template #body="slotProps">
          <ul style="list-style: none; padding-left: 0">
            <template v-if="slotProps.data.features.length > 0">
              <li
                v-for="(feature, index) in slotProps.data.features"
                :key="index"
              >
                <i
                  :class="['pi', `pi-${feature.icon}`]"
                  :style="{ color: feature.color, marginRight: '5px' }"
                ></i
                >{{ feature.description }}
              </li>
            </template>
          </ul>
        </template>
      </Column>
      <Column field="price" sortable header="Price">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="excess" sortable header="Excess">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.excess) }}
        </template>
      </Column>
      <Column field="grade.total" sortable header="Grade Total">
        <template #body="slotProps">
          {{ slotProps.data.grade.total }} %
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style></style>