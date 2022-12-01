<template>
  <div class="v-item">
    <div class="v-item__img-box">
      <img
        :src="`../../assets/${product.image}`"
        :alt="product.title"
        class="v-item__img"
      />
    </div>
    <h3 class="v-item__title">{{ product.title }}</h3>
    <p class="v-item__description">{{ product.description }}</p>
    <span class="v-item__pricerange-main">{{ product.price_range.main }}</span>
    <span class="v-item__pricerange-second">
      {{ product.price_range.second }}
    </span>
    <button class="v-item__button">Подробнее</button>
  </div>
</template>

<script setup>
const props = defineProps(["product"]);
</script>

<style lang="scss" scoped>
.v-item {
  width: 305px;
  height: 565px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  background-color: #f6f8fa;

  @media screen and (max-width: 400px) {
    height: 525px;
    padding: 0 25px 25px;
  }
}
.v-item__img-box {
  width: 255px;
  height: 255px;

  @media screen and (max-width: 400px) {
    width: 200px;
    height: 200px;
  }
}
.v-item__img {
  width: 100%;
  height: auto;
  display: block;
}
.v-item__title {
  font-weight: 700;
  font-size: 22px;
  line-height: 1.2;
  margin-bottom: 10px;
}
.v-item__description {
  margin-bottom: auto;
}
.v-item__pricerange-main {
  font-family: "Roboto";
  font-weight: 500;
  font-size: 22px;
  line-height: 1.3;
  letter-spacing: 0.005em;
}
.v-item__pricerange-second {
  font-size: 16px;
  color: #797b86;
  margin-bottom: 20px;
}
.v-item__button {
  display: block;
  border-radius: 4px;
  width: 100%;
  font-weight: 600;
  font-size: 18px;
  padding: 18px 0;
  outline: none;
  margin-bottom: 10px;
  transition: 0.3s ease;
  background-color: #0069b4;
  color: #fff;
  border: 1px solid transparent;

  &:hover {
    cursor: pointer;
    background-color: #159eff;
  }
}
</style>
