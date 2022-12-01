<template>
  <HeaderComponent />
  <div class="container">
    <main class="catalog">
      <h1 class="catalog__title">Каталог</h1>
      <div class="catalog__container">
        <ProductItem
          v-for="element in elements"
          :key="element.id"
          :product="element"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import ProductItem from "../components/ProductItem.vue";

const elements = ref([]);

///////////////////////// Загрузка данных /////////////////////////

const getElements = () => {
  fetch(`../../assets/products.json`)
    .then((res) => res.json())
    .then((data) => {
      elements.value = data;
      console.log(elements.value);
    });
};

onMounted(() => {
  getElements();
});
</script>

<style lang="scss" scoped>
.catalog {
  padding: 0 30px 50px;

  @media screen and (max-width: 510px) {
    padding: 0 15px 50px;
  }
}

.catalog__title {
  margin-bottom: 30px;
}

.catalog__container {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 20px;
  justify-items: start;
  align-items: stretch;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, auto);
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(2, auto);
  }

  @media screen and (max-width: 750px) {
    grid-template-columns: repeat(1, auto);
  }
}
</style>
