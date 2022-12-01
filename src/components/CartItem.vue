<template>
  <div class="cart-item">
    <div class="cart-item__details">
      <div class="cart-item__img-box">
        <img
          :src="`../../assets/${props.cartItem.image}`"
          :alt="cartItem.title"
          class="cart-item__img"
        />
      </div>
      <div class="cart-item__description">
        <h2 class="cart-item__description__name">
          {{ cartItem.title_long }}
        </h2>
        <p class="cart-item__description__text">
          <span v-html="propertiesString"></span>
        </p>
        <span class="cart-item__description__artikul">
          {{ cartItem.artikul }}
        </span>
      </div>
    </div>

    <div class="cart-item__qty">
      <button class="cart-item__qty__counter-btn" @click="decreaseQty">
        -
      </button>
      <span class="cart-item__qty__counter-txt">{{ qty }}</span>
      <button class="cart-item__qty__counter-btn" @click="increaseQty">
        +
      </button>
      <div class="cart-item__qty__price-hint" v-if="qty > 1">
        <span>{{ priceString }}</span>
        <span v-if="cartItem.regular_price.currency == 'рубль'">
          &#8381;/шт</span
        >
      </div>
    </div>

    <div class="cart-item__price">
      <span class="cart-item__total">{{ totalString }} &#8381;</span>
    </div>

    <button class="cart-item__delete-btn" @click="deleteCartItem(cartItem.id)">
      <img
        src="../../assets/images/delete-icon.svg"
        alt="delete icon"
        class="cart-item__delete-icon"
      />
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useCartStore } from "../stores/cartStore";

const props = defineProps(["cartItem"]);
const qty = ref(props.cartItem.qty);
const total = ref(props.cartItem.regular_price.value);

const cartStore = useCartStore();
const { changeQty, deleteCartItem } = cartStore;

///////////////  Свойства товара в из массива в строку ///////

const propertiesString = computed(() => {
  let string = "";
  props.cartItem.properties.forEach((el) => {
    string += el;
    if (
      props.cartItem.properties.length - 1 !==
      props.cartItem.properties.indexOf(el)
    )
      string += " / ";
  });
  string = string.replace("м3", "м<sup>3</sup>");
  return string;
});

////////////////////////  Счетчик /////////////////////////////////
const decreaseQty = () => {
  qty.value = qty.value == 1 ? 1 : qty.value - 1;
};
const increaseQty = () => qty.value++;

///////////////  Цена в виде строки с пробелами /////////////////////
const priceString = computed(() => {
  let string = String(props.cartItem.regular_price.value);
  let arr = string.split("");
  let part2 = arr.splice(arr.length - 3, 3, " ");
  let res = arr.concat(part2).join("");
  return res;
});

//////////////////////  Цена с учетом количества /////////////////////

const getTotal = () => {
  total.value =
    Math.ceil(props.cartItem.regular_price.value * qty.value * 100) / 100;
};

onMounted(() => {
  getTotal();
});
watch(qty, () => {
  getTotal();
});

const totalString = computed(() => {
  let string = String(total.value);
  let arr = string.split("");
  let part2 = arr.splice(arr.length - 3, 3, " ");
  let res = arr.concat(part2).join("");
  return res;
});

//////////////////////  изменить кол-во в store ///////////////////////

watch(total, () => {
  changeQty(props.cartItem.id, qty.value);
});
onMounted(() => {
  changeQty(props.cartItem.id, qty.value);
});
</script>

<style lang="scss" scoped>
.cart-item {
  position: relative;
  border-bottom: 1px solid #c4c4c4;
  padding-bottom: 25px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media screen and (max-width: 500px) {
    justify-content: center;
  }
}

.cart-item__details {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: 700px) {
    flex-basis: 100%;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }
}

.cart-item__img-box {
  width: 120px;
  height: 120px;
  margin-right: 25px;

  @media screen and (max-width: 500px) {
    width: 200px;
    height: 200px;
  }
}
.cart-item__img {
  width: 100%;
  height: auto;
  display: block;
}

.cart-item__description {
  max-width: 265px;
}
.cart-item__description__name {
  font-weight: 600;
  font-size: 16px;
  color: #1f2432;
  margin-bottom: 10px;
}

.cart-item__description__text {
  font-size: 12px;
  color: #2c3242;
  margin-bottom: 10px;
}
.cart-item__description__artikul {
  font-size: 14px;
  color: #797b86;
}

.cart-item__delete-btn {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
}

.cart-item__qty {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 700px) {
    margin-left: 15px;
    margin-right: 10px;
  }
  @media screen and (max-width: 500px) {
    margin-left: 0;
  }
}
.cart-item__qty__counter-btn {
  width: 34px;
  height: 34px;
  background-color: #f6f8fa;
  border: none;
  color: #33371e;
  font-size: 15px;
  transition: 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #eee;
  }
  &:not(:last-child) {
    margin-right: 3px;
  }
}
.cart-item__qty__counter-txt {
  display: inline-block;
  width: 34px;
  height: 34px;
  margin-right: 3px;
  background-color: #f6f8fa;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #33371e;
  user-select: none;
}
.cart-item__qty__price-hint {
  position: absolute;
  top: 44px;
  left: 0;
  width: 100%;
  font-family: "Roboto";
  font-size: 12px;
  text-align: center;
  color: #1f2432;

  @media screen and (max-width: 700px) {
    top: 30px;
  }
}

.cart-item__price {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 90px;
}

.cart-item__total {
  font-family: "Roboto";
  font-weight: 500;
  font-size: 18px;
  color: #1f2432;
}

.cart-item__delete-icon {
  width: 17px;
  height: auto;
}
</style>
