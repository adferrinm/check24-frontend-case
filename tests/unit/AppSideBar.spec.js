import { mount } from "@vue/test-utils";
import AppSideBar from "@/layout/AppSideBar.vue";
import { useFilterStore, useDataStore } from "@/store";
import { setActivePinia, createPinia } from "pinia";
import PrimeVue from "primevue/config";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";

const globalComponents = {
  InputNumber: InputNumber,
  InputText: InputText,
};

describe("AppSideBar", () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(AppSideBar, {
      global: {
        plugins: [PrimeVue],
        components: globalComponents,
      },
    });
  });

  it("should update min price filter correctly", async () => {
    // Set the min price to test
    const minPrice = 79500;

    // Find and set the min price input field
    const minPriceInput = wrapper.find("#min-price");
    await minPriceInput.setValue(minPrice);
    await minPriceInput.trigger("blur");

    // Assert that the min price filter is updated correctly
    expect(useFilterStore().filters.minPrice).toEqual(minPrice);

    // Fetch data and assert that each item's price is greater than or equal to minPrice
    const dataStore = useDataStore();
    await dataStore.fetchData();

    dataStore.data.forEach((item) => {
      expect(item.price).toBeGreaterThanOrEqual(minPrice);
    });
  });

  it("should update max price filter correctly", async () => {
    // Set the max price to test
    const maxPrice = 80000;

    // Find and set the max price input field
    const maxPriceInput = wrapper.find("#max-price");
    await maxPriceInput.setValue(maxPrice);
    await maxPriceInput.trigger("blur");

    // Assert that the max price filter is updated correctly
    expect(useFilterStore().filters.maxPrice).toEqual(maxPrice);

    // Fetch data and assert that each item's price is less than or equal to minPrice
    const dataStore = useDataStore();
    await dataStore.fetchData();

    dataStore.data.forEach((item) => {
      expect(item.price).toBeLessThanOrEqual(maxPrice);
    });
  });

  it("should clear filters correctly", async () => {
    // Select the modality input field and set its value to "ampliado"
    const modalityInput = wrapper.find("#modality");
    await modalityInput.setValue("ampliado");

    // Obtain the current state of filters using the useFilterStore hook
    let filters = useFilterStore().filters;

    // Verify that the modality filter has been set to "ampliado"
    expect(filters.modality).toEqual("ampliado");

    // Simulate clicking the clear button
    await wrapper.find("#clear-button").trigger("click");

    // Re-obtain the state of filters after clicking the clear button
    filters = useFilterStore().filters;

    // Assert that each filter has been reset to its default state
    expect(filters.finalPrice).toEqual({ name: "All", code: "" });
    expect(filters.modality).toBe("");
    expect(filters.minPrice).toBeNull();
    expect(filters.maxPrice).toBeNull();
    expect(filters.excess).toBeFalsy();
  });
});
