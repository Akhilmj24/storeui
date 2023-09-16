import { v4 as uuidv4 } from "uuid";
import cogoToast from "cogo-toast";
import { userinfo } from "../../service/UserCheck";
import { postApi, removeApi } from "../../service/axiosCall";
import { apiCart } from "../../service/api";
const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const saveCartitem = () => {
        const data = {
          ownedby: userinfo?.details._id,
          products: action.payload._id,
          quantity: action.payload.quantity,
          selectedProductSize: action.payload.selectedProductSize,
          setSelectedProductColor: action.payload.selectedProductColor,
        };
        postApi(data, apiCart.savecart)
          .then()
          .catch((err) => console.error(err));
      };
      //   const saveDb= product?.map(res=>res)
      if (action.payload.isdata) {
        saveCartitem();
        if (!product.variation) {
          const cartItem = state.cartItems.find(
            (item) => item._id === product._id
          );
          if (!cartItem) {
            state.cartItems.push({
              ...product,
              quantity: product.quantity ? product.quantity : 1,
              cartItemId: uuidv4(),
              ownedby: userinfo?.details._id,
            });
          } else {
            state.cartItems = state.cartItems.map((item) => {
              if (item.cartItemId === cartItem.cartItemId) {
                return {
                  ...item,
                  quantity: product.quantity
                    ? item.quantity + product.quantity
                    : item.quantity + 1,
                };
              }
              return item;
            });
          }
        } else {
          const cartItem = state.cartItems.find(
            (item) =>
              item._id === product._id &&
              product.selectedProductColor &&
              product.selectedProductColor === item.selectedProductColor &&
              product.selectedProductSize &&
              product.selectedProductSize === item.selectedProductSize &&
              (product.cartItemId
                ? product.cartItemId === item.cartItemId
                : true)
          );
          if (!cartItem) {
            state.cartItems.push({
              ...product,
              quantity: product.quantity ? product.quantity : 1,
              cartItemId: uuidv4(),
              ownedby: userinfo?.details._id,
            });
          } else if (
            cartItem !== undefined &&
            (cartItem.selectedProductColor !== product.selectedProductColor ||
              cartItem.selectedProductSize !== product.selectedProductSize)
          ) {
            state.cartItems = [
              ...state.cartItems,
              {
                ...product,
                quantity: product.quantity ? product.quantity : 1,
                cartItemId: uuidv4(),
              },
            ];
          } else {
            state.cartItems = state.cartItems.map((item) => {
              if (item.cartItemId === cartItem.cartItemId) {
                return {
                  ...item,
                  quantity: product.quantity
                    ? item.quantity + product.quantity
                    : item.quantity + 1,
                  selectedProductColor: product.selectedProductColor,
                  selectedProductSize: product.selectedProductSize,
                };
              }
              return item;
            });
          }
        }
        // cogoToast.success("Added To Cart", { position: "bottom-left" });
      } else {
        if (!product.variation) {
          const cartItem = state.cartItems.find(
            (item) => item._id === product._id
          );
          if (!cartItem) {
            state.cartItems = product;
          } else {
            state.cartItems = state.cartItems.map((item) => {
              if (item.cartItemId === cartItem.cartItemId) {
                return {
                  ...item,
                  quantity: product.quantity
                    ? item.quantity + product.quantity
                    : item.quantity + 1,
                };
              }
              return item;
            });
          }
        } else {
          const cartItem = state.cartItems.find(
            (item) =>
              item._id === product._id &&
              product.selectedProductColor &&
              product.selectedProductColor === item.selectedProductColor &&
              product.selectedProductSize &&
              product.selectedProductSize === item.selectedProductSize &&
              (product.cartItemId
                ? product.cartItemId === item.cartItemId
                : true)
          );
          if (!cartItem) {
            state.cartItems.push({
              ...product,
              quantity: product.quantity ? product.quantity : 1,
              cartItemId: uuidv4(),
              ownedby: userinfo?.details._id,
            });
          } else if (
            cartItem !== undefined &&
            (cartItem.selectedProductColor !== product.selectedProductColor ||
              cartItem.selectedProductSize !== product.selectedProductSize)
          ) {
            state.cartItems = [
              ...state.cartItems,
              {
                ...product,
                quantity: product.quantity ? product.quantity : 1,
                cartItemId: uuidv4(),
              },
            ];
          } else {
            state.cartItems = state.cartItems.map((item) => {
              if (item.cartItemId === cartItem.cartItemId) {
                return {
                  ...item,
                  quantity: product.quantity
                    ? item.quantity + product.quantity
                    : item.quantity + 1,
                  selectedProductColor: product.selectedProductColor,
                  selectedProductSize: product.selectedProductSize,
                };
              }
              return item;
            });
          }
        }
        // cogoToast.success("Added To Cart", { position: "bottom-left" });
      }
    },
    deleteFromCart(state, action) {
      const removefromcart = () => {
        const url = `${apiCart.removeCartProduct}/${action.payload}`;
        removeApi(url)
          .then()
          .catch((err) => console.error(err));
      };
      state.cartItems = state.cartItems.filter(
        (item) => item.cartItemId !== action.payload
      );
      removefromcart();
      cogoToast.error("Removed From Cart", { position: "bottom-left" });
    },
    decreaseQuantity(state, action) {
      const product = action.payload;
      if (product.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.cartItemId !== product.cartItemId
        );
        cogoToast.error("Removed From Cart", { position: "bottom-left" });
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item.cartItemId === product.cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        cogoToast.warn("Item Decremented From Cart", {
          position: "bottom-left",
        });
      }
    },
    deleteAllFromCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  decreaseQuantity,
  deleteAllFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
