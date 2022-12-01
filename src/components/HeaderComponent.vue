<template>
  <div class="container">
    <header class="header">
      <div class="header__menu-box">&nbsp;</div>
      <div class="header__info-box">
        <div class="header__logo">&nbsp;</div>
        <RouterLink to="/cart" class="header__cart">
          <img
            src="../../assets/images/cart-icon.svg"
            alt="shopping cart icon"
            class="header__cart__icon"
          />
          <div class="header__cart__info">
            <span class="header__cart__info__title">Ваша корзина</span>
            <span class="header__cart__info__qty">
              {{ cartItemsCount }} {{ countText }}
            </span>
            <span class="header__cart__info__subtotal">
              {{ priceString }} &#8381;
            </span>
          </div>
        </RouterLink>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cartStore";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";

const cartStore = useCartStore();
const { cartItemsCount, countText, priceString } = storeToRefs(cartStore);
</script>

<style lang="scss" scoped>
.header__menu-box {
  height: 45px;
}
.header__info-box {
  height: 95px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header__cart,
.header__cart:active {
  display: flex;
  text-decoration: none;
  color: inherit;
}

.header__cart__icon {
  width: 30px;
  height: auto;
  margin-right: 30px;
}

.header__cart__info {
  display: flex;
  flex-direction: column;
}
.header__cart__info__title {
  font-size: 14px;
  line-height: 1.5;
}
.header__cart__info__qty {
  font-size: 12px;
  color: #797b86;
}
.header__cart__info__subtotal {
  font-size: 12px;
}
</style>
