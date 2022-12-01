import { defineStore } from "pinia";
import testDataItems from "../../assets/products.json";

let testCartItems = [];
testDataItems.forEach((el) => {
  let itemTemp = { ...el, qty: 1 };
  testCartItems = [...testCartItems, itemTemp];
});
testCartItems.length = 4;

export const useCartStore = defineStore({
  id: "cartData",
  state: () => ({
    cartItems: testCartItems,
    installCheckbox: false,
  }),
  actions: {
    addCartItem(productItem) {
      ///////////// Если товар уже в корзине, увеличить кол-во //////////////////
      if (this.cartItems.some((el) => el.id == productItem.id)) {
        this.cartItems.map((el) => {
          if (el.id == productItem.id) {
            return { ...el, qty: el.qty++ };
          } else {
            return el;
          }
        });
        return;
      }

      ///////////////// Если не в корзине, установить кол-во ////////////////////
      const itemFinal = { ...productItem, qty: 1 };

      ////////////////////// Добавить в корзину //////////////////////////////////
      this.cartItems = [...this.cartItems, itemFinal];
    },
    changeQty(id, qty) {
      this.cartItems = this.cartItems.map((el) => {
        if (el.id == id) {
          return { ...el, qty: qty };
        }
        return el;
      });
    },
    deleteCartItem(id) {
      this.cartItems = this.cartItems.filter((el) => el.id != id);
    },
    clearCartItems() {
      this.cartItems = [];
    },
    changeCheckbox() {
      this.installCheckbox = !this.installCheckbox;
    },
  },
  getters: {
    ///////////////////  Кол-во элементов в корзине /////////////////////////
    cartItemsCount() {
      let count = 0;
      this.cartItems.forEach((el) => {
        count += el.qty;
      });
      return count;
    },
    ///////////////////  Окончание слова 'товары' /////////////////////////
    countText() {
      let str = String(this.cartItemsCount);
      let last = str.slice(-1);
      let second = str.slice(str.length - 2, str.length - 1);
      let res;
      if (
        last == "0" ||
        last == "5" ||
        last == "6" ||
        last == "7" ||
        last == "8" ||
        last == "9"
      )
        res = "товаров";
      if (last == "1") res = "товар";
      if (last == "2" || last == "3" || last == "4") res = "товара";
      if (last == "2" || last == "3" || last == "4") res = "товара";
      if (
        second == "1" &&
        (last == "1" || last == "2" || last == "3" || last == "4")
      )
        res = "товаров";

      return res;
    },
    //////////////////////  Расчет суммарной стоимости ///////////////////////
    subTotal() {
      let n = 0;
      this.cartItems.forEach((el) => {
        n += el.regular_price.value * el.qty;
      });

      return Math.ceil(n * 100) / 100;
    },
    /////////////  Cуммарная стоимость в виде строки с пробелами /////////////
    priceString() {
      let string = String(this.subTotal);
      let arr = string.split("");
      let part2 = arr.splice(arr.length - 3, 3, " ");
      let res = arr.concat(part2).join("");
      return res;
    },
  },
});
