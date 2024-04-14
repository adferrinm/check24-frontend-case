import { watch } from "vue";
import { jsonData } from "./data/data";
import { createPinia, defineStore } from "pinia";

const pinia = createPinia();

watch(
  pinia.state,
  (state) => {
    localStorage.setItem("filters", JSON.stringify(state));
  },
  { deep: true }
);

export const useFilterStore = defineStore("sidebar", {
  state: () => ({
    filters: {
      finalPrice: { name: "All", code: "" },
      modality: "",
      minPrice: null,
      maxPrice: null,
      excess: false,
    },
  }),
  actions: {},
});

export const useDataStore = defineStore("data", {
  state: () => ({
    isDisplayDifferences: false,
    selectedProducts: [],
    data: [],
  }),

  actions: {
    async fetchData() {
      try {
        const filterStore = useFilterStore();
        const response = await fakeFetchData(filterStore.filters);
        this.data = response;
      } catch (error) {
        console.error("Error loading data: ", error);
      }
    },

    shiftSelectedProducts() {
      if (this.selectedProducts.length > 2) {
        this.clearBetterAttributes();
        this.selectedProducts.shift();
      }
    },

    clearBetterAttributes() {
      this.isDisplayDifferences = false;
      this.selectedProducts.forEach((product) => {
        delete product.betterGrade;
        delete product.betterExcess;
        delete product.betterPrice;
        delete product.differentModality;
        delete product.differentFeatures;
      });
    },

    compareFeatures(firstProduct, secondProduct) {
      firstProduct.differentFeatures = [];
      secondProduct.differentFeatures = [];

      firstProduct.features.forEach((feature) => {
        if (
          !secondProduct.features.some(
            (otherFeature) => otherFeature.description === feature.description
          )
        ) {
          firstProduct.differentFeatures.push(feature);
        }
      });

      secondProduct.features.forEach((feature) => {
        if (
          !firstProduct.features.some(
            (otherFeature) => otherFeature.description === feature.description
          )
        ) {
          secondProduct.differentFeatures.push(feature);
        }
      });
    },

    compareProducts() {
      this.isDisplayDifferences = !this.isDisplayDifferences;
      if (this.isDisplayDifferences && this.selectedProducts.length === 2) {
        const [firstProduct, secondProduct] = this.selectedProducts;

        if (firstProduct.price > secondProduct.price) {
          firstProduct.betterPrice = true;
          secondProduct.betterPrice = false;
        } else if (firstProduct.price < secondProduct.price) {
          firstProduct.betterPrice = false;
          secondProduct.betterPrice = true;
        }

        if (firstProduct.excess > secondProduct.excess) {
          firstProduct.betterExcess = true;
          secondProduct.betterExcess = false;
        } else if (firstProduct.excess < secondProduct.excess) {
          firstProduct.betterExcess = false;
          secondProduct.betterExcess = true;
        }

        if (firstProduct.grade.total > secondProduct.grade.total) {
          firstProduct.betterGrade = true;
          secondProduct.betterGrade = false;
        } else if (firstProduct.grade.total < secondProduct.grade.total) {
          firstProduct.betterGrade = false;
          secondProduct.betterGrade = true;
        }

        if (firstProduct.modality.name !== secondProduct.modality.name) {
          firstProduct.differentModality = true;
          secondProduct.differentModality = true;
        } else {
          firstProduct.differentModality = false;
          secondProduct.differentModality = false;
        }

        this.compareFeatures(firstProduct, secondProduct);
        this.selectedProducts = [firstProduct, secondProduct];
      } else {
        this.clearBetterAttributes();
      }
    },
  },
});

export default pinia;

async function fakeFetchData(filters) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredData = jsonData;

      if (filters.finalPrice.code !== "") {
        filteredData = filteredData.filter((product) =>
          filters.finalPrice.code === "active"
            ? product.final_price > 0
            : product.final_price === 0
        );
      }
      if (filters.minPrice !== null) {
        filteredData = filteredData.filter(
          (product) => product.price >= filters.minPrice
        );
      }
      if (filters.maxPrice !== null) {
        filteredData = filteredData.filter(
          (product) => product.price <= filters.maxPrice
        );
      }
      if (filters.modality !== "") {
        filteredData = filteredData.filter((product) =>
          product.modality.name.includes(filters.modality)
        );
      }
      if (filters.excess) {
        filteredData = filteredData.filter((product) => product.excess > 0);
      }
      resolve(filteredData);
    }, 200);
  });
}
