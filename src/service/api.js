import config from "./config";
import { userinfo } from "./UserCheck";

export const baseUrl = config.baseUrl;
export const baseUrlImage = config.baseUrlImage;

export const apiAuth = {
  login: "auth/login",
  update: `auth/updateprofile/`,
};
export const apiProduct = {
  getproduct: `product/`,
  getproductbyid: `product/find/`,
  getbycategory: `product/category?`,
  getproductfilter: `product/filter?`,
  getbysubcategory: `product/subcategory?`,
  getbysale: `product/sale`,
  getbyoffer: `product/offer`,
  createorder: `payment/createorder`,
  getrazorpay: `payment/`,
  placeorder: `payment/placeorder`,
  updatepaymentorder: `payment/updatepaymentorder`,
  saverating: `product/ratings/`,
};
export const apiBanner = {
  getbanner: `banner/`,
};
export const apiCategory = {
  getbanner: `category/`,
};
export const apiCart = {
  savecart: `cart/saveCart`,
  removeCartProduct: `cart/remove`,
};
export const apiWishlist = {
  savewishlist: `wishlist/savewishlist`,
  removewishlist: `wishlist/remove`,
};
export const apiOrders = {
  getorder: `order/userorder/`,
};
export const apiAddress = {
  saveaddress: `address/saveaddress`,
  getaddress: `address/`,
  getaddressbyid: `address/getaddressbyid/`,
  removeaddress: `address/remove/`,
  updateaddress: `address/`,
};
export const ipAddress = {
  getipaddress: `https://api.ipify.org/?format=json`,
};
