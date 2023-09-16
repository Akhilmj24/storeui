import cogoToast from "cogo-toast";
import { apiWishlist } from "../../service/api";
import { userinfo } from "../../service/UserCheck";
import { postApi, removeApi } from "../../service/axiosCall";
const { createSlice } = require("@reduxjs/toolkit");

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addToWishlist(state, action) {
      if (action.payload.isdata) {
        const products = action.payload.product;
        if (products) {
          state.wishlistItems = products;
        }
      } else {
        const saveWishlistitem = () => {
          const data = {
            ownedby: userinfo?.details._id,
            product: action.payload._id,
          };
          postApi(data, apiWishlist.savewishlist)
            .then()
            .catch((err) => console.error(err));
        };
        saveWishlistitem();
        const isInWishlist = state.wishlistItems.findIndex(
          (item) => item._id === action.payload._id
        );
        if (isInWishlist > -1) {
          cogoToast.info("Product already in wishlist", {
            position: "bottom-left",
          });
        } else {
          state.wishlistItems.push(action.payload);
          cogoToast.success("Added To wishlist", { position: "bottom-left" });
        }
      }
    },
    deleteFromWishlist(state, action) {
      const removefromlist = () => {
        const url = `${apiWishlist.removewishlist}?urid=${userinfo?.details._id}&proid=${action.payload}`;
        removeApi(url)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      };
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload
      );
      removefromlist();
      cogoToast.error("Removed From Wishlist", { position: "bottom-left" });
    },
    deleteAllFromWishlist(state) {
      state.wishlistItems = [];
    },
  },
});

export const { addToWishlist, deleteFromWishlist, deleteAllFromWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
