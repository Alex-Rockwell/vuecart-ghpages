<template>
  <HeaderComponent />
  <main class="container">
    <div class="breadcrumbs">
      <RouterLink to="/" class="breadcrumbs__link">Главная</RouterLink>
      <img
        src="../../assets/images/breadcrumb-arrow.svg"
        alt="breadcrumb-arrow"
      />
      <span class="breadcrumbs__current">Корзина</span>
    </div>

    <section class="cart">
      <div class="cart__products-list">
        <div class="cart__info">
          <h1 class="cart__info__title">Ваша корзина</h1>
          <span class="cart__info__qty">
            {{ cartItemsCount }} {{ countText }}
          </span>
          <button class="cart__info__clear-btn" @click="clearCartItems()">
            Очистить корзину
          </button>
        </div>

        <div v-if="cartItems.length == 0" class="cart__empty">
          <p class="cart__empty-text">Корзина пуста...</p>
        </div>

        <CartItem
          v-for="cartItem in cartItems"
          :key="cartItem.id"
          :cartItem="cartItem"
        />

        <div v-if="cartItems.length > 0" class="cart__install">
          <input
            type="checkbox"
            class="cart__install__checkbox"
            @click="changeCheckbox"
          />
          <img
            class="cart__install__img"
            src="../../assets/images/install-icon.svg"
            alt="checkbox icon"
          />
          <div class="cart__install__textbox">
            <h3 class="cart__install__textbox__title">Установка</h3>
            <p class="cart__install__textbox__text">
              Отметьте, если Вам необходима консультация профессионала по
              монтажу выбранных товаров.
            </p>
          </div>
        </div>
      </div>

      <div class="cart__order">
        <h3 class="cart__order__title">Итого</h3>
        <p class="cart__order__text">
          <span class="cart__order__text-key">Сумма заказа</span>
          <span class="cart__order__text-value">{{ priceString }} &#8381;</span>
        </p>
        <p class="cart__order__text">
          <span class="cart__order__text-key">Количество</span>
          <span class="cart__order__text-value">{{ cartItemsCount }} шт.</span>
        </p>
        <p class="cart__order__text cart__order__text--bottom">
          <span class="cart__order__text-key">Установка</span>
          <span class="cart__order__text-value" v-if="installCheckbox">Да</span>
          <span class="cart__order__text-value" v-else>Нет</span>
        </p>
        <p class="cart__order__subtotal-price">
          <span class="cart__order__subtotal-key">Стоимость товаров</span>
          <span class="cart__order__subtotal-value">
            {{ priceString }} &#8381;
          </span>
        </p>
        <button
          class="cart__order__btn cart__order__btn--blue"
          @click.prevent="sendCart"
        >
          Оформить заказ
        </button>
        <button class="cart__order__btn cart__order__btn--white">
          Купить в 1 клик
        </button>
      </div>
    </section>

    <ViewedProductsSlider />
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/cartStore";
import CartItem from "../components/CartItem.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import ViewedProductsSlider from "../components/ViewedProductsSlider.vue";

const cartStore = useCartStore();
const { cartItems, cartItemsCount, countText, priceString, installCheckbox } =
  storeToRefs(cartStore);
const { clearCartItems, changeCheckbox } = cartStore;

//////////////////// Отправка данных на сервер //////////////////////////////
const sendData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`);
  }
  return await response.json();
};
const sendCart = () => {
  const cartData = {
    cartProperties: [
      {
        title: "Сумма заказа",
        value: priceString.value,
      },
      {
        title: "Количество",
        value: cartItemsCount.value,
      },
      {
        title: "Установка",
        value: installCheckbox.value ? "Да" : "Нет",
      },
    ],
    cartItems: cartItems.value,
  };
  sendData("https://jsonplaceholder.typicode.com/posts", cartData);
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  margin-bottom: 60px;
  & > * {
    margin-right: 10px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
}
.breadcrumbs__link {
  text-decoration: none;
  color: #33374e;
}
.breadcrumbs__current {
  text-decoration: none;
  color: #797b86;
}

.cart {
  display: flex;
  justify-content: flex-start;
  gap: 60px;
  margin-bottom: 95px;

  @media screen and (max-width: 1070px) {
    flex-direction: column;
    gap: 0;
  }
}
.cart__products-list {
  flex-basis: 790px;
  flex-shrink: 1;
}

.cart__info {
  display: flex;
  align-items: flex-end;
  margin-bottom: 50px;
  flex-wrap: wrap;
}
.cart__info__title {
  margin-right: 20px;
  font-weight: 700;
  font-size: 44px;
  line-height: 1.2;

  @media screen and (max-width: 700px) {
    flex-basis: 100%;
  }
  @media screen and (max-width: 400px) {
    font-size: 30px;
  }
}

.cart__info__qty {
  margin-right: auto;
  margin-bottom: 5px;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5;
  color: #797b86;
}

.cart__info__clear-btn {
  background-color: transparent;
  border: none;
  margin-bottom: 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  text-decoration: underline;
  color: #797b86;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 400px) {
    margin-top: 15px;
    margin-bottom: 5px;
  }
}

.cart__empty {
  height: 20vh;
  width: 100%;
  border-bottom: 1px solid #999;
  padding: 30px;
  margin-bottom: 50px;
}

.cart__empty-text {
  color: #777;
  font-size: 18px;
}

.cart__install {
  background-color: #f6f8fa;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 30px 25px;
}
.cart__install__checkbox {
  position: relative;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 30px;

  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    border: 2px solid #8f919b;
    border-radius: 3px;
    background-color: white;
    transition: 0.2s ease;
  }
  &:checked:before {
    border: 2px solid #333;
  }
  &:checked:after {
    content: "";
    display: block;
    width: 5px;
    height: 10px;
    border: solid #333;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    top: 4px;
    left: 8px;
  }
}
.cart__install__img {
  margin-right: 30px;
}
.cart__install__textbox {
}
.cart__install__textbox__title {
  font-weight: 600;
  font-size: 16px;
}
.cart__install__textbox__text {
  font-size: 14px;
  color: #797b86;

  @media screen and (max-width: 450px) {
    display: none;
  }
}

.cart__order {
  background-color: #f6f8fa;
  flex-basis: 430px;
  align-self: flex-start;
  margin-top: 80px;
  padding: 40px 30px 35px;

  @media screen and (max-width: 1070px) {
    width: 450px;
  }
  @media screen and (max-width: 530px) {
    width: 100%;
  }
  @media screen and (max-width: 370px) {
    margin-top: 50px;
    padding: 20px 15px 35px;
  }
}

.cart__order__title {
  font-weight: 600;
  font-size: 24px;
  line-height: 1.2;
  margin-bottom: 30px;
}
.cart__order__text {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.cart__order__text-key {
  font-family: "Lato";
  font-weight: 500;
  font-size: 16px;

  @media screen and (max-width: 370px) {
    font-size: 14px;
  }
}
.cart__order__text-value {
  font-family: "Roboto";
  font-weight: 400;
  font-size: 16px;

  @media screen and (max-width: 370px) {
    font-size: 14px;
  }
}
.cart__order__text--bottom {
  padding-bottom: 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid #c4c4c4;
}
.cart__order__subtotal-price {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  @media screen and (max-width: 430px) {
    flex-direction: column;
  }
}
.cart__order__subtotal-key {
  font-family: "Lato";
  font-weight: 600;
  font-size: 18px;

  @media screen and (max-width: 430px) {
    margin-bottom: 10px;
  }
}
.cart__order__subtotal-value {
  font-family: "Roboto";
  font-weight: 700;
  font-size: 26px;
  line-height: 1.3;
  letter-spacing: 0.005em;

  @media screen and (max-width: 450px) {
    font-size: 22px;
  }
}
.cart__order__btn {
  display: block;
  border-radius: 4px;
  width: 100%;
  font-weight: 600;
  font-size: 18px;
  padding: 18px 0;
  outline: none;
  margin-bottom: 10px;
  transition: 0.3s ease;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 450px) {
    font-size: 14px;
  }
}
.cart__order__btn--blue {
  background-color: #0069b4;
  color: #fff;
  border: 1px solid transparent;

  &:hover {
    background-color: #159eff;
  }
}
.cart__order__btn--white {
  background-color: #fff;
  color: #0069b4;
  border: 1px solid #0069b4;

  &:hover {
    background-color: #159eff;
    color: #fff;
    border: 1px solid #159eff;
  }
}
</style>
