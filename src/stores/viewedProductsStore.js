import { defineStore } from "pinia";
import testDataItems from "../../assets/products.json";

export const useViewedProductsStore = defineStore({
  id: "viewedProductsData",
  state: () => ({
    viewedProducts: testDataItems,
  }),
  actions: {},
  getters: {},
});
