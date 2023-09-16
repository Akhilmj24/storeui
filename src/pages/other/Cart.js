import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SEO from "../../components/seo";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  deleteAllFromCart,
} from "../../store/slices/cart-slice";
import { cartItemStock } from "../../helpers/product";
import { baseUrlImage } from "../../service/api";
import ProductTable from "./ProductTable";
import cogoToast from "cogo-toast";

const Cart = () => {
  let cartTotalPrice = 0;
  let finalDiscountedPrice = 0;
  let finalProductPrice = 0;

  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);


  const checkCouponCode=(e)=>{
    e.preventDefault()
    cogoToast.warn("wrong coupon code")
  }
  return (
    <Fragment>
      <SEO
        titleTemplate="Cart"
        description="Cart page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        <div className="cart-main-area pt-3 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  {cartItems.map((cartItem, key) => {
                   const productPrice = (
                      cartItem.orginalprice * currency.currencyRate
                    ).toFixed(2);
                    const discountedPrice = (
                      cartItem.saleprice * currency.currencyRate
                    ).toFixed(2);
                    cartTotalPrice += discountedPrice * cartItem.quantity;
                    finalProductPrice += productPrice * cartItem.quantity;
                    finalDiscountedPrice += discountedPrice * cartItem.quantity;
                  })}
                  <ProductTable type={"cart"} />
                  {/* {cartItems.map((cartItem, key) => {
                  const discountedPrice = getDiscountPrice(
                    cartItem.orginalprice,
                    cartItem.saleprice
                  );
                  const finalProductPrice = (
                    cartItem.orginalprice * currency.currencyRate
                  ).toFixed(2);
                  const finalDiscountedPrice = (
                    cartItem.saleprice * currency.currencyRate
                  ).toFixed(2);

                  discountedPrice != null
                    ? (cartTotalPrice +=
                        finalDiscountedPrice * cartItem.quantity)
                    : (cartTotalPrice +=
                        finalProductPrice * cartItem.quantity);
                  return (
                    <>
                      <div className="col-6 orderConatiner">
                        <div className="imageorderConatiner">
                          <Link to={`/product/${cartItem._id}`}>
                            <img
                              className="img-fluid"
                              src={baseUrlImage + cartItem.images[0]}
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="order_deatils cart_details">
                          <div className="removeCart">
                            <button
                              onClick={() =>
                                dispatch(deleteFromCart(cartItem.cartItemId))
                              }
                            >
                              <i className="fa fa-times"></i>
                            </button>
                          </div>
                          <h3> {cartItem.title}</h3>
                          <p>{cartItem.description}</p>
                          <p>
                            Unit Price:
                            <span>
                              {discountedPrice !== null ? (
                                <Fragment>
                                  <span className="amount old">
                                    {currency.currencySymbol +
                                      finalProductPrice}
                                  </span>
                                  <span className="amount">
                                    {currency.currencySymbol +
                                      finalDiscountedPrice}
                                  </span>
                                </Fragment>
                              ) : (
                                <span className="amount">
                                  {currency.currencySymbol +
                                    finalProductPrice}
                                </span>
                              )}
                            </span>
                          </p>
                          <p>
                            Size: <span> {cartItem.selectedProductSize}</span>
                          </p>
                          <p className="product-quantity">
                            Quantity: <span></span>{" "}
                            <div className="cart-plus-minus">
                              <button
                                className="dec qtybutton"
                                onClick={() =>
                                  dispatch(decreaseQuantity(cartItem))
                                }
                                disabled={cartItem.quantity === 1}
                              >
                                -
                              </button>
                              <input
                                className="cart-plus-minus-box"
                                type="text"
                                value={cartItem.quantity}
                                readOnly
                              />
                              <button
                                className="inc qtybutton"
                                onClick={() =>
                                  dispatch(
                                    addToCart({
                                      ...cartItem,
                                      quantity: quantityCount,
                                    })
                                  )
                                }
                                disabled={
                                  cartItem !== undefined &&
                                  cartItem.quantity &&
                                  cartItem.quantity >=
                                    cartItemStock(
                                      cartItem,
                                      cartItem.selectedProductColor,
                                      cartItem.selectedProductSize
                                    )
                                }
                              >
                                +
                              </button>
                            </div>
                          </p>

                          <p>
                            Color: <span></span>{" "}
                            {cartItem.selectedProductColor}
                          </p>
                          <p className="product-subtotal">
                            Sub Total: <span></span>
                            {discountedPrice !== null
                              ? currency.currencySymbol +
                                (
                                  finalDiscountedPrice * cartItem.quantity
                                ).toFixed(2)
                              : currency.currencySymbol +
                                (
                                  finalProductPrice * cartItem.quantity
                                ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })} */}
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={"/checkout"}>Continue Shopping</Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => dispatch(deleteAllFromCart())}>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* <div className="col-lg-4 col-md-6">
                  <div className="cart-tax">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gray">
                        Estimate Shipping And Tax
                      </h4>
                    </div>
                    <div className="tax-wrapper">
                      <p>
                        Enter your destination to get a shipping estimate.
                      </p>
                      <div className="tax-select-wrapper">
                        <div className="tax-select">
                          <label>* Country</label>
                          <select className="email s-email s-wid">
                            <option>Bangladesh</option>
                            <option>Albania</option>
                            <option>Åland Islands</option>
                            <option>Afghanistan</option>
                            <option>Belgium</option>
                          </select>
                        </div>
                        <div className="tax-select">
                          <label>* Region / State</label>
                          <select className="email s-email s-wid">
                            <option>Bangladesh</option>
                            <option>Albania</option>
                            <option>Åland Islands</option>
                            <option>Afghanistan</option>
                            <option>Belgium</option>
                          </select>
                        </div>
                        <div className="tax-select">
                          <label>* Zip/Postal Code</label>
                          <input type="text" />
                        </div>
                        <button className="cart-btn-2" type="submit">
                          Get A Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}

                  <div className="col-lg-6 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form onSubmit={checkCouponCode}>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        MRP{" "}
                        <span>
                          {currency.currencySymbol + finalProductPrice.toFixed(2)}
                        </span>
                      </h5>
                      <h5>
                        Discounted Price{" "}
                        <span>
                          {currency.currencySymbol + finalDiscountedPrice.toFixed(2)}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total{" "}
                        <span>
                          {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                        </span>
                      </h4>
                      <Link to={"/checkout"}>Proceed to Checkout</Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={"/shop-products/All/All"}>Shop Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;
