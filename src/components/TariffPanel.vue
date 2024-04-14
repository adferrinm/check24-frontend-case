<script setup>
import { defineProps } from "vue";
import { useDataStore } from "../store";

const props = defineProps(["data"]);
const dataStore = useDataStore();

const formatCurrency = (value) => {
  return value.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
};
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-row justify-content-between align-items-center">
        <img class="w-8rem border-round" :src="props.data.logo" />
        <span
          v-show="
            !dataStore.isDisplayDifferences ||
            props.data.differentModality === true
          "
          class="ml-5 text-xl"
          >{{ props.data.modality.name }}</span
        >
      </div>
    </template>

    <template #content>
      <div class="flex justify-content-between flex-wrap">
        <div class="flex flex-column flex-wrap">
          <Card style="width: 22rem; height: 15rem">
            <template #title> Features </template>
            <template
              v-if="
                dataStore.isDisplayDifferences
                  ? props.data.differentFeatures.length !== 0
                  : props.data.features.length !== 0
              "
              #content
            >
              <div
                v-for="(feature, index) in dataStore.isDisplayDifferences
                  ? props.data.differentFeatures
                  : props.data.features"
                :key="index"
                class="col flex flex-row align-items-center"
              >
                <div
                  class="flex align-items-center justify-content-center border-round"
                  :class="[`bg-${feature.color}-100`]"
                  style="width: 2rem; height: 2rem"
                >
                  <i
                    :class="[
                      'pi',
                      `pi-${feature.icon}`,
                      `text-${feature.color}-500`,
                    ]"
                    :style="{ color: feature.color }"
                    class="text-xl"
                  ></i>
                </div>
                <span class="text-xl ml-2">{{ feature.description }}</span>
              </div>
            </template>
            <template v-else #content
              ><span class="text-xl ml-2">No features...</span>
            </template>
          </Card>
        </div>

        <div class="flex flex-wrap">
          <Card style="height: 15rem; width: 11rem">
            <template #title> Price </template>
            <template #content>
              <div>
                <div
                  v-show="
                    dataStore.isDisplayDifferences
                      ? props.data.betterGrade !== undefined
                      : true
                  "
                  class="mb-3"
                >
                  <span
                    :class="[
                      props.data.betterGrade === true ? 'bg-green-100' : '',
                      props.data.betterGrade === false ? 'bg-red-100' : '',
                    ]"
                    class="font-medium border-round-xs p-1 text-xl"
                  >
                    Tariff: {{ props.data.grade.total }} %
                  </span>
                </div>
                <div
                  v-show="
                    dataStore.isDisplayDifferences
                      ? props.data.betterPrice !== undefined
                      : true
                  "
                  class="mb-3"
                >
                  <span
                    :class="[
                      props.data.betterPrice === true ? 'bg-green-100' : '',
                      props.data.betterPrice === false ? 'bg-red-100' : '',
                    ]"
                    class="font-medium border-round-xs p-1 text-2xl"
                  >
                    {{ formatCurrency(props.data.price) }}
                  </span>
                </div>
                <div
                  v-show="
                    dataStore.isDisplayDifferences
                      ? props.data.betterExcess !== undefined
                      : true
                  "
                >
                  <span
                    :class="[
                      props.data.betterExcess === true ? 'bg-green-100' : '',
                      props.data.betterExcess === false ? 'bg-red-100' : '',
                    ]"
                    class="font-medium border-round-xs p-1 text-sm"
                  >
                    Excess: {{ formatCurrency(props.data.excess) }}
                  </span>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </template>
  </Card>
</template>


  
  