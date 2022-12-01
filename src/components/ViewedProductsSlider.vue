<template>
  <div class="slider__heading">
    <h2 class="slider__title">Просмотренные товары</h2>
    <div class="slider__custom-arrow slider__custom-arrow--prev"></div>
    <div class="slider__custom-pagination"></div>
    <div class="slider__custom-arrow slider__custom-arrow--next"></div>
  </div>
  <section class="slider">
    <swiper
      :slidesPerView="4"
      :spaceBetween="20"
      :slidesPerGroup="4"
      :loop="true"
      :pagination="{
        el: '.slider__custom-pagination',
        type: 'fraction',
      }"
      :navigation="{
        enabled: true,
        prevEl: '.slider__custom-arrow--prev',
        nextEl: '.slider__custom-arrow--next',
      }"
      :modules="[Pagination, Navigation]"
      :breakpoints="{
        '100': {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        '700': {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        '1024': {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        '1270': {
          slidesPerView: 4,
          slidesPerView: 4,
        },
      }"
      class="mySwiper"
    >
      <swiper-slide v-for="product in viewedProducts" :key="product.id">
        <ViewedProductsItem :product="product" />
      </swiper-slide>
    </swiper>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import ViewedProductsItem from "./ViewedProductsItem.vue";
import { storeToRefs } from "pinia";
import { useViewedProductsStore } from "../stores/viewedProductsStore";

const productsStore = useViewedProductsStore();
const { viewedProducts } = storeToRefs(productsStore);
</script>

<style lang="scss">
.swiper {
  width: 100%;
  height: 100%;
  position: relative;
}

.swiper-slide {
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider__heading {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 45px;
  flex-wrap: wrap;
}
.slider__title {
  font-weight: 600;
  font-size: 30px;
  line-height: 1.2;
  margin-right: auto;

  @media screen and (max-width: 630px) {
    flex-basis: 100%;
    margin-bottom: 20px;
  }
}

.slider__custom-pagination {
  position: relative;
  width: auto;
  height: 24px;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  margin-top: 10px;
  font-size: 18px;
  line-height: 1.5;
  color: #797b86;
}
.swiper-pagination-current {
  font-weight: 500;
  font-size: 24px;
  line-height: 1.5;
  color: #212121;
  margin-right: 5px;
  margin-top: -5px;
}
.swiper-pagination-total {
  margin-left: 5px;
  align-self: baseline;
  margin-top: -2px;
}

.slider__custom-arrow {
  display: flex;
  position: relative;
  left: 0;
  width: 50px;
  height: 50px;
  background-color: #90a2b5;
  border-radius: 50px;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.4s ease;

  &:hover {
    cursor: pointer;
    background-color: #159eff;
  }
}
.slider__custom-arrow--prev {
  background-image: url("../../assets/images/slider-left-arrow.svg");
  margin-right: 20px;
}
.slider__custom-arrow--next {
  background-image: url("../../assets/images/slider-right-arrow.svg");
}
</style>
